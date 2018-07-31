import { reloadRoutes } from 'react-static/node';
import { set } from 'lodash';
import glob from 'glob';
import chokidar from 'chokidar';
import { resolve } from 'path';
import { readJsonSync } from 'fs-extra';

export default base => {
  const files = glob.sync(resolve(base, '**/*.json'));
  const struct = {};
  const map = {};
  const map2 = {};
  files.map(x => {
    const part = x.substr(base.length + 1).replace('.json', '');
    const json = readJsonSync(resolve(base, `${part}.json`));
    const path =
      part.replace('/index', '') === 'index' ? '/' : part.replace('/index', '');
    map[json.id] = json;
    map2[path] = json.id;
    set(struct, path, json.id);
  });
  const read = pth => {
    if (pth.indexOf('/**') !== -1) {
      return Object.keys(map2)
        .filter(x => x.indexOf(pth.replace('/**', '/')) === 0)
        .map(key => map[map2[key]]);
    }
    if (pth.indexOf('/*') !== -1) {
      return Object.keys(map2)
        .filter(
          x =>
            x.indexOf(pth.replace('/*', '/')) === 0 &&
            x.substr(pth.length).indexOf('/') === -1
        )
        .map(key => map[map2[key]]);
    }
    return map[map2[pth]] || map[pth];
  };
  return read;
};

export const watch = base => {
  chokidar.watch(base).on('all', () => reloadRoutes());
};
