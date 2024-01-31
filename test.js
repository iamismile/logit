const { Logger, LogConfig } = require('./index');

async function init() {
  const logger = Logger.withConfig(LogConfig.fromFile('config.json'));
  await logger.init();
  return logger;
}

async function main() {
  const logger = await init();
  setInterval(() => {
    logger.critical('Hello World!\n');
  }, 20);
}

main();
