import { writeFile, ensureDir } from 'fs-extra';
import { resolve, dirname } from 'path';
import { template, templateSettings } from 'lodash';
import { parse } from 'himalaya';
import slugify from 'slugify';
import createClient from './client';
import createVisitor from './utils/create-visitor';
import traverse from './utils/traverse';
import {
  unwrapTable,
  center,
  internalLinks,
  headings,
  fields,
  unwrapMedia,
  mediaToImage,
  unwrapText,
  removeFont,
  removeBreaks,
  extractTableAtStart,
  removeStyle,
  run
} from './plugins/content';

const prepare = traverse(n => {
  let { attributes, ...node } = n;
  attributes = (attributes || []).reduce(
    (store, x) => ({ ...store, [x.key]: x.value }),
    {}
  );
  const { style, ...props } = attributes || {};
  delete node.attributes;
  return { ...node, style, props };
});
const noteTitle = note => {
  note.name =
    note.title.indexOf(') ') !== -1 ? note.title.split(') ')[1] : note.title;
  return note;
};
const noteSlug = note => {
  note.slug = `/${slugify(note.name || note.title)}`.toLowerCase();
  return note;
};

const pluginTraverse = (plugins, ...args) => first =>
  plugins.reduce((store, plugin) => traverse(plugin, ...args)(store), first);

templateSettings.interpolate = /{([\s\S]+?)}/g;

process.on('message', async options => {
  const { notes, dir, assets, config, token, cache } = options;
  const { asset, visit: vst, name } = require(config);
  let current;

  try {
    const client = createClient({
      token,
      cache
    });
    for (const guid of notes) {
      const note = await client.getNoteByGuid(guid);
      current = note;
      let result = {
        id: note.guid,
        created: note.created,
        updated: note.updated,
        tags: note.tags,
        title: note.title
      };
      result = createVisitor([noteTitle, noteSlug])(result);

      const file = resolve(
        dir,
        typeof name === 'function' ? name(note) : template(name)(note)
      );

      await ensureDir(dirname(file));

      if (!process.env.CLOUDINARY_URL) {
        await Promise.all(
          Object.keys(note.resourceMap).map(async key => {
            const { data } = note.resourceMap[key];
            const assetName =
              typeof asset === 'function'
                ? asset(note.resourceMap[key], note)
                : template(asset)(note.resourceMap[key]);
            note.resourceMap[key].filename = assetName;
            await ensureDir(dirname(resolve(assets, assetName)));
            return writeFile(
              resolve(assets, assetName),
              typeof data === 'object' ? new Buffer(data) : data,
              {
                encoding: 'utf-8'
              }
            );
          })
        );
      }
      result.content = parse(note.content)[1].children;
      result.content = prepare({ children: result.content }).children;
      result.content = pluginTraverse(
        [
          unwrapTable,
          center,
          internalLinks,
          headings,
          fields,
          unwrapMedia,
          mediaToImage,
          unwrapText,
          removeFont,
          removeBreaks,
          extractTableAtStart,
          // removeStyle,
          run(vst)
        ],
        result,
        note
      )({ children: result.content }).children;
      await writeFile(`${file}.json`, JSON.stringify(result, null, 4));
      process.send({ type: 'progress' });
    }
    process.send({ type: 'done' });
  } catch (error) {
    console.log(error);
    process.send({ type: 'error', error });
  }
});
