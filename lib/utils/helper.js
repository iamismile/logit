const fsSync = require('node:fs');
const path = require('path');

/**
 *
 * @param {string} pathToDir
 * @returns {fsSync.PathLike} The path to the directory.
 */
function checkAndCreateDir(pathToDir) {
  const logDir = path.resolve(require.main.path, pathToDir);
  if (!fsSync.existsSync(logDir)) {
    fsSync.mkdirSync(logDir, { recursive: true });
  }

  return logDir;
}

module.exports = {
  checkAndCreateDir,
};
