import { cpus } from 'os';
import { fork } from 'child_process';
import { ensureDir } from 'fs-extra';
import createClient from './client';
import createProgress from './utils/progress';

export default async ({
  token,
  cache,
  isShared,
  dir,
  assets,
  config,
  notebookGuid
}) => {
  let client = createClient({
    token,
    cache
  });
  if (isShared) {
    const notebook = await client.getSharedNotebook(notebookGuid);
    notebookGuid = notebook.guid;
    token = notebook.token;
    client = createClient({
      token,
      cache
    });
  }

  const notes = await client.getNotesGuidsByNotebookGuid(notebookGuid);
  await ensureDir(dir);
  await ensureDir(assets);

  const concurrency = 10;
  const threads = Math.max(cpus().length, 1);

  console.log('Starting with', threads, 'threads');
  const progress = createProgress(notes.length);

  const chunks = notes.reduce((result, item, i) => {
    const worker = i % threads;
    if (!result[worker]) {
      result[worker] = [];
    }
    result[worker].push(item);
    return result;
  }, []);

  await Promise.all(
    chunks.map(
      chunk =>
        new Promise((resolve, reject) => {
          const worker = fork(require.resolve('./fetch-worker'), [], {
            env: process.env
          });
          const opt = {
            notes: chunk,
            concurrency,
            dir,
            assets,
            token,
            config,
            cache
          };
          worker.send(opt);
          worker.on('message', ({ type, payload }) => {
            if (type === 'progress' && progress) {
              progress.tick();
            } else if (type === 'error') {
              reject(payload);
            } else if (type === 'done') {
              resolve();
            }
          });
        })
    )
  );
  process.exit();
};
