import { resolve } from 'path';
import evernoteToMd, { inject, tableToFrontmatter } from '../';

exports.handler = (token, collections) => async (event, context, callback) => {
  await evernoteToMd({
    token,
    collections,
    cache: resolve('/Users/bkniffler/Projects/qkg/.cache'),
    dir: resolve('/Users/bkniffler/Projects/qkg', 'notes', 'md'),
    assets: resolve('/Users/bkniffler/Projects/qkg', 'notes', 'assets'),
    plugins: [tableToFrontmatter, inject('id')]
  });
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: 'OK'
  });
};
