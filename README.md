# ethcal

[![npm version](https://badge.fury.io/js/ethcal.svg)](https://www.npmjs.com/package/ethcal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![From Ethiopia](https://img.shields.io/badge/From-Ethiopia-brightgreen.svg)

> A comprehensive TypeScript/JavaScript library for working with the Ethiopian calendar (ዘመን አቆጣጠር).

**ethcal** is a JavaScript/TypeScript port of the [ethcal-go](https://github.com/BenTade/ethcal-go) library, based on the [andegna/calender](https://github.com/andegna/calender) PHP package. It provides functionality for converting between Gregorian and Ethiopian calendars, date manipulation, formatting, and holiday calculations.

## Features

- ✅ **Calendar Conversion**: Seamlessly convert between Gregorian and Ethiopian calendars
- ✅ **Date Validation**: Validate Ethiopian dates including leap year handling
- ✅ **Date Manipulation**: Add, subtract, and compare dates
- ✅ **Formatting**: Format dates in Amharic with multiple format options
- ✅ **Holiday Calculations**: Calculate Ethiopian Orthodox holidays (Easter)
- ✅ **Julian Day Number (JDN) Support**: Low-level conversion via JDN
- ✅ **TypeScript Support**: Full TypeScript definitions included
- ✅ **Comprehensive Testing**: Well-tested with extensive test coverage

## Installation

```bash
npm install ethcal
```

Or with yarn:

```bash
yarn add ethcal
```

## Quick Start

```typescript
import { DateTime, DATE_ETHIOPIAN } from 'ethcal';

// Get current Ethiopian date
const now = DateTime.now();
console.log(now.toString());

// Create Ethiopian date
const dt = DateTime.of(2000, 1, 1); // Meskerem 1, 2000 (Ethiopian Millennium)
console.log(`Ethiopian Millennium: ${dt.toString()}`);

// Convert to Gregorian
const gregorian = dt.toGregorian();
console.log(`Gregorian: ${gregorian.toDateString()}`);

// Format in Amharic
const formatted = dt.format('l፣ F d ቀን Y ዓ/ም');
console.log(`Formatted: ${formatted}`);
```

## Table of Contents

- [Basic Usage](#basic-usage)
- [Creating DateTime](#creating-datetime)
- [Conversion](#conversion)
- [Date Manipulation](#date-manipulation)
- [Formatting](#formatting)
- [Validation](#validation)
- [Low-level Conversion (JDN)](#low-level-conversion-jdn)
- [Holidays](#holidays)
- [API Documentation](#api-documentation)

## Basic Usage

### Creating DateTime

**From current time:**

```typescript
import { DateTime } from 'ethcal';

// Current time in Ethiopian calendar
const now = DateTime.now();
```

**From Ethiopian date:**

```typescript
// Create Ethiopian date: Meskerem 1, 2000 (Ethiopian Millennium)
const dt = DateTime.of(2000, 1, 1);

// With specific time
const dtWithTime = DateTime.of(2009, 9, 4, 14, 30, 0);
```

**From Gregorian Date:**

```typescript
const gregorian = new Date(2017, 4, 12); // May 12, 2017
const ethiopian = new DateTime(gregorian);
console.log(`Year: ${ethiopian.getYear()}, Month: ${ethiopian.getMonth()}, Day: ${ethiopian.getDay()}`);
// Output: Year: 2009, Month: 9, Day: 4
```

**From Unix timestamp:**

```typescript
const timestamp = Math.floor(Date.now() / 1000);
const dt = DateTime.fromTimestamp(timestamp);
```

## Conversion

### Ethiopian to Gregorian

```typescript
const ethiopian = DateTime.of(2009, 9, 4, 12, 0, 0);
const gregorian = ethiopian.toGregorian();
console.log(gregorian.toDateString());
// Output: Fri May 12 2017
```

### Gregorian to Ethiopian

```typescript
const gregorian = new Date(2017, 4, 12); // May 12, 2017
const ethiopian = new DateTime(gregorian);
console.log(`${ethiopian.getMonth()}/${ethiopian.getDay()}/${ethiopian.getYear()}`);
// Output: 9/4/2009
```

## Date Manipulation

### Adding and Subtracting

```typescript
const dt = DateTime.of(2000, 1, 1, 12, 0, 0);

// Add duration (in milliseconds)
const tomorrow = dt.add(24 * 60 * 60 * 1000);

// Subtract duration
const yesterday = dt.sub(24 * 60 * 60 * 1000);

// Add years, months, days
const future = dt.addDate(1, 2, 15); // Add 1 year, 2 months, 15 days
```

### Calculating Differences

```typescript
const dt1 = DateTime.of(2000, 1, 1);
const dt2 = DateTime.of(2000, 1, 10);

const diff = dt2.diff(dt1);
const daysDiff = diff / (24 * 60 * 60 * 1000);
console.log(`Difference: ${daysDiff} days`);
// Output: Difference: 9 days
```

## Formatting

The library supports custom date formatting with both standard and Ethiopian-specific format characters.

### Format Characters

| Character | Description | Example |
|-----------|-------------|---------|
| `Y` | Year (4 digits) | 2009 |
| `m` | Month (2 digits) | 09 |
| `d` | Day (2 digits) | 04 |
| `H` | Hour (24-hour, 2 digits) | 14 |
| `i` | Minute (2 digits) | 30 |
| `s` | Second (2 digits) | 45 |
| `F` | Month name in Amharic | ግንቦት |
| `l` | Day name in Amharic | ዓርብ |
| `x` | Orthodox day name | ዮሐንስ |
| `X` | Orthodox year name | ማርቆስ |
| `K` | Year in Geez numbers | ፳፻፱ |
| `V` | Day in Geez numbers | ፬ |
| `E` | Era (ዓ/ም or ዓ/ዓ) | ዓ/ም |
| `A` | Time of day in Amharic | ጡዋት |
| `T` | Timezone | GMT+0300 |

### Format Examples

```typescript
const dt = DateTime.of(2009, 9, 4, 14, 30, 45);

// Ethiopian format
console.log(dt.format('l፣ F d ቀን Y ዓ/ም'));
// Output: ዓርብ፣ ግንቦት 04 ቀን 2009 ዓ/ም

// Geez numbers
console.log(dt.format('l፣ F V ቀን K ዓ/ም'));
// Output: ዓርብ፣ ግንቦት ፬ ቀን ፳፻፱ ዓ/ም

// With orthodox names
console.log(dt.format('l፣ F d ቀን (x) Y (X) ዓ/ም'));
// Output: ዓርብ፣ ግንቦት 04 ቀን (ሩፋኤል) 2009 (ዮሐንስ) ዓ/ም

// Custom format
console.log(dt.format('Y-m-d H:i:s'));
// Output: 2009-09-04 14:30:45
```

### Predefined Constants

```typescript
import { DATE_ETHIOPIAN, DATE_ETHIOPIAN_ORTHODOX, DATE_GEEZ, DATE_GEEZ_ORTHODOX } from 'ethcal';

console.log(dt.format(DATE_ETHIOPIAN));
console.log(dt.format(DATE_ETHIOPIAN_ORTHODOX));
console.log(dt.format(DATE_GEEZ));
console.log(dt.format(DATE_GEEZ_ORTHODOX));
```

## Validation

### Validate Ethiopian Dates

```typescript
import { DateValidator } from 'ethcal';

// Validate a date
const v = new DateValidator(4, 9, 2009);
if (v.isValid()) {
  console.log('Valid Ethiopian date');
}

// Invalid date
const invalid = new DateValidator(31, 1, 2000);
if (!invalid.isValid()) {
  console.log('Invalid day: Ethiopian months have max 30 days');
}

// 13th month (Pagume) validation
const pagume = new DateValidator(6, 13, 2007); // Leap year
if (pagume.isValid()) {
  console.log('Valid: 6th day of Pagume in leap year');
}

const pagume2 = new DateValidator(6, 13, 2009); // Non-leap year
if (!pagume2.isValid()) {
  console.log('Invalid: 6th day only valid in leap years');
}
```

### Leap Year Validation

```typescript
import { LeapYearValidator } from 'ethcal';

const v = new LeapYearValidator(2007);
if (v.isValid()) {
  console.log('2007 is a leap year');
}
// In Ethiopian calendar: (year + 1) % 4 == 0
```

## Low-level Conversion (JDN)

For advanced use cases, you can work directly with Julian Day Numbers (JDN):

### Ethiopian to JDN

```typescript
import { ToJdnConverter } from 'ethcal';

const conv = new ToJdnConverter(4, 9, 2009);
const jdn = conv.getJdn();
console.log(`JDN: ${jdn}`);
```

### JDN to Ethiopian

```typescript
import { FromJdnConverter } from 'ethcal';

const conv = new FromJdnConverter(2457886);
console.log(`Ethiopian: ${conv.getDay()}/${conv.getMonth()}/${conv.getYear()}`);
```

## Holidays

### Ethiopian Orthodox Easter

```typescript
import { Easter } from 'ethcal';

const easter = new Easter();

// Get Easter date for Ethiopian year 2009
const dt = easter.get(2009);
console.log(`Easter 2009: ${dt.format('l፣ F d ቀን Y ዓ/ም')}`);

// Get Gregorian date of Easter
const gregorian = easter.getGregorian(2009);
console.log(`Easter (Gregorian): ${gregorian.toDateString()}`);
```

## API Documentation

### DateTime Methods

```typescript
// Getters
getYear(): number           // Ethiopian year
getMonth(): number          // Ethiopian month (1-13)
getDay(): number            // Ethiopian day (1-30)
getHour(): number           // Hour (0-23)
getMinute(): number         // Minute (0-59)
getSecond(): number         // Second (0-59)
getMillisecond(): number    // Millisecond
getDayOfWeek(): number      // Day of week (1=Monday, 7=Sunday)
getDayOfYear(): number      // Day of year (1-366)
getDaysInMonth(): number    // Days in current month
getTimestamp(): number      // Unix timestamp
isLeapYear(): boolean       // Check if leap year

// Conversion
toGregorian(): Date         // Convert to Gregorian Date

// Manipulation
add(milliseconds: number): DateTime              // Add duration
sub(milliseconds: number): DateTime              // Subtract duration
addDate(years, months, days: number): DateTime   // Add years, months, days
diff(other: DateTime): number                    // Calculate difference in ms

// Formatting
format(format: string): string          // Format with custom format
formatRFC3339(): string                // RFC3339 format (Gregorian)
formatISO8601(): string                // ISO8601 format (Gregorian)
toString(): string                     // String representation
```

## Month Names

The Ethiopian calendar has 13 months:

1. መስከረም (Meskerem) - 30 days
2. ጥቅምት (Tikimt) - 30 days
3. ኅዳር (Hidar) - 30 days
4. ታኅሣሥ (Tahsas) - 30 days
5. ጥር (Tir) - 30 days
6. የካቲት (Yekatit) - 30 days
7. መጋቢት (Megabit) - 30 days
8. ሚያዝያ (Miyazya) - 30 days
9. ግንቦት (Ginbot) - 30 days
10. ሰኔ (Sene) - 30 days
11. ሐምሌ (Hamle) - 30 days
12. ነሐሴ (Nehase) - 30 days
13. ጳጉሜን (Pagume) - 5 or 6 days (6 in leap years)

## Leap Years

In the Ethiopian calendar, a year is a leap year if `(year + 1) % 4 == 0`.

Examples:
- 2003, 2007, 2011 are leap years
- 2000, 2001, 2002, 2009, 2010 are not leap years

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Building

Build the library:

```bash
npm run build
```

This will generate the compiled JavaScript and TypeScript declaration files in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Based on the [ethcal-go](https://github.com/BenTade/ethcal-go) Go implementation
- Original PHP implementation: [andegna/calender](https://github.com/andegna/calender)
- Ethiopian calendar conversion algorithms from [ethiopic.org](http://ethiopic.org/)
- Test cases from [ICU4J](https://github.com/unicode-org/icu/tree/main/icu4j)

## Related Projects

- [ethcal-go](https://github.com/BenTade/ethcal-go) - Go implementation
- [andegna/calender](https://github.com/andegna/calender) - Original PHP implementation

---

Made with ❤️ from Ethiopia 🇪🇹
