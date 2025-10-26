import { DateValidator } from '../validator';

/**
 * ToJdnConverter converts Ethiopian dates to Julian Day Number (JDN)
 */
export class ToJdnConverter {
  private day: number;
  private month: number;
  private year: number;
  private jdn!: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.set(day, month, year);
  }

  /**
   * Sets the date for processing
   */
  private set(day: number, month: number, year: number): void {
    const validator = new DateValidator(day, month, year);
    if (!validator.isValid()) {
      throw new Error('Invalid Ethiopian date');
    }

    this.day = day;
    this.month = month;
    this.year = year;
    this.jdn = this.process(day, month, year);
  }

  /**
   * Calculates the JDN from Ethiopian date
   */
  private process(day: number, month: number, year: number): number {
    return 1723856 + 365 + 365 * (year - 1) + Math.floor(year / 4) + 30 * month + day - 31;
  }

  /**
   * Returns the Julian Day Number
   */
  getJdn(): number {
    return this.jdn;
  }

  /**
   * Returns the day
   */
  getDay(): number {
    return this.day;
  }

  /**
   * Returns the month
   */
  getMonth(): number {
    return this.month;
  }

  /**
   * Returns the year
   */
  getYear(): number {
    return this.year;
  }
}

/**
 * FromJdnConverter converts Julian Day Number (JDN) to Ethiopian date
 */
export class FromJdnConverter {
  private day: number;
  private month: number;
  private year: number;
  private jdn: number;

  constructor(jdn: number) {
    this.jdn = jdn;
    this.day = 0;
    this.month = 0;
    this.year = 0;
    this.set(jdn);
  }

  /**
   * Sets the JDN for processing
   */
  private set(jdn: number): void {
    if (!this.isValidInteger(jdn)) {
      throw new Error('Invalid JDN');
    }

    this.jdn = jdn;
    const result = this.process(jdn);
    this.day = result.day;
    this.month = result.month;
    this.year = result.year;
  }

  /**
   * Converts JDN to Ethiopian date
   */
  private process(jdn: number): { day: number; month: number; year: number } {
    const r = (jdn - 1723856) % 1461;
    const n = (r % 365) + 365 * Math.floor(r / 1460);

    const year = 4 * Math.floor((jdn - 1723856) / 1461) + Math.floor(r / 365) - Math.floor(r / 1460);
    const month = Math.floor(n / 30) + 1;
    const day = (n % 30) + 1;

    return { day, month, year };
  }

  /**
   * Checks if the value is a valid integer (not negative in this context)
   */
  private isValidInteger(...values: number[]): boolean {
    return values.every((v) => Number.isInteger(v) && v >= 0);
  }

  /**
   * Returns the Julian Day Number
   */
  getJdn(): number {
    return this.jdn;
  }

  /**
   * Returns the day
   */
  getDay(): number {
    return this.day;
  }

  /**
   * Returns the month
   */
  getMonth(): number {
    return this.month;
  }

  /**
   * Returns the year
   */
  getYear(): number {
    return this.year;
  }
}
