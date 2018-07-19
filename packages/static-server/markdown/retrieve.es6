import { reloadRoutes } from 'react-static/node';
import chokidar from 'chokidar';
import { resolve } from 'path';
import { readFileSync } from 'fs-extra';
import { markdownToMdastAndHeadings } from './markdown';

export default base => {
  chokidar.watch(base).on('all', () => reloadRoutes());
  return pth => {
    const filePath = resolve(base, `${pth}.md`);
    const md = readFileSync(filePath, {
      encoding: 'utf-8'
    });
    return markdownToMdastAndHeadings(md);
  };
};
