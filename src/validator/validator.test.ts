import { DateValidator, LeapYearValidator } from '../validator';
import {
  FIRST_DAY,
  FIRST_MONTH,
  LAST_DAY,
  LAST_MONTH,
  PAGUME_LAST_DAY,
  PAGUME_LEAP_YEAR_LAST_DAY,
} from '../validator';

describe('LeapYearValidator', () => {
  it('should validate leap years correctly', () => {
    // Leap years in Ethiopian calendar: (year + 1) % 4 == 0
    expect(new LeapYearValidator(2003).isValid()).toBe(true); // (2003+1) % 4 = 0
    expect(new LeapYearValidator(2007).isValid()).toBe(true); // (2007+1) % 4 = 0
    expect(new LeapYearValidator(2011).isValid()).toBe(true); // (2011+1) % 4 = 0
  });

  it('should invalidate non-leap years', () => {
    expect(new LeapYearValidator(2000).isValid()).toBe(false);
    expect(new LeapYearValidator(2001).isValid()).toBe(false);
    expect(new LeapYearValidator(2002).isValid()).toBe(false);
    expect(new LeapYearValidator(2009).isValid()).toBe(false);
    expect(new LeapYearValidator(2010).isValid()).toBe(false);
  });

  it('should invalidate negative years', () => {
    expect(new LeapYearValidator(-1).isValid()).toBe(false);
  });
});

describe('DateValidator', () => {
  it('should validate valid dates', () => {
    expect(new DateValidator(1, 1, 2000).isValid()).toBe(true);
    expect(new DateValidator(30, 1, 2000).isValid()).toBe(true);
    expect(new DateValidator(15, 6, 2009).isValid()).toBe(true);
    expect(new DateValidator(4, 9, 2009).isValid()).toBe(true);
  });

  it('should invalidate dates with day out of range', () => {
    expect(new DateValidator(0, 1, 2000).isValid()).toBe(false);
    expect(new DateValidator(31, 1, 2000).isValid()).toBe(false);
    expect(new DateValidator(-1, 1, 2000).isValid()).toBe(false);
  });

  it('should invalidate dates with month out of range', () => {
    expect(new DateValidator(1, 0, 2000).isValid()).toBe(false);
    expect(new DateValidator(1, 14, 2000).isValid()).toBe(false);
    expect(new DateValidator(1, -1, 2000).isValid()).toBe(false);
  });

  it('should validate Pagume (13th month) correctly', () => {
    // Pagume has 5 days in non-leap years
    expect(new DateValidator(5, 13, 2009).isValid()).toBe(true);
    expect(new DateValidator(6, 13, 2009).isValid()).toBe(false);

    // Pagume has 6 days in leap years
    expect(new DateValidator(5, 13, 2007).isValid()).toBe(true);
    expect(new DateValidator(6, 13, 2007).isValid()).toBe(true);
  });

  it('should invalidate invalid Pagume dates', () => {
    expect(new DateValidator(7, 13, 2007).isValid()).toBe(false);
    expect(new DateValidator(7, 13, 2009).isValid()).toBe(false);
  });

  it('should invalidate non-integer values', () => {
    expect(new DateValidator(1.5, 1, 2000).isValid()).toBe(false);
    expect(new DateValidator(1, 1.5, 2000).isValid()).toBe(false);
    expect(new DateValidator(1, 1, 2000.5).isValid()).toBe(false);
  });
});
