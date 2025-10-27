import { DateTime } from './datetime';
import './format'; // Import to apply extensions
import { DATE_ETHIOPIAN, DATE_GEEZ } from './constants';

describe('DateTime formatting', () => {
  describe('format', () => {
    it('should format with year, month, day', () => {
      const dt = DateTime.of(2009, 9, 4);
      const formatted = dt.format('Y-m-d');
      expect(formatted).toBe('2009-09-04');
    });

    it('should format with time', () => {
      const dt = DateTime.of(2009, 9, 4, 14, 30, 45);
      const formatted = dt.format('H:i:s');
      expect(formatted).toBe('14:30:45');
    });

    it('should format with month name in Amharic', () => {
      const dt = DateTime.of(2009, 9, 4);
      const formatted = dt.format('F');
      expect(formatted).toBe('ግንቦት'); // Ginbot
    });

    it('should format with day name in Amharic', () => {
      // May 12, 2017 is Friday
      const gregorian = new Date(2017, 4, 12);
      const dt = new DateTime(gregorian);
      const formatted = dt.format('l');
      expect(formatted).toBe('ዓርብ'); // Friday in Amharic
    });

    it('should format with Geez numbers', () => {
      const dt = DateTime.of(2009, 9, 4);
      const dayFormatted = dt.format('V');
      expect(dayFormatted).toBe('፬'); // 4 in Geez
    });

    it('should format with orthodox day name', () => {
      const dt = DateTime.of(2009, 9, 4);
      const formatted = dt.format('x');
      expect(formatted).not.toBe('');
      expect(formatted.length).toBeGreaterThan(0);
    });

    it('should format with orthodox year name', () => {
      const dt = DateTime.of(2009, 9, 4);
      const formatted = dt.format('X');
      expect(formatted).toBe('ዮሐንስ'); // John (2009-1)%4 = 0
    });

    it('should format with era', () => {
      const dt = DateTime.of(2009, 9, 4);
      const formatted = dt.format('E');
      expect(formatted).toBe('ዓ/ም');
    });

    it('should format with time of day in Amharic', () => {
      const morning = DateTime.of(2009, 9, 4, 8, 0, 0);
      expect(morning.format('A')).toBe('ጡዋት'); // Morning

      const afternoon = DateTime.of(2009, 9, 4, 14, 0, 0);
      expect(afternoon.format('A')).toBe('ከሰዓት'); // Afternoon

      const evening = DateTime.of(2009, 9, 4, 19, 0, 0);
      expect(evening.format('A')).toBe('ምሽት'); // Evening
    });

    it('should format with predefined Ethiopian format', () => {
      const dt = DateTime.of(2009, 9, 4, 14, 30, 45);
      const formatted = dt.format(DATE_ETHIOPIAN);
      
      // Should contain the month name
      expect(formatted).toContain('ግንቦት');
      // Should contain the year
      expect(formatted).toContain('2009');
      // Should contain the day
      expect(formatted).toContain('04');
    });

    it('should format complex Ethiopian date', () => {
      const dt = DateTime.of(2009, 9, 4);
      const formatted = dt.format('l፣ F d ቀን Y ዓ/ም');
      
      expect(formatted).toContain('ግንቦት'); // Month name
      expect(formatted).toContain('04'); // Day
      expect(formatted).toContain('2009'); // Year
      expect(formatted).toContain('ዓ/ም'); // Era
    });
  });

  describe('toString', () => {
    it('should return readable string representation', () => {
      const dt = DateTime.of(2009, 9, 4, 14, 30, 45);
      const str = dt.toString();
      
      expect(str).toContain('ግንቦት'); // Month name
      expect(str).toContain('4'); // Day
      expect(str).toContain('2009'); // Year
      expect(str).toContain('14:30:45'); // Time
    });
  });

  describe('formatRFC3339', () => {
    it('should format in RFC3339 format', () => {
      const dt = DateTime.of(2009, 9, 4, 12, 0, 0);
      const formatted = dt.formatRFC3339();
      
      // Should be ISO format
      expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('formatISO8601', () => {
    it('should format in ISO8601 format', () => {
      const dt = DateTime.of(2009, 9, 4, 12, 0, 0);
      const formatted = dt.formatISO8601();
      
      // Should be ISO format
      expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });
});
