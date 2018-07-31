import { writeFile, ensureDir } from 'fs-extra';
import { resolve, dirname } from 'path';
import { template, templateSettings } from 'lodash';
import { parse } from 'himalaya';
import slugify from 'slugify';
import createClient from './client';

templateSettings.interpolate = /{([\s\S]+?)}/g;

const handleCollection = async (client, collection, options) => {
  const { filterByTags } = collection;
  const { dir, assets, name, asset, notebookGuid, visit: vst } = options;

  const notes = await client.getNotesGuidsByNotebookGuid(notebookGuid);
  await ensureDir(dir);
  await ensureDir(assets);
  let promise = Promise.resolve();
  notes.forEach(async guid => {
    promise = promise.then(async () => {
      console.log('Parsing', guid);
      const note = await client.getNoteByGuid(guid);
      if (filterByTags && filterByTags.find(x => note.tags.indexOf(x) === -1)) {
        return Promise.resolve();
      }

      const file = resolve(
        dir,
        typeof name === 'function' ? name(note) : template(name)(note)
      );

      await ensureDir(dirname(file));

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

      // await writeFile(`${file}.md`, evernoteToMarkdown(note, plugins).trim());
      // await writeFile(`${file}.html`, note.content);

      const content = parse(note.content)[1].children;

      const props = {};
      const headings = [];
      const visit2 = (node, index, parent, children) => {
        if (node.tagName === 'br' && children.length === 0) {
          return null;
        }
        if (
          children.length === 0 &&
          node.tagName === 'table' &&
          node.children[0].children.length === 2
        ) {
          node.children[1].children.forEach(row => {
            const value1 = row.children[0].children[0].content;
            const value2 = row.children[1].children[0].content;
            props[value1] = value2;
          });
          return null;
        }
        const x = vst ? vst(node, index, parent, children) : node;
        if (x && x.props && x.props.style) {
          delete x.props.style;
        }
        return x;
      };

      const visit = (node, index, parent, children) => {
        if (
          node.tagName === 'div' &&
          node.children.find(x => x.tagName === 'table')
        ) {
          node = node.children.find(x => x.tagName === 'table');
        }

        if (node.tagName === 'div' && node.children.length === 1) {
          if (
            node.props.style &&
            node.props.style.indexOf('center') !== -1 &&
            parent
          ) {
            parent.props.center = true;
          }
          node = node.children[0];
        }

        if (
          node.tagName === 'a' &&
          node.props.href &&
          node.props.href.indexOf('evernote://') === 0
        ) {
          const split = node.props.href.split('/');
          node.props.href = `evernote://${split[split.length - 2]}`;
        }

        const { style } = node.props;
        if (node.tagName === 'span' && style && style.indexOf('24px') !== -1) {
          const size = parseInt(
            ((style.split('font-size:')[1] || '').split('px')[0] || '').trim(),
            10
          );

          if (size >= 48) {
            headings.push({ depth: 1, value: node.children[0].content });
            node = { ...node, tagName: 'h1' };
          } else if (size >= 36) {
            headings.push({ depth: 2, value: node.children[0].content });
            node = { ...node, tagName: 'h2' };
          } else if (size >= 24) {
            headings.push({ depth: 3, value: node.children[0].content });
            node = { ...node, tagName: 'h3' };
          } else if (size >= 18) {
            headings.push({ depth: 4, value: node.children[0].content });
            node = { ...node, tagName: 'h4' };
          }
        }

        if (
          node.tagName === 'span' &&
          style &&
          style.indexOf('evernote-highlight') !== -1
        ) {
          node.tagName = 'field';
          node.props.value = node.children[0].content;
          if (node.props.value.indexOf(' ') !== -1) {
            const [type, ...value] = node.props.value.split(' ');
            node.tagName = type;
            node.props.value = value.length === 1 ? value[0] : value;
          }
          node.children = [];
        }

        if (
          node.tagName === 'div' &&
          node.children &&
          node.children.length === 2 &&
          node.children[0].tagName === 'en-media' &&
          node.children[1].tagName === 'br'
        ) {
          node = node.children[0];
        }

        if (
          node.tagName === 'en-media' &&
          node.props.type &&
          node.props.type.indexOf('image/') === 0
        ) {
          const { hash } = node.props;
          node.tagName = 'img';
          node.props = {
            value: `/${note.resourceMap[hash].filename}`
          };
        }

        if (node.tagName === 'span' && node.children.length === 1) {
          node = node.children[0];
        }

        return node;
      };

      const clean = node => {
        const children = [];
        if (!node || !node.children) {
          return node;
        }
        for (let i = 0; i < node.children.length; i++) {
          const currentNode = node.children[i];
          currentNode.props = currentNode.attributes
            ? currentNode.attributes.reduce(
                (store, x) => ({ ...store, [x.key]: x.value }),
                {}
              )
            : {};
          delete currentNode.attributes;
          children.push(clean(currentNode));
        }
        const newNode = { ...node, children };
        return newNode;
      };

      const recurse = node => {
        const children = [];
        if (!node || !node.children) {
          return node;
        }
        for (let i = 0; i < node.children.length; i++) {
          const currentNode = node.children[i];
          const edited = visit(currentNode, i, node, children);
          if (edited) {
            children.push(recurse(edited));
          }
        }
        const newNode = { ...node, children };
        return newNode;
      };

      const recurseAfter = node => {
        const children = [];
        if (!node || !node.children) {
          return node;
        }
        for (let i = 0; i < node.children.length; i++) {
          const currentNode = node.children[i];
          const edited = visit2(currentNode, i, node, children);
          if (edited) {
            children.push(recurseAfter(edited));
          }
        }
        const newNode = { ...node, children };
        return newNode;
      };

      const title =
        note.title.indexOf(') ') !== -1
          ? note.title.split(') ')[1]
          : note.title;

      await writeFile(
        `${file}.json`,
        JSON.stringify(
          {
            ...props,
            id: note.guid,
            created: note.created,
            updated: note.udated,
            tags: note.tags,
            name: note.title,
            title,
            slug: `/${slugify(title)}`.toLowerCase(),
            headings,
            content: recurseAfter(recurse(clean({ children: content })))
              .children
            // src: note.content
          },
          null,
          4
        )
      );
    });
  });
  return promise;
};

export default async ({
  token,
  cache,
  isShared,
  collections = [{}],
  ...rest
}) => {
  let client = createClient({
    token,
    cache
  });

  if (isShared) {
    const notebook = await client.getSharedNotebook(rest.notebookGuid);
    rest.notebookGuid = notebook.guid;
    client = createClient({
      token: notebook.token,
      cache
    });
  }

  return Promise.all(
    collections.map(collection =>
      handleCollection(client, collection, rest, isShared)
    )
  );
};
