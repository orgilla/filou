const {
  existsSync,
  writeJsonSync,
  readJsonSync,
  ensureDirSync
} = require('fs-extra');
const { resolve } = require('path');

const cacheFile = resolve(process.cwd(), '.cache');
const cache = (func, folder) => async (...args) => {
  const key = `${args[0]}`
    .split('/')
    .join('-')
    .split(' ')
    .join('-')
    .split('\\')
    .join('-');
  const filePath = resolve(cacheFile, folder, `${key}.json`);
  if (existsSync(filePath)) {
    return readJsonSync(filePath);
  }
  const result = await func(...args);
  ensureDirSync(resolve(cacheFile, folder));
  writeJsonSync(filePath, result);
  return result;
};

module.exports = cache;
