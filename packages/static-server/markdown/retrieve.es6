import { reloadRoutes } from 'react-static/node';
import { set } from 'lodash';
import glob from 'glob';
import chokidar from 'chokidar';
import { resolve } from 'path';
import { readFileSync } from 'fs-extra';
import { markdownToMdastAndHeadings } from './markdown';

export const retrieve = (base, pth) => {
  const filePath = resolve(base, `${pth}.md`);
  const md = readFileSync(filePath, {
    encoding: 'utf-8'
  });
  return markdownToMdastAndHeadings(md);
};

export const createRetriever = base => pth => retrieve(base, pth);

export const getStructure = base => {
  const files = glob.sync(resolve(base, '**/*.md'));
  const obj = {};
  files.map(x => {
    const part = x.substr(base.length + 1).replace('.md', '');
    set(obj, part.split('/').join('.'), retrieve(base, part));
  });
  return obj;
  // return markdownToMdastAndHeadings(md);
};

export const watch = base => {
  chokidar.watch(base).on('all', () => reloadRoutes());
};
