import { reloadRoutes } from 'react-static/node';
import chokidar from 'chokidar';

chokidar
  .watch(require('path').resolve(__dirname, 'notes', 'md'))
  .on('all', () => reloadRoutes());

const retrieve = pth => {
  const filePath = require('path').resolve(
    __dirname,
    'notes',
    'md',
    `${pth}.md`
  );
  const md = require('fs-extra').readFileSync(filePath, { encoding: 'utf-8' });
  console.log(md);
  return markdownToMdastAndHeadings(md);
};
