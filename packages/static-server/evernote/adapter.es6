import Evernote from 'evernote';
import { writeFile, ensureDir } from 'fs-extra';
import { resolve, dirname } from 'path';
import { template, templateSettings } from 'lodash';
import createClient from './client';
import evernoteToMarkdown from './markdown';

templateSettings.interpolate = /{([\s\S]+?)}/g;

const handleCollection = async (client, collection, options) => {
  const {
    notebookGuid,
    filterByTags,
    name,
    plugins: collectionPlugins = []
  } = collection;
  const { dir, assets, plugins: globalPlugins = [] } = options;
  const plugins = [...globalPlugins, ...collectionPlugins];

  const notes = await client.getNotesByNotebookGuid(notebookGuid);
  await ensureDir(dir);
  await ensureDir(assets);
  return Promise.all(
    notes.map(async note => {
      if (filterByTags && filterByTags.find(x => note.tags.indexOf(x) === -1)) {
        return Promise.resolve();
      }

      const file = resolve(
        dir,
        typeof name === 'function' ? name(note) : template(name)(note)
      );
      await ensureDir(dirname(file));

      await Promise.all(
        Object.keys(note.resourceMap).map(key => {
          const { filename, data, mime } = note.resourceMap[key];
          return writeFile(
            resolve(assets, filename),
            typeof data === 'object' ? new Buffer(data) : data,
            {
              encoding: 'utf-8'
            }
          );
        })
      );

      return writeFile(file, evernoteToMarkdown(note, plugins).trim());
    })
  );
};

export default async ({ token, cache, collections, dir, assets, plugins }) => {
  const client = createClient({
    token,
    cache
  });

  return Promise.all(
    collections.map(collection =>
      handleCollection(client, collection, {
        dir,
        assets,
        plugins
      })
    )
  );
};
