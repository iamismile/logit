class RollingSizeOptions {
  static OneKB = 1024;
  static FiveKB = 5 * this.OneKB;
  static TenKB = 10 * this.OneKB;
  static TwentyKB = 20 * this.OneKB;
  static FiftyKB = 50 * this.OneKB;
  static HundredKB = 100 * this.OneKB;

  static HalfMB = 512 * this.OneKB;
  static OneMB = 1024 * this.OneKB;
  static FiveMB = 5 * this.OneMB;
  static TenMB = 10 * this.OneMB;
  static TwentyMB = 20 * this.OneMB;
  static FiftyMB = 50 * this.OneMB;
  static HundredMB = 100 * this.OneMB;

  /**
   * Assertion to check valid size options.
   * @param {number} sizeThreshold
   * @throws {Error} If the size threshold is less than 1 KB.
   * @static
   */
  static assert(sizeThreshold) {
    if (typeof sizeThreshold !== 'number' || sizeThreshold < this.OneKB) {
      throw new Error(
        `sizeThreshold must be at-least 1 KB. Unsupported param ${JSON.stringify(sizeThreshold)}`
      );
    }
  }
}

class RollingTimeOptions {
  static Minutely = 60; // every 60 seconds
  static Hourly = 60 * this.Minutely;
  static Daily = 24 * this.Hourly;
  static Weekly = 7 * this.Daily;
  static Monthly = 30 * this.Daily;
  static Yearly = 12 * this.Monthly;

  /**
   * Assertion to check valid time options.
   * @param {RollingTimeOptions} timeOption
   * @throws {Error} If the time option is not a valid RollingTimeOptions
   * @static
   */
  static assert(timeOption) {
    if (
      ![this.Minutely, this.Hourly, this.Daily, this.Weekly, this.Monthly, this.Yearly].includes(
        timeOption
      )
    ) {
      throw new Error(
        `timeOption must be an instance of RollingTimeOptions. Unsupported param ${JSON.stringify(
          timeOption
        )}`
      );
    }
  }
}

module.exports = {
  RollingSizeOptions,
  RollingTimeOptions,
};
