import { ToJdnConverter, FromJdnConverter } from './converter';
import { LeapYearValidator } from './validator';

/**
 * Gregorian date representation
 */
interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

/**
 * DateTime represents an Ethiopian calendar date with time
 */
export class DateTime {
  private gregorianTime: Date;
  private year: number;
  private month: number;
  private day: number;
  private leapYear: boolean;
  private dayOfYear: number;
  private daysInMonth: number;

  /**
   * Creates a new DateTime from a JavaScript Date object
   */
  constructor(date: Date) {
    this.gregorianTime = new Date(date);
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.leapYear = false;
    this.dayOfYear = 0;
    this.daysInMonth = 0;
    this.updateComputedFields();
  }

  /**
   * Creates a DateTime representing the current time
   */
  static now(): DateTime {
    return new DateTime(new Date());
  }

  /**
   * Creates a DateTime from Ethiopian date components
   */
  static of(
    year: number,
    month: number,
    day: number,
    hour: number = 0,
    minute: number = 0,
    second: number = 0,
    millisecond: number = 0
  ): DateTime {
    // Convert Ethiopian date to JDN
    const converter = new ToJdnConverter(day, month, year);
    const jdn = converter.getJdn();

    // Convert JDN to Gregorian
    const gregorian = DateTime.jdnToGregorian(jdn);

    // Create date with the specified time components
    const date = new Date(
      gregorian.year,
      gregorian.month - 1,
      gregorian.day,
      hour,
      minute,
      second,
      millisecond
    );

    return new DateTime(date);
  }

  /**
   * Creates a DateTime from a Unix timestamp
   */
  static fromTimestamp(timestamp: number): DateTime {
    return new DateTime(new Date(timestamp * 1000));
  }

  /**
   * Creates a DateTime from a FromJdnConverter
   */
  static fromConverter(converter: FromJdnConverter): DateTime {
    return DateTime.of(converter.getYear(), converter.getMonth(), converter.getDay());
  }

  /**
   * Updates the Ethiopian date fields from the Gregorian time
   */
  private updateComputedFields(): void {
    // Convert Gregorian to JDN
    const jdn = DateTime.gregorianToJdn(
      this.gregorianTime.getFullYear(),
      this.gregorianTime.getMonth() + 1,
      this.gregorianTime.getDate()
    );

    // Convert JDN to Ethiopian
    const converter = new FromJdnConverter(jdn);
    this.year = converter.getYear();
    this.month = converter.getMonth();
    this.day = converter.getDay();

    // Calculate other fields
    this.leapYear = new LeapYearValidator(this.year).isValid();
    this.dayOfYear = (this.month - 1) * 30 + this.day;

    if (this.month === 13) {
      this.daysInMonth = this.leapYear ? 6 : 5;
    } else {
      this.daysInMonth = 30;
    }
  }

  /**
   * Converts JDN to Gregorian date
   */
  private static jdnToGregorian(jdn: number): GregorianDate {
    const a = jdn + 32044;
    const b = Math.floor((4 * a + 3) / 146097);
    const c = a - Math.floor((146097 * b) / 4);

    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);

    const day = e - Math.floor((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = 100 * b + d - 4800 + Math.floor(m / 10);

    return { year, month, day };
  }

  /**
   * Converts Gregorian date to JDN
   */
  private static gregorianToJdn(year: number, month: number, day: number): number {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;

    return (
      day +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045
    );
  }

  // Getters

  /**
   * Returns the Ethiopian year
   */
  getYear(): number {
    return this.year;
  }

  /**
   * Returns the Ethiopian month
   */
  getMonth(): number {
    return this.month;
  }

  /**
   * Returns the Ethiopian day
   */
  getDay(): number {
    return this.day;
  }

  /**
   * Returns true if the year is a leap year
   */
  isLeapYear(): boolean {
    return this.leapYear;
  }

  /**
   * Returns the day of the year
   */
  getDayOfYear(): number {
    return this.dayOfYear;
  }

  /**
   * Returns the number of days in the month
   */
  getDaysInMonth(): number {
    return this.daysInMonth;
  }

  /**
   * Returns the hour
   */
  getHour(): number {
    return this.gregorianTime.getHours();
  }

  /**
   * Returns the minute
   */
  getMinute(): number {
    return this.gregorianTime.getMinutes();
  }

  /**
   * Returns the second
   */
  getSecond(): number {
    return this.gregorianTime.getSeconds();
  }

  /**
   * Returns the millisecond
   */
  getMillisecond(): number {
    return this.gregorianTime.getMilliseconds();
  }

  /**
   * Returns the day of the week (1 for Monday, 7 for Sunday)
   */
  getDayOfWeek(): number {
    const weekday = this.gregorianTime.getDay();
    return weekday === 0 ? 7 : weekday;
  }

  /**
   * Returns the Unix timestamp
   */
  getTimestamp(): number {
    return Math.floor(this.gregorianTime.getTime() / 1000);
  }

  /**
   * Returns a copy of the underlying JavaScript Date object
   */
  toGregorian(): Date {
    return new Date(this.gregorianTime);
  }

  // Manipulation methods

  /**
   * Adds milliseconds to the DateTime
   */
  add(milliseconds: number): DateTime {
    const newTime = new Date(this.gregorianTime.getTime() + milliseconds);
    return new DateTime(newTime);
  }

  /**
   * Subtracts milliseconds from the DateTime
   */
  sub(milliseconds: number): DateTime {
    const newTime = new Date(this.gregorianTime.getTime() - milliseconds);
    return new DateTime(newTime);
  }

  /**
   * Adds years, months, and days to the DateTime
   */
  addDate(years: number, months: number, days: number): DateTime {
    const newDate = new Date(this.gregorianTime);
    newDate.setFullYear(newDate.getFullYear() + years);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setDate(newDate.getDate() + days);
    return new DateTime(newDate);
  }

  /**
   * Returns the difference in milliseconds between two DateTimes
   */
  diff(other: DateTime): number {
    return this.gregorianTime.getTime() - other.gregorianTime.getTime();
  }
}
