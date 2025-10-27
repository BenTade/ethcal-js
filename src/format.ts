import { DateTime } from './datetime';
import {
  MONTH_NAMES,
  DAY_NAMES,
  ORTHODOX_DAY_NAMES,
  ORTHODOX_YEAR_NAMES,
  GEEZ_NUMBERS,
  TIME_OF_DAY_NAMES,
  ERA_AM,
} from './constants';

/**
 * Format extensions for DateTime
 */
export class DateTimeFormatter {
  private dt: DateTime;

  constructor(dt: DateTime) {
    this.dt = dt;
  }

  /**
   * Formats the DateTime according to the given format string
   * Supports standard formats plus Ethiopian-specific formats:
   * x - Orthodox day name
   * X - Orthodox year name
   * E - Era (ዓ/ም or ዓ/ዓ)
   * K - Year in Geez numbers
   * V - Day in Geez numbers
   * F - Month name in Amharic
   * l - Day name in Amharic
   * Y - Year (4 digits)
   * m - Month (2 digits)
   * d - Day (2 digits)
   * H - Hour (24-hour, 2 digits)
   * i - Minute (2 digits)
   * s - Second (2 digits)
   * A - Time of day in Amharic
   * T - Timezone
   */
  format(format: string): string {
    let result = format;

    const replacements: Record<string, string> = {
      x: this.getOrthodoxDayName(),
      X: this.getOrthodoxYearName(),
      E: ERA_AM,
      K: this.getYearInGeez(),
      V: this.getDayInGeez(),
      F: this.getMonthName(),
      l: this.getDayName(),
      Y: this.dt.getYear().toString(),
      m: this.dt.getMonth().toString().padStart(2, '0'),
      d: this.dt.getDay().toString().padStart(2, '0'),
      H: this.dt.getHour().toString().padStart(2, '0'),
      i: this.dt.getMinute().toString().padStart(2, '0'),
      s: this.dt.getSecond().toString().padStart(2, '0'),
      A: this.getTimeOfDay(),
      T: this.getTimezone(),
    };

    // Replace format characters with placeholders first to avoid conflicts
    for (const key in replacements) {
      const placeholder = `{{${key}}}`;
      result = result.split(key).join(placeholder);
    }

    // Then replace placeholders with actual values
    for (const key in replacements) {
      const placeholder = `{{${key}}}`;
      result = result.split(placeholder).join(replacements[key]);
    }

    return result;
  }

  /**
   * Returns the Amharic name of the month
   */
  private getMonthName(): string {
    const month = this.dt.getMonth();
    if (month >= 1 && month <= 13) {
      return MONTH_NAMES[month];
    }
    return '';
  }

  /**
   * Returns the Amharic name of the day
   */
  private getDayName(): string {
    const dayOfWeek = this.dt.getDayOfWeek();
    if (dayOfWeek >= 1 && dayOfWeek <= 7) {
      return DAY_NAMES[dayOfWeek];
    }
    return '';
  }

  /**
   * Returns the Orthodox saint day name
   */
  private getOrthodoxDayName(): string {
    const day = this.dt.getDay();
    if (day >= 1 && day <= 30) {
      return ORTHODOX_DAY_NAMES[day];
    }
    return '';
  }

  /**
   * Returns the Orthodox year name (Evangelist)
   */
  private getOrthodoxYearName(): string {
    const index = (this.dt.getYear() - 1) % 4;
    if (index >= 0 && index < ORTHODOX_YEAR_NAMES.length) {
      return ORTHODOX_YEAR_NAMES[index];
    }
    return '';
  }

  /**
   * Returns the year in Geez numbers
   */
  private getYearInGeez(): string {
    return numberToGeez(this.dt.getYear());
  }

  /**
   * Returns the day in Geez numbers
   */
  private getDayInGeez(): string {
    const day = this.dt.getDay();
    if (day >= 1 && day <= 30) {
      return GEEZ_NUMBERS[day];
    }
    return numberToGeez(day);
  }

  /**
   * Returns the Amharic time of day
   */
  private getTimeOfDay(): string {
    const hour = this.dt.getHour();
    if (hour === 0) return TIME_OF_DAY_NAMES.midnight;
    if (hour < 6) return TIME_OF_DAY_NAMES.night;
    if (hour < 12) return TIME_OF_DAY_NAMES.morning;
    if (hour === 12) return TIME_OF_DAY_NAMES.noon;
    if (hour < 17) return TIME_OF_DAY_NAMES.afternoon;
    if (hour < 20) return TIME_OF_DAY_NAMES.evening;
    return TIME_OF_DAY_NAMES.night;
  }

  /**
   * Returns the timezone abbreviation
   */
  private getTimezone(): string {
    const date = this.dt.toGregorian();
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    return `GMT${sign}${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}`;
  }

  /**
   * Formats the DateTime in RFC3339 format (Gregorian)
   */
  formatRFC3339(): string {
    return this.dt.toGregorian().toISOString();
  }

  /**
   * Formats the DateTime in ISO8601 format (Gregorian)
   */
  formatISO8601(): string {
    return this.dt.toGregorian().toISOString();
  }

  /**
   * Returns a string representation of the DateTime
   */
  toString(): string {
    return `${this.getMonthName()} ${this.dt.getDay()}, ${this.dt.getYear()} ${this.dt
      .getHour()
      .toString()
      .padStart(2, '0')}:${this.dt.getMinute().toString().padStart(2, '0')}:${this.dt
      .getSecond()
      .toString()
      .padStart(2, '0')}`;
  }
}

/**
 * Converts a number to Geez representation
 */
function numberToGeez(n: number): string {
  if (n >= 1 && n < GEEZ_NUMBERS.length) {
    return GEEZ_NUMBERS[n];
  }

  // For larger numbers, build the representation
  const geez = [' ', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'];
  const tens = [' ', '፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺'];

  let result = '';
  let num = n;

  // Handle thousands
  if (num >= 1000) {
    const thousands = Math.floor(num / 1000);
    if (thousands === 1) {
      result += '፲፻';
    } else if (thousands < 10) {
      result += geez[thousands] + '፲፻';
    } else {
      // Recursively handle larger thousands
      result += numberToGeez(thousands) + '፻';
    }
    num %= 1000;
  }

  // Handle hundreds
  if (num >= 100) {
    const hundredsDigit = Math.floor(num / 100);
    if (hundredsDigit === 1) {
      result += '፻';
    } else if (hundredsDigit < 10) {
      result += geez[hundredsDigit] + '፻';
    }
    num %= 100;
  }

  // Handle tens
  if (num >= 10) {
    const tensDigit = Math.floor(num / 10);
    if (tensDigit < tens.length) {
      result += tens[tensDigit];
    }
    num %= 10;
  }

  // Handle ones
  if (num > 0 && num < geez.length) {
    result += geez[num];
  }

  return result;
}

/**
 * Extension methods for DateTime
 */
export function extendDateTime() {
  // Add format method to DateTime prototype
  (DateTime.prototype as any).format = function (format: string): string {
    const formatter = new DateTimeFormatter(this);
    return formatter.format(format);
  };

  (DateTime.prototype as any).formatRFC3339 = function (): string {
    const formatter = new DateTimeFormatter(this);
    return formatter.formatRFC3339();
  };

  (DateTime.prototype as any).formatISO8601 = function (): string {
    const formatter = new DateTimeFormatter(this);
    return formatter.formatISO8601();
  };

  (DateTime.prototype as any).toString = function (): string {
    const formatter = new DateTimeFormatter(this);
    return formatter.toString();
  };
}

// Extend DateTime with format methods
extendDateTime();
