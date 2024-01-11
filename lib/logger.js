const { LogConfig } = require('./config/logConfig');
const { LogLevel } = require('./utils/logLevel');

class Logger {
  /**
   * @type {LogConfig}
   * @private
   */
  #config;

  /**
   *
   * @param {LogConfig} logConfig
   */
  constructor(logConfig = LogConfig.withDefaults()) {
    LogConfig.assert(logConfig);
    this.#config = logConfig;
  }

  /**
   * @returns {LogLevel} The current log level.
   */
  get level() {
    return this.#config.level;
  }

  /**
   * @returns {string} The current file prefix.
   */
  get filePrefix() {
    return this.#config.filePrefix;
  }

  /**
   * @returns {number} The current time threshold.
   */
  get timeThreshold() {
    return this.#config.rollingConfig.timeThreshold;
  }

  /**
   * @returns {number} The current size threshold.
   */
  get sizeThreshold() {
    return this.#config.rollingConfig.sizeThreshold;
  }

  /**
   *
   * @returns {Logger} A new instance of Logger with default config.
   * @static
   */
  static withDefaults() {
    return new Logger();
  }

  /**
   *
   * @param {LogConfig} logConfig The log config to be set.
   * @returns {Logger} A new instance of a Logger.
   * @static
   */
  static withConfig(logConfig) {
    return new Logger(logConfig);
  }

  /**
   *
   * @param {string} message
   * @param {number} logLevel
   */
  #log(message, logLevel) {
    if (logLevel < this.#config.level) return;
    console.log('%s: %s', LogLevel.toString(logLevel), message);
  }

  /**
   *
   * @param {string} message
   */
  debug(message) {
    this.#log(message, LogLevel.Debug);
  }

  /**
   *
   * @param {string} message
   */
  info(message) {
    this.#log(message, LogLevel.Info);
  }

  /**
   *
   * @param {string} message
   */
  warn(message) {
    this.#log(message, LogLevel.Warn);
  }

  /**
   *
   * @param {string} message
   */
  error(message) {
    this.#log(message, LogLevel.Error);
  }

  /**
   *
   * @param {string} message
   */
  critical(message) {
    this.#log(message, LogLevel.Critical);
  }
}

module.exports = { Logger };
