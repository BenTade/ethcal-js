import { Easter } from '../holiday';
import { DateTime } from '../datetime';

describe('Easter', () => {
  describe('get', () => {
    it('should calculate Easter date for a given Ethiopian year', () => {
      const easter = new Easter();
      const dt = easter.get(2009);
      
      expect(dt).toBeInstanceOf(DateTime);
      // Easter typically falls in Miyazya (8th month)
      expect(dt.getMonth()).toBeGreaterThanOrEqual(7);
      expect(dt.getMonth()).toBeLessThanOrEqual(8);
      
      // Easter should be a Sunday
      expect(dt.getDayOfWeek()).toBe(7);
    });

    it('should calculate Easter for different years', () => {
      const easter = new Easter();
      
      // Test multiple years
      const years = [2000, 2005, 2009, 2010, 2015];
      
      years.forEach((year) => {
        const dt = easter.get(year);
        expect(dt).toBeInstanceOf(DateTime);
        expect(dt.getYear()).toBe(year);
        expect(dt.getDayOfWeek()).toBe(7); // Should be Sunday
      });
    });
  });

  describe('getGregorian', () => {
    it('should return Gregorian date of Easter', () => {
      const easter = new Easter();
      const gregorian = easter.getGregorian(2009);
      
      expect(gregorian).toBeInstanceOf(Date);
      // Easter should be in spring (March-May in Gregorian)
      expect(gregorian.getMonth() + 1).toBeGreaterThanOrEqual(3);
      expect(gregorian.getMonth() + 1).toBeLessThanOrEqual(5);
    });

    it('should return consistent dates between get and getGregorian', () => {
      const easter = new Easter();
      const ethiopian = easter.get(2009);
      const gregorian = easter.getGregorian(2009);
      
      // Both should represent the same date
      const ethiopianAsGregorian = ethiopian.toGregorian();
      expect(ethiopianAsGregorian.getFullYear()).toBe(gregorian.getFullYear());
      expect(ethiopianAsGregorian.getMonth()).toBe(gregorian.getMonth());
      expect(ethiopianAsGregorian.getDate()).toBe(gregorian.getDate());
    });
  });
});
