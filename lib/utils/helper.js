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

/**
 * Capture caller error metadata.
 * @returns {string}
 */
function getCallerInfo() {
  const error = {};
  Error.captureStackTrace(error);

  const callerFrame = error.stack.split('\n')[5];
  const metaData = callerFrame.split('at ').pop();
  return metaData;
}

module.exports = {
  checkAndCreateDir,
  getCallerInfo,
};
