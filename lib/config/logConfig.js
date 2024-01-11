const fs = require('node:fs');

const { LogLevel } = require('../utils/logLevel');
const { RollingConfig } = require('./rollingConfig');

class LogConfig {
  /**
   * @type {LogLevel}
   * @private
   * @description The log level to be send
   */
  #level = LogLevel.Info;

  /**
   * @type {RollingConfig}
   * @private
   */
  #rollingConfig = RollingConfig.withDefaults();

  /**
   * @type {string}
   * @private
   * @description The prefix to be used for the log file name.
   */
  #filePrefix = 'Logit_';

  /**
   * Assertion to check config is valid.
   * @param {LogConfig} logConfig
   * @throws {Error} If the log config is not a LogConfig instance.
   * @static
   */
  static assert(logConfig) {
    if (arguments.length > 0 && !(logConfig instanceof LogConfig)) {
      throw new Error(
        `logConfig must be an instance of LogConfig. Unsupported param ${JSON.stringify(logConfig)}`
      );
    }
  }

  /**
   * @returns {LogLevel} The current log level.
   */
  get level() {
    return this.#level;
  }

  /**
   * @returns {RollingConfig} The current rolling config.
   */
  get rollingConfig() {
    return this.#rollingConfig;
  }

  /**
   * @returns {string} The current file prefix.
   */
  get filePrefix() {
    return this.#filePrefix;
  }

  /**
   * LogConfig with default values.
   * @returns {LogConfig} A new instance of a LogConfig with default values.
   * @static
   */
  static withDefaults() {
    return new LogConfig();
  }

  /**
   * Build from a config file path instead of the `Builder`
   * @param {string} filePath The path to the config file.
   * @returns {LogConfig} A new instance of LogConfig with values from the config file.
   * @throws {Error} If the filePath is not a string.
   */
  static fromFile(filePath) {
    const contents = fs.readFileSync(filePath);
    return LogConfig.fromJson(JSON.parse(contents));
  }

  /**
   * Build from a `json` object instead of the `Builder`
   * @param {object} json The json object to be parsed into {LogConfig}.
   * @returns {LogConfig} A new instance of LogConfig with values from the json object.
   * @static
   */
  static fromJson(json) {
    let logConfig = new LogConfig();

    Object.keys(json).forEach((key) => {
      switch (key) {
        case 'level':
          logConfig = logConfig.withLogLevel(json[key]);
          break;
        case 'rollingConfig':
          logConfig = logConfig.withRollingConfig(json[key]);
          break;
        case 'filePrefix':
          logConfig = logConfig.withFilePrefix(json[key]);
          break;
      }
    });

    return logConfig;
  }

  /**
   *
   * @param {LogLevel} logLevel  The log level to be set.
   * @returns {LogConfig} The current instance of LogConfig.
   * @throws {Error} If the logLevel is not a valid LogLevel.
   */
  withLogLevel(logLevel) {
    LogLevel.assert(logLevel);
    this.#level = logLevel;
    return this;
  }

  /**
   *
   * @param {RollingConfig} rollingConfig  The rolling config to be set.
   * @returns {LogConfig} The current instance of LogConfig.
   * @throws {Error} If the rollingConfig is not a valid RollingConfig.
   */
  withRollingConfig(rollingConfig) {
    this.#rollingConfig = RollingConfig.fromJson(rollingConfig);
    return this;
  }

  /**
   *
   * @param {string} filePrefix The file prefix to be set.
   * @returns {LogConfig} The current instance of LogConfig.
   * @throws {Error} If the filePrefix is not a string.
   */
  withFilePrefix(filePrefix) {
    if (typeof filePrefix !== 'string') {
      throw new Error(
        `filePrefix must be a string. Unsupported param ${JSON.stringify(filePrefix)}`
      );
    }

    this.#filePrefix = filePrefix;
    return this;
  }
}

module.exports = { LogConfig };
