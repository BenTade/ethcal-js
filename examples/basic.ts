/**
 * Basic usage examples for ethcal library
 */

import { DateTime, DATE_ETHIOPIAN, Easter, DateValidator } from '../src';

console.log('=== Ethiopian Calendar Library Examples ===\n');

// Example 1: Current date
console.log('1. Current Date:');
const now = DateTime.now();
console.log(`   Current Ethiopian date: ${now.toString()}`);
console.log(`   Formatted: ${now.format('l፣ F d ቀን Y ዓ/ም')}`);
console.log(`   Gregorian: ${now.toGregorian().toDateString()}\n`);

// Example 2: Ethiopian Millennium
console.log('2. Ethiopian Millennium:');
const millennium = DateTime.of(2000, 1, 1);
console.log(`   Meskerem 1, 2000 ET`);
console.log(`   Gregorian: ${millennium.toGregorian().toDateString()}`);
console.log(`   Formatted: ${millennium.format('l፣ F d ቀን Y ዓ/ም')}\n`);

// Example 3: Historical date - Fall of Derg
console.log('3. Historical Date (Fall of Derg):');
const derg = DateTime.of(1983, 9, 20);
console.log(`   Ginbot 20, 1983 ET`);
console.log(`   Gregorian: ${derg.toGregorian().toDateString()}`);
console.log(`   Day of week: ${derg.format('l')}\n`);

// Example 4: Conversion from Gregorian
console.log('4. Gregorian to Ethiopian:');
const gregorian = new Date(2017, 4, 12); // May 12, 2017
const ethiopian = new DateTime(gregorian);
console.log(`   Gregorian: ${gregorian.toDateString()}`);
console.log(`   Ethiopian: ${ethiopian.getMonth()}/${ethiopian.getDay()}/${ethiopian.getYear()}`);
console.log(`   Formatted: ${ethiopian.format('F d, Y')}\n`);

// Example 5: Date manipulation
console.log('5. Date Manipulation:');
const baseDate = DateTime.of(2009, 9, 1);
const tomorrow = baseDate.add(24 * 60 * 60 * 1000);
const nextWeek = baseDate.add(7 * 24 * 60 * 60 * 1000);
console.log(`   Base date: ${baseDate.format('F d, Y')}`);
console.log(`   Tomorrow: ${tomorrow.format('F d, Y')}`);
console.log(`   Next week: ${nextWeek.format('F d, Y')}\n`);

// Example 6: Date formatting
console.log('6. Different Formatting Styles:');
const dt = DateTime.of(2009, 9, 4, 14, 30, 45);
console.log(`   Standard: ${dt.format('Y-m-d H:i:s')}`);
console.log(`   Ethiopian: ${dt.format(DATE_ETHIOPIAN)}`);
console.log(`   Geez: ${dt.format('l፣ F V ቀን K ዓ/ም')}`);
console.log(`   With time: ${dt.format('l፣ F d ቀን H:i A')}\n`);

// Example 7: Leap years
console.log('7. Leap Years:');
const leapYear = DateTime.of(2007, 1, 1);
const nonLeapYear = DateTime.of(2009, 1, 1);
console.log(`   2007 is leap year: ${leapYear.isLeapYear()}`);
console.log(`   2009 is leap year: ${nonLeapYear.isLeapYear()}`);
console.log(`   Pagume 2007 has ${DateTime.of(2007, 13, 1).getDaysInMonth()} days`);
console.log(`   Pagume 2009 has ${DateTime.of(2009, 13, 1).getDaysInMonth()} days\n`);

// Example 8: Date validation
console.log('8. Date Validation:');
const validDate = new DateValidator(15, 6, 2009);
const invalidDate = new DateValidator(31, 1, 2000);
const invalidPagume = new DateValidator(6, 13, 2009);
console.log(`   15/6/2009 is valid: ${validDate.isValid()}`);
console.log(`   31/1/2000 is valid: ${invalidDate.isValid()}`);
console.log(`   6/13/2009 (non-leap) is valid: ${invalidPagume.isValid()}\n`);

// Example 9: Ethiopian Orthodox Easter
console.log('9. Ethiopian Orthodox Easter:');
const easter = new Easter();
const easter2009 = easter.get(2009);
const easter2010 = easter.get(2010);
console.log(`   Easter 2009: ${easter2009.format('l፣ F d ቀን Y ዓ/ም')}`);
console.log(`   Easter 2009 (Gregorian): ${easter.getGregorian(2009).toDateString()}`);
console.log(`   Easter 2010: ${easter2010.format('l፣ F d ቀን Y ዓ/ም')}`);
console.log(`   Easter 2010 (Gregorian): ${easter.getGregorian(2010).toDateString()}\n`);

// Example 10: Duration calculations
console.log('10. Duration Calculations:');
const startDate = DateTime.of(2009, 1, 1);
const endDate = DateTime.of(2009, 13, 5);
const diff = endDate.diff(startDate);
const days = Math.floor(diff / (24 * 60 * 60 * 1000));
console.log(`   From ${startDate.format('F d, Y')} to ${endDate.format('F d, Y')}`);
console.log(`   Duration: ${days} days\n`);

console.log('=== Examples Complete ===');
