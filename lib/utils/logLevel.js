class LogLevel {
  static #Debug = 0;
  static #Info = 1;
  static #Warn = 2;
  static #Error = 3;
  static #Critical = 4;

  /**
   * Assertion to check valid log level.
   * @param {LogLevel} logLevel
   * @throws {Error} If the log level is not a valid LogLevel.
   * @static
   */
  static assert(logLevel) {
    if (
      ![
        LogLevel.#Debug,
        LogLevel.#Info,
        LogLevel.#Warn,
        LogLevel.#Error,
        LogLevel.#Critical,
      ].includes(logLevel)
    ) {
      throw new Error(
        `logLevel must be an instance of LogLevel. Unsupported param ${JSON.stringify(logLevel)}`
      );
    }
  }

  static get Debug() {
    return this.#Debug;
  }

  static get Info() {
    return this.#Info;
  }

  static get Warn() {
    return this.#Warn;
  }

  static get Error() {
    return this.#Error;
  }

  static get Critical() {
    return this.#Critical;
  }

  /**
   *
   * @param {number} logLevel
   * @returns {'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL'}
   * @throws {Error} If the log level is not a valid LogLevel.
   * @static
   */
  static toString(logLevel) {
    const levelMap = {
      [this.#Debug]: 'DEBUG',
      [this.#Info]: 'INFO',
      [this.#Warn]: 'WARN',
      [this.#Error]: 'ERROR',
      [this.#Critical]: 'CRITICAL',
    };

    if (levelMap.hasOwnProperty(logLevel)) {
      return levelMap[logLevel];
    }

    throw new Error(`Unsupported log level ${logLevel}`);
  }
}

module.exports = { LogLevel };
