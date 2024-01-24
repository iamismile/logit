const path = require('node:path');

const { Logger, LogConfig } = require('./index');

async function initializeLogger() {
  const logger = Logger.withConfig(LogConfig.fromFile(path.join(__dirname, 'config.json')));
  await logger.init();

  return logger;
}

async function main() {
  const logger = await initializeLogger();
  // logger.error('This is an error message');
  nested_func(logger);
}

function nested_func(logger) {
  super_nested(logger);
}

function super_nested(logger) {
  logger.critical('Testing');
}

main();
