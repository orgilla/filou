import Evernote from 'evernote';
import { readFileSync } from 'fs-extra';
import { resolve, basename } from 'path';
import crypto from 'crypto';
import mime from 'mime';

exports.handler = (token, notebookGuid) => async (event, context, callback) => {
  const client = new Evernote.Client({ token, sandbox: false });
  const noteStore = client.getNoteStore();

  let nBody = '<?xml version="1.0" encoding="UTF-8"?>';
  nBody += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
  nBody += `<en-note>Hi`;

  // Create note object
  const ourNote = new Evernote.Types.Note();

  const file = resolve(
    '/Users/bkniffler/Projects/qkg',
    'public',
    'icon',
    `android-chrome-36x36.png`
  );
  const attachment = readFileSync(file);
  const hash = attachment.toString('base64');

  const data = new Evernote.Types.Data();
  data.size = attachment.length;
  data.bodyHash = hash;
  data.body = attachment;

  const resource = new Evernote.Types.Resource();
  resource.mime = mime.getType(file);
  resource.data = data;

  const attributes = new Evernote.Types.ResourceAttributes();
  attributes.fileName = basename(file);
  attributes.timestamp = new Date().getTime();

  resource.attributes = attributes;
  ourNote.resources = [resource];

  const md5 = crypto.createHash('md5');
  md5.update(attachment);
  const hashHex = md5.digest('hex');

  nBody += `<br/><en-media type="${resource.mime}" hash="${hashHex}"/>`;

  nBody += `</en-note>`;

  ourNote.title = 'NEUE NOTE';
  ourNote.content = nBody;

  ourNote.notebookGuid = notebookGuid;
  const note = await noteStore.createNote(ourNote).catch(err => {
    console.log(err);
  });

  console.log(note);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: 'YAY'
  });
};
