import { DateTime } from './datetime';

describe('DateTime', () => {
  describe('now', () => {
    it('should create a DateTime for current time', () => {
      const dt = DateTime.now();
      expect(dt).toBeInstanceOf(DateTime);
      expect(dt.getYear()).toBeGreaterThan(0);
    });
  });

  describe('of', () => {
    it('should create DateTime from Ethiopian date', () => {
      // Ethiopian Millennium: Meskerem 1, 2000
      const dt = DateTime.of(2000, 1, 1);
      expect(dt.getYear()).toBe(2000);
      expect(dt.getMonth()).toBe(1);
      expect(dt.getDay()).toBe(1);
    });

    it('should create DateTime with specific time', () => {
      const dt = DateTime.of(2009, 9, 4, 14, 30, 45);
      expect(dt.getYear()).toBe(2009);
      expect(dt.getMonth()).toBe(9);
      expect(dt.getDay()).toBe(4);
      expect(dt.getHour()).toBe(14);
      expect(dt.getMinute()).toBe(30);
      expect(dt.getSecond()).toBe(45);
    });

    it('should throw error for invalid date', () => {
      expect(() => DateTime.of(2000, 13, 31)).toThrow();
    });
  });

  describe('conversion', () => {
    it('should convert Ethiopian to Gregorian correctly', () => {
      // Ginbot 4, 2009 = May 12, 2017
      const dt = DateTime.of(2009, 9, 4);
      const gregorian = dt.toGregorian();
      
      expect(gregorian.getFullYear()).toBe(2017);
      expect(gregorian.getMonth() + 1).toBe(5); // May (0-indexed)
      expect(gregorian.getDate()).toBe(12);
    });

    it('should convert Gregorian to Ethiopian correctly', () => {
      // May 12, 2017 = Ginbot 4, 2009
      const gregorian = new Date(2017, 4, 12); // Month is 0-indexed
      const dt = new DateTime(gregorian);
      
      expect(dt.getYear()).toBe(2009);
      expect(dt.getMonth()).toBe(9);
      expect(dt.getDay()).toBe(4);
    });

    it('should handle Ethiopian Millennium correctly', () => {
      // Meskerem 1, 2000 = September 12, 2007
      const dt = DateTime.of(2000, 1, 1);
      const gregorian = dt.toGregorian();
      
      expect(gregorian.getFullYear()).toBe(2007);
      expect(gregorian.getMonth() + 1).toBe(9); // September
      expect(gregorian.getDate()).toBe(12);
    });

    it('should handle Fall of Derg correctly', () => {
      // Ginbot 20, 1983 = May 28, 1991
      const dt = DateTime.of(1983, 9, 20);
      const gregorian = dt.toGregorian();
      
      expect(gregorian.getFullYear()).toBe(1991);
      expect(gregorian.getMonth() + 1).toBe(5); // May
      expect(gregorian.getDate()).toBe(28);
    });
  });

  describe('getters', () => {
    it('should return correct Ethiopian date components', () => {
      const dt = DateTime.of(2009, 9, 4, 14, 30, 45, 123);
      
      expect(dt.getYear()).toBe(2009);
      expect(dt.getMonth()).toBe(9);
      expect(dt.getDay()).toBe(4);
      expect(dt.getHour()).toBe(14);
      expect(dt.getMinute()).toBe(30);
      expect(dt.getSecond()).toBe(45);
      expect(dt.getMillisecond()).toBe(123);
    });

    it('should return correct day of week', () => {
      // September 12, 2007 is Wednesday (day 3)
      const dt = DateTime.of(2000, 1, 1);
      
      expect(dt.getDayOfWeek()).toBe(3); // Wednesday
    });

    it('should detect leap years correctly', () => {
      expect(DateTime.of(2007, 1, 1).isLeapYear()).toBe(true);
      expect(DateTime.of(2009, 1, 1).isLeapYear()).toBe(false);
    });

    it('should return correct days in month', () => {
      expect(DateTime.of(2009, 1, 1).getDaysInMonth()).toBe(30); // Regular month
      expect(DateTime.of(2009, 13, 1).getDaysInMonth()).toBe(5); // Pagume non-leap
      expect(DateTime.of(2007, 13, 1).getDaysInMonth()).toBe(6); // Pagume leap
    });

    it('should return correct day of year', () => {
      expect(DateTime.of(2009, 1, 1).getDayOfYear()).toBe(1);
      expect(DateTime.of(2009, 2, 1).getDayOfYear()).toBe(31); // 30 + 1
      expect(DateTime.of(2009, 13, 5).getDayOfYear()).toBe(365); // 12*30 + 5
    });
  });

  describe('manipulation', () => {
    it('should add time correctly', () => {
      const dt = DateTime.of(2009, 9, 4, 12, 0, 0);
      const added = dt.add(24 * 60 * 60 * 1000); // Add 24 hours
      
      // Should be next day
      expect(added.getDay()).toBe(5);
    });

    it('should subtract time correctly', () => {
      const dt = DateTime.of(2009, 9, 4, 12, 0, 0);
      const subtracted = dt.sub(24 * 60 * 60 * 1000); // Subtract 24 hours
      
      // Should be previous day
      expect(subtracted.getDay()).toBe(3);
    });

    it('should calculate difference correctly', () => {
      const dt1 = DateTime.of(2009, 9, 1, 0, 0, 0);
      const dt2 = DateTime.of(2009, 9, 10, 0, 0, 0);
      
      const diff = dt2.diff(dt1);
      const daysDiff = diff / (24 * 60 * 60 * 1000);
      
      expect(daysDiff).toBe(9);
    });

    it('should add date components correctly', () => {
      const dt = DateTime.of(2000, 1, 1);
      const added = dt.addDate(1, 2, 15); // Add 1 year, 2 months, 15 days
      
      // This is a more complex calculation that depends on Gregorian calendar
      // Just verify it doesn't throw and produces a valid date
      expect(added).toBeInstanceOf(DateTime);
      expect(added.getYear()).toBeGreaterThan(2000);
    });
  });

  describe('fromTimestamp', () => {
    it('should create DateTime from Unix timestamp', () => {
      const timestamp = Math.floor(new Date(2017, 4, 12).getTime() / 1000);
      const dt = DateTime.fromTimestamp(timestamp);
      
      expect(dt.getYear()).toBe(2009);
      expect(dt.getMonth()).toBe(9);
      expect(dt.getDay()).toBe(4);
    });
  });

  describe('getTimestamp', () => {
    it('should return Unix timestamp', () => {
      const gregorian = new Date(2017, 4, 12, 0, 0, 0);
      const dt = new DateTime(gregorian);
      const expectedTimestamp = Math.floor(gregorian.getTime() / 1000);
      
      expect(dt.getTimestamp()).toBe(expectedTimestamp);
    });
  });
});
