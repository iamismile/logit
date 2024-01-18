const path = require('node:path');

const { Logger, LogConfig } = require('./index');

async function initializeLogger() {
  const logger = Logger.withConfig(LogConfig.fromFile(path.join(__dirname, 'config.json')));
  await logger.init();

  return logger;
}

async function main() {
  const logger = await initializeLogger();
  logger.error('This is an error message');
}

main();
