const { RollingSizeOptions, RollingTimeOptions } = require('../utils/rollingOptions');

class RollingConfig {
  /**
   * Roll / Create new file every time the current file size
   * exceeds this threshold in 'seconds`'
   *
   * @type {RollingTimeOptions}
   * @private
   */
  #timeThreshold = RollingTimeOptions.Hourly;

  /**
   * @type {RollingSizeOptions}
   * @private
   */
  #sizeThreshold = RollingSizeOptions.FiveMB;

  /**
   * Assertion to check valid RollingConfig.
   * @param {RollingConfig} logConfig
   * @throws {Error} If the rolling config is not a RollingConfig instance.
   * @static
   */
  static assert(rollingConfig) {
    if (!(rollingConfig instanceof RollingConfig)) {
      throw new Error(
        `rollingConfig must be an instance of RollingConfig. Unsupported param ${JSON.stringify(
          rollingConfig
        )}`
      );
    }
  }

  /**
   * @returns {RollingTimeOptions} The current time threshold.
   */
  get timeThreshold() {
    return this.#timeThreshold;
  }

  /**
   * @returns {RollingSizeOptions} The current size threshold.
   */
  get sizeThreshold() {
    return this.#sizeThreshold;
  }

  /**
   * RollingConfig with default values.
   * @returns {RollingConfig} A new instance of RollingConfig with default values.
   * @static
   */
  static withDefaults() {
    return new RollingConfig();
  }

  /**
   * Build from a `json` object instead of the `Builder`
   * @param {object} json The object to be parsed into {RollingConfig}.
   * @returns {RollingConfig} A new instance of RollingConfig with values from the json object.
   * @throws {Error} If the json is not an object.
   * @static
   */
  static fromJson(json) {
    let rollingConfig = new RollingConfig();

    Object.keys(json).forEach((key) => {
      switch (key) {
        case 'sizeThreshold':
          rollingConfig = rollingConfig.withSizeThreshold(json[key]);
          break;
        case 'timeThreshold':
          rollingConfig = rollingConfig.withTimeThreshold(json[key]);
      }
    });

    return rollingConfig;
  }

  /**
   *
   * @param {number} sizeThreshold
   * @returns {RollingConfig} The current instance of RollingConfig.
   * @throws {Error} If the size threshold is not a valid RollingSizeOptions.
   */
  withSizeThreshold(sizeThreshold) {
    RollingSizeOptions.assert(sizeThreshold);
    this.#sizeThreshold = sizeThreshold;
    return this;
  }

  /**
   *
   * @param {number} timeThreshold
   * @returns {RollingConfig} The current instance of RollingConfig.
   * @throws {Error} If the time threshold is not a valid RollingTimeOptions.
   */
  withTimeThreshold(timeThreshold) {
    RollingTimeOptions.assert(timeThreshold);
    this.#timeThreshold = timeThreshold;
    return this;
  }
}

module.exports = { RollingConfig };
