import Evernote from 'evernote';
import cache from './cache';

function toHexString(byteArray) {
  let s = '';
  byteArray.forEach(byte => {
    s += `0${(byte & 0xff).toString(16)}`.slice(-2);
  });
  return s;
}

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
    getNoteByGuid: async guid => {
      const noteStore = client.getNoteStore();
      const noteSpec = new Evernote.NoteStore.NoteResultSpec({
        includeContent: true,
        includeResourcesData: true
      });
      const note = await noteStore.getNoteWithResultSpec(guid, noteSpec);
      note.resourceMap = {};
      note.tags = [];
      await Promise.all(
        (note.resources || []).map(async ({ guid, mime, data }) => {
          const filename = `${guid}.${mime.split('/')[1]}`;
          note.resourceMap[toHexString(data.bodyHash)] = {
            filename,
            data: data.body,
            mime
          };
        })
      );

      await Promise.all(
        (note.tagGuids || []).map(async x => {
          const tag = await noteStore.getTag(x);
          note.tags.push(tag.name);
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
          ['getNotesByNotebookGuid', 'getNotesBySharedNotebookGuid'].indexOf(
            x
          ) === -1
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
