import fm from 'front-matter';

const unified = require('unified');
const parse = require('rehype-parse');
const parse2 = require('remark-parse');
const stringify = require('remark-stringify');
const squeeze = require('mdast-squeeze-paragraphs');
const toMDAST = require('hast-util-to-mdast');

export const mdastToMarkdown = mdast =>
  unified()
    .use(stringify)
    .stringify(mdast);

export const htmlToMdast = (cooked, handlers) =>
  squeeze(
    toMDAST(
      unified()
        .use(parse)
        .parse(cooked, {
          verbose: true
        }),
      {
        handlers
      }
    )
  );

export const htmlToMarkdown = (cooked, handlers) => {
  const mdast = htmlToMdast(cooked, handlers);
  return mdastToMarkdown(mdast);
};

export const markdownToMdast = md =>
  unified()
    .use(parse2, { commonmark: true })
    .parse(md);

export const markdownToMdastAndHeadings = (src = '') => {
  const { body, attributes } = fm(src);
  const ast = markdownToMdast(body);

  const headings = ast.children
    .filter(x => x.type === 'heading')
    .map(x => ({ depth: x.depth, value: x.children[0].value }));

  return { ...attributes, ast, headings };
};

export const htmlToMdastAndHeadings = (src, handlers) =>
  markdownToMdastAndHeadings(htmlToMarkdown(src, handlers));
