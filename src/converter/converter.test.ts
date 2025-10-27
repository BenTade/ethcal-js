import { ToJdnConverter, FromJdnConverter } from '../converter';

describe('ToJdnConverter', () => {
  it('should convert Ethiopian date to JDN', () => {
    // Test cases from ICU4J
    const conv1 = new ToJdnConverter(20, 2, 1855);
    expect(conv1.getJdn()).toBe(2401443);

    const conv2 = new ToJdnConverter(5, 13, 2000);
    expect(conv2.getJdn()).toBe(2454720);

    const conv3 = new ToJdnConverter(23, 4, 1997);
    expect(conv3.getJdn()).toBe(2453372);
  });

  it('should convert Ethiopian year 0 correctly', () => {
    const conv = new ToJdnConverter(1, 1, 0);
    expect(conv.getJdn()).toBe(1723856);
  });

  it('should throw error for invalid date', () => {
    expect(() => new ToJdnConverter(31, 1, 2000)).toThrow('Invalid Ethiopian date');
    expect(() => new ToJdnConverter(6, 13, 2000)).toThrow('Invalid Ethiopian date'); // Non-leap year
  });

  it('should handle Pagume correctly', () => {
    // Valid Pagume dates
    expect(() => new ToJdnConverter(5, 13, 2000)).not.toThrow();
    expect(() => new ToJdnConverter(6, 13, 2003)).not.toThrow(); // 2003 is leap year
  });
});

describe('FromJdnConverter', () => {
  it('should convert JDN to Ethiopian date', () => {
    // Test cases from ICU4J
    const conv1 = new FromJdnConverter(2401443);
    expect(conv1.getDay()).toBe(20);
    expect(conv1.getMonth()).toBe(2);
    expect(conv1.getYear()).toBe(1855);

    const conv2 = new FromJdnConverter(2454720);
    expect(conv2.getDay()).toBe(5);
    expect(conv2.getMonth()).toBe(13);
    expect(conv2.getYear()).toBe(2000);

    const conv3 = new FromJdnConverter(2453372);
    expect(conv3.getDay()).toBe(23);
    expect(conv3.getMonth()).toBe(4);
    expect(conv3.getYear()).toBe(1997);
  });

  it('should convert Ethiopian year 0 correctly', () => {
    const conv = new FromJdnConverter(1723856);
    expect(conv.getDay()).toBe(1);
    expect(conv.getMonth()).toBe(1);
    expect(conv.getYear()).toBe(0);
  });

  it('should throw error for invalid JDN', () => {
    expect(() => new FromJdnConverter(-1)).toThrow('Invalid JDN');
  });

  it('should round-trip conversion', () => {
    // Test round-trip conversion
    const testCases = [
      { day: 1, month: 1, year: 2000 },
      { day: 15, month: 6, year: 1995 },
      { day: 22, month: 4, year: 1997 },
    ];

    testCases.forEach(({ day, month, year }) => {
      const toJdn = new ToJdnConverter(day, month, year);
      const fromJdn = new FromJdnConverter(toJdn.getJdn());

      expect(fromJdn.getDay()).toBe(day);
      expect(fromJdn.getMonth()).toBe(month);
      expect(fromJdn.getYear()).toBe(year);
    });
  });
});
