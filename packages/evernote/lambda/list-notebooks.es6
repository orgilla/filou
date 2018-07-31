exports.handler = client => async (event, context, callback) => {
  const noteStore = client.getNoteStore();
  const notebooks = await noteStore
    .listNotebooks()
    .catch(err => console.error(err));

  console.log(notebooks);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: notebooks.map(x => `<li>${x.name} (${x.guid})</li>`).join('')
  });
};
