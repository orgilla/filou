import Evernote from 'evernote';

exports.handler = client => async (event, context, callback) => {
  const noteStore = client.getNoteStore();
  const notebook = await noteStore
    .getDefaultNotebook()
    .catch(err => console.error(err));

  const filter = new Evernote.NoteStore.NoteFilter({
    notebookGuid: notebook.guid
  });
  const resultSpec = new Evernote.NoteStore.NotesMetadataResultSpec({
    includeTitle: true
  });
  const noteSpec = new Evernote.NoteStore.NoteResultSpec({
    includeContent: true
  });

  const notesMeta = await noteStore
    .findNotesMetadata(filter, 0, 100, resultSpec)
    .catch(err => console.error(err));
  let result = '';
  result += `Found ${
    notesMeta.notes.length
  } notes in your default notebook . . .`;
  notesMeta.notes.forEach(async ({ title, guid }) => {
    const note = await noteStore
      .getNoteWithResultSpec(guid, noteSpec)
      .catch(err => {
        console.error(err);
      });
    result += `<li>$${note.title}</li>`;
  });

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: result
  });
};
