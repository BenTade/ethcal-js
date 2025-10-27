import { DateTime } from '../datetime';

/**
 * Easter calculates Ethiopian Orthodox Easter dates
 */
export class Easter {
  /**
   * Calculates the Easter date for a given Ethiopian year
   * Based on the Computus calculation for Ethiopian Orthodox Easter
   */
  get(year: number): DateTime {
    // Ethiopian Easter calculation
    // The formula is based on the Alexandrian computus

    // Calculate the Golden Number
    const goldenNumber = (year % 19) + 1;

    // Calculate the Epact
    const epact = (11 * goldenNumber) % 30;

    // Calculate the full moon (14th day of the lunar month)
    let fullMoon = 21 + epact;
    if (fullMoon > 50) {
      fullMoon -= 30;
    }

    // Easter is the first Sunday after the full moon
    // that occurs on or after the vernal equinox (March 21 in Gregorian, Megabit 13 in Ethiopian)

    // For Ethiopian calendar, Easter falls in Miyazya (8th month)
    // The calculation gives us the day in Miyazya

    // Simplified calculation for Ethiopian Easter
    // It typically falls between Miyazya 1 and Miyazya 23
    let month = 8; // Miyazya
    let day = ((19 * (year % 19)) + 15) % 30;

    // Adjust the calculation
    if (day === 0) {
      day = 30;
      month = 7; // Megabit
    }

    // Fine-tune based on day of week
    // This is a simplified version; the actual calculation is more complex
    let dt = DateTime.of(year, month, day);

    // Ensure it's a Sunday
    const dayOfWeek = dt.getDayOfWeek();
    if (dayOfWeek !== 7) {
      // 7 is Sunday
      const daysToSunday = (7 - dayOfWeek) % 7;
      dt = dt.addDate(0, 0, daysToSunday);
    }

    return dt;
  }

  /**
   * Returns the Gregorian date of Easter for a given Ethiopian year
   */
  getGregorian(year: number): Date {
    const dt = this.get(year);
    return dt.toGregorian();
  }
}
