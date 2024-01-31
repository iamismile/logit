const fs = require('node:fs/promises');
const path = require('node:path');

const { LogConfig } = require('./config/logConfig');
const { LogLevel } = require('./utils/logLevel');
const { checkAndCreateDir, getCallerInfo } = require('./utils/helper');

class Logger {
  /**
   * @type {LogConfig}
   * @private
   */
  #config;

  /**
   * @type {fs.FileHandle}
   */
  #logFileHandle;

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
   * Initializes the logger by creating the log file, and directory if they don't exist.
   */
  async init() {
    const logDirPath = checkAndCreateDir('logs');

    const fileName =
      this.#config.filePrefix + new Date().toISOString().replace(/[\.:]+/g, '-') + '.log';
    this.#logFileHandle = await fs.open(path.join(logDirPath, fileName), 'a+');
  }

  /**
   * Checks if the current log file needs to be rolled over.
   */
  async #rollingCheck() {
    const { sizeThreshold, timeThreshold } = this.#config.rollingConfig;
    const { size, birthtimeMs } = await this.#logFileHandle.stat();
    const currentTime = new Date().getTime();

    if (size >= sizeThreshold || currentTime - birthtimeMs >= timeThreshold * 1000) {
      await this.#logFileHandle.close();
      await this.init();
    }
  }

  /**
   * Writes the given message to the log file.
   * @param {string} message
   * @param {number} logLevel
   */
  async #writeToHandle(message, logLevel) {
    const dateIso = new Date().toISOString();
    const logLevelString = LogLevel.toString(logLevel);

    // write logs to the opened file
    const logMessage = `[${dateIso}] [${logLevelString}]: ${getCallerInfo()} ${message}\n`;
    await this.#logFileHandle.write(logMessage);
  }

  /**
   *
   * @param {string} message
   * @param {number} logLevel
   */
  async #log(message, logLevel) {
    if (logLevel < this.#config.level || !this.#logFileHandle.fd) {
      return;
    }

    await this.#writeToHandle(message, logLevel);
    await this.#rollingCheck();
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
