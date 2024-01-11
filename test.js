const { Logger, LogConfig } = require('./index');

const logger = Logger.withConfig(LogConfig.fromFile('./config.json'));

console.log(logger.filePrefix);
console.log(logger.sizeThreshold);
console.log(logger.timeThreshold);
console.log(logger.level);

logger.debug('Hello debug');
logger.info('Hello info');
logger.warn('Hello warning');
logger.error('Hello error');
logger.critical('Hello critical');
