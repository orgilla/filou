import { format } from 'date-fns';
import { get } from 'lodash';
import fm from 'front-matter';
import yaml from 'js-yaml';
import all from 'hast-util-to-mdast/lib/all';
import wrapped from 'hast-util-to-mdast/lib/wrap-children';
import {
  htmlToMdast,
  mdastToMarkdown,
  markdownToMdast,
  getText,
  getImage
} from '../markdown';

const normalize = ast => markdownToMdast(mdastToMarkdown(ast));
export default (note, plugins = []) => {
  const handlers = {
    'en-media': (h, node) => {
      // console.log(node);
      if (node.properties.type.indexOf('image/') === 0) {
        const props = {
          url: `${note.resourceMap[node.properties.hash].filename}`
          // title: node.properties.title || null,
          // alt: node.properties.alt || null
        };
        return h(node, 'image', props);
      }
    },
    span: (h, node) => {
      const style = get(node, 'properties.style') || '';
      if (style.indexOf('font-size:') !== -1) {
        const size = parseInt(
          ((style.split('font-size:')[1] || '').split('px')[0] || '').trim(),
          10
        );
        console.log(size);
        if (size >= 48) {
          return h(node, 'heading', { depth: 1 }, all(h, node));
        } else if (size >= 36) {
          return h(node, 'heading', { depth: 2 }, all(h, node));
        } else if (size >= 24) {
          return h(node, 'heading', { depth: 3 }, all(h, node));
        } else if (size >= 18) {
          return h(node, 'heading', { depth: 4 }, all(h, node));
        }
      }
      return all(h, node);
    }
  };

  const frontmatter = {};
  let mdast = normalize(htmlToMdast(note.content, handlers));

  plugins.forEach(plugin => {
    const newMdast = plugin(mdast, frontmatter, note);
    if (newMdast) {
      mdast = newMdast;
    }
  });

  if (Object.keys(frontmatter).length) {
    return `---\n${yaml.dump(frontmatter).trim()}\n---\n${mdastToMarkdown(
      normalize(mdast)
    )}`;
  }
  return mdastToMarkdown(normalize(mdast));
};

export const tableToFrontmatter = (mdast, frontmatter) => {
  if (
    mdast.children &&
    mdast.children[0] &&
    mdast.children[0].type === 'paragraph' &&
    mdast.children[0].children &&
    mdast.children[0].children.length === 1 &&
    mdast.children[0].children[0].type === 'break'
  ) {
    mdast.children = mdast.children.slice(1);
  }
  if (
    mdast.children &&
    mdast.children.length &&
    mdast.children[0] &&
    mdast.children[0].type === 'table'
  ) {
    const table = mdast.children[0];

    table.children.forEach(x => {
      const [cell1, cell2] = x.children;
      const text1 = getText(cell1);
      const text2 = getText(cell2) || getImage(cell2);
      frontmatter[text1] = text2;
    });

    mdast.children = mdast.children.slice(1);
  }
};

export const inject = (...args) => (mdast, frontmatter, note) => {
  args.forEach(prop => {
    if (typeof prop === 'function') {
      prop(frontmatter, note);
    } else if (prop === 'tags') {
      frontmatter.tags = note.tags;
    } else if (prop === 'id') {
      frontmatter.id = `evernote:${note.guid}`;
    } else if (prop === 'source') {
      frontmatter.source = 'evernote';
    } else if (prop.indexOf('created:') === 0) {
      frontmatter.created = format(
        note.created,
        prop.substr('created:'.length)
      );
    } else if (note[prop]) {
      frontmatter[prop] = note[prop];
    }
  });
};
