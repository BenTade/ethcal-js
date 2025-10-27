/**
 * Validator constants
 */
export const FIRST_DAY = 1;
export const FIRST_MONTH = FIRST_DAY;
export const LAST_DAY = 30;
export const LAST_MONTH = 13;
export const PAGUME_LAST_DAY = 5;
export const PAGUME_LEAP_YEAR_LAST_DAY = 6;

/**
 * LeapYearValidator validates Ethiopian leap years
 */
export class LeapYearValidator {
  private year: number;

  constructor(year: number) {
    this.year = year;
  }

  /**
   * Checks if the year is valid and is a leap year
   */
  isValid(): boolean {
    return this.isValidInteger(this.year) && this.isLeapYear();
  }

  /**
   * Checks if the year is a leap year in the Ethiopian calendar
   * In Ethiopian calendar, a year is a leap year if (year + 1) % 4 == 0
   */
  private isLeapYear(): boolean {
    return (this.year + 1) % 4 === 0;
  }

  /**
   * Checks if values are valid integers (non-negative)
   */
  private isValidInteger(...values: number[]): boolean {
    return values.every((v) => Number.isInteger(v) && v >= 0);
  }
}

/**
 * DateValidator validates Ethiopian dates
 */
export class DateValidator {
  private day: number;
  private month: number;
  private year: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  /**
   * Validates the Ethiopian date
   */
  isValid(): boolean {
    const validators = [
      () => this.isDateValuesIntegers(),
      () => this.isValidDayRange(),
      () => this.isValidMonthRange(),
      () => this.isValidPagumeDayRange(),
      () => this.isValidLeapDay(),
    ];

    return validators.every((validator) => validator());
  }

  /**
   * Checks if day is in valid range
   */
  private isValidDayRange(): boolean {
    return this.day >= FIRST_DAY && this.day <= LAST_DAY;
  }

  /**
   * Checks if month is in valid range
   */
  private isValidMonthRange(): boolean {
    return this.month >= FIRST_MONTH && this.month <= LAST_MONTH;
  }

  /**
   * Checks if day is valid for Pagume (13th month)
   */
  private isValidPagumeDayRange(): boolean {
    if (this.month === LAST_MONTH) {
      return this.day <= PAGUME_LEAP_YEAR_LAST_DAY;
    }
    return true;
  }

  /**
   * Checks if the 6th day of Pagume is valid (only in leap years)
   */
  private isValidLeapDay(): boolean {
    if (this.month === LAST_MONTH && this.day === PAGUME_LEAP_YEAR_LAST_DAY) {
      return new LeapYearValidator(this.year).isValid();
    }
    return true;
  }

  /**
   * Checks if all date values are valid integers
   */
  private isDateValuesIntegers(): boolean {
    return (
      Number.isInteger(this.day) &&
      Number.isInteger(this.month) &&
      Number.isInteger(this.year) &&
      this.day >= 0 &&
      this.month >= 0 &&
      this.year >= 0
    );
  }
}
