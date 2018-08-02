import Evernote from 'evernote';
import { get } from 'lodash';
import cache from './cache';

function toHexString(byteArray) {
  let s = '';
  byteArray.forEach(byte => {
    s += `0${(byte & 0xff).toString(16)}`.slice(-2);
  });
  return s;
}
/* async function crawl(url) {
  try {
    const req = await axios.get(url);
    console.log('ERR', req);
    return req.status === 200;
  } catch (err) {
    console.log('ERR', err);
    return false;
  }
} */
const createClient = ({ token, sandbox = false, cache: doCache = false }) => {
  const client = new Evernote.Client({ token, sandbox });
  const api = {
    client,
    getNotebooks: async () => {
      const noteStore = client.getNoteStore();
      const notebooks = await noteStore
        .listNotebooks()
        .catch(err => console.error(err));

      return notebooks;
    },
    getSharedNotebooks: async () => {
      const noteStore = client.getNoteStore();
      const notebooks = await noteStore
        .listLinkedNotebooks()
        .catch(err => console.error(err));
      return notebooks;
    },
    getSharedNotebook: async guid => {
      const authenticationToken = await api.getSharedNotebookToken(guid);
      const sharedClient = createClient({
        token: authenticationToken,
        sandbox,
        cache: doCache
      });
      const notebooks = await sharedClient.getNotebooks();
      notebooks[0].token = authenticationToken;
      return notebooks[0];
    },
    getSharedNotebookToken: async guid => {
      const noteStore = client.getNoteStore();
      const notebooks = await noteStore.listLinkedNotebooks();
      const notebook = notebooks.filter(x => x.guid === guid)[0];
      const { authenticationToken } = await client
        .getNoteStore(notebook.noteStoreUrl)
        .authenticateToSharedNotebook(notebook.sharedNotebookGlobalId);
      return authenticationToken;
    },
    getResourceByGuid: async guid => {
      const noteStore = client.getNoteStore();
      const x = await noteStore.getResource(guid, true, false, false, false);
      return x;
    },
    getTagByGuid: guid => {
      const noteStore = client.getNoteStore();
      return noteStore.getTag(guid);
    },
    getNoteByGuidInternal: async guid => {
      const noteStore = client.getNoteStore();
      const noteSpec = new Evernote.NoteStore.NoteResultSpec({
        includeContent: true,
        includeResourcesData: false
      });
      return noteStore.getNoteWithResultSpec(guid, noteSpec);
    },
    getNoteByGuid: async guid => {
      const note = await api.getNoteByGuidInternal(guid);
      note.resourceMap = {};
      note.tags = [];

      await Promise.all(
        (note.tagGuids || []).map(async x => {
          const tag = await api.getTagByGuid(x);
          note.tags.push(tag.name);
        })
      );
      await Promise.all(
        (note.resources || []).map(async ({ guid, mime, data }) => {
          const filename = `${guid}.${mime.split('/')[1]}`;
          note.resourceMap[toHexString(data.bodyHash.data || data.bodyHash)] = {
            filename,
            mime
          };
          if (process.env.CLOUDINARY_URL) {
            const cld = require('cloudinary');
            let image;
            try {
              image = await cld.v2.api.resource(`evernote/${guid}`);
            } catch (err) {
              if (get(err, 'error.http_code') === 420) {
                // throw err;
                console.log('RATE LIMITED!', err.error);
                image = {};
              } else {
                const noteStore = client.getNoteStore();
                const res = await noteStore.getResource(
                  guid,
                  true,
                  false,
                  false,
                  false
                );
                image = await new Promise(yay =>
                  cld.uploader
                    .upload_stream(yay, { public_id: `evernote/${guid}` })
                    .end(res.data.body.data || res.data.body)
                );
                console.log('UPLOADED!');
              }
            }
            note.resourceMap[
              toHexString(data.bodyHash.data || data.bodyHash)
            ].url =
              image.secure_url;
          } else {
            const res = await api.getResourceByGuid(guid);
            note.resourceMap[
              toHexString(data.bodyHash.data || data.bodyHash)
            ].data =
              res.data.body.data || res.data.body;
          }
        })
      );
      return note;
    },
    getNotesGuidsByNotebookGuid: async (guid, limit = 100) => {
      const noteStore = client.getNoteStore();
      const filter = new Evernote.NoteStore.NoteFilter({ notebookGuid: guid });
      const resultSpec = new Evernote.NoteStore.NotesMetadataResultSpec({
        includeTitle: true
      });
      const notesMeta = await noteStore.findNotesMetadata(
        filter,
        0,
        limit,
        resultSpec
      );
      return notesMeta.notes.map(({ guid }) => guid);
    }
  };
  if (doCache) {
    Object.keys(api)
      .filter(
        x =>
          [
            'getNotesByNotebookGuid',
            'getNotesBySharedNotebookGuid',
            'getNoteByGuid'
          ].indexOf(x) === -1
      )
      .forEach(key => {
        api[key] = cache(
          api[key],
          key,
          typeof doCache === 'string' ? doCache : undefined
        );
      });
  }
  return api;
};

export default createClient;
