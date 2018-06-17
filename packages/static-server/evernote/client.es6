import Evernote from 'evernote';
import cache from '../cache';

function toHexString(byteArray) {
  let s = '';
  byteArray.forEach(byte => {
    s += `0${(byte & 0xff).toString(16)}`.slice(-2);
  });
  return s;
}
export default ({ token, sandbox = false, cache: doCache = false }) => {
  const client = new Evernote.Client({ token, sandbox });
  const api = {
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
        note.resources.map(async ({ guid, mime, data }) => {
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
    getNotesByNotebookGuid: async (notebookGuid, limit = 100) => {
      const noteStore = client.getNoteStore();
      const filter = new Evernote.NoteStore.NoteFilter({ notebookGuid });
      const resultSpec = new Evernote.NoteStore.NotesMetadataResultSpec({
        includeTitle: true
      });
      const notesMeta = await noteStore.findNotesMetadata(
        filter,
        0,
        limit,
        resultSpec
      );
      return Promise.all(
        notesMeta.notes.map(({ guid }) => api.getNoteByGuid(guid))
      );
    }
  };
  if (doCache) {
    Object.keys(api).forEach(key => {
      api[key] = cache(
        api[key],
        key,
        typeof doCache === 'string' ? doCache : undefined
      );
    });
  }
  return api;
};
