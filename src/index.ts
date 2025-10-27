// Import format extension to ensure DateTime has format methods
import './format';

// Core classes
export { DateTime } from './datetime';
export { DateTimeFormatter } from './format';

// Validator
export { DateValidator, LeapYearValidator } from './validator';

// Converter
export { ToJdnConverter, FromJdnConverter } from './converter';

// Holiday
export { Easter } from './holiday';

// Constants
export {
  MONTH_NAMES,
  DAY_NAMES,
  DAY_NAMES_LONG,
  ORTHODOX_DAY_NAMES,
  ORTHODOX_YEAR_NAMES,
  GEEZ_NUMBERS,
  TIME_OF_DAY_NAMES,
  ERA_AM,
  ERA_BC,
  DATE_ETHIOPIAN,
  DATE_ETHIOPIAN_ORTHODOX,
  DATE_GEEZ,
  DATE_GEEZ_ORTHODOX,
} from './constants';

// Extend DateTime interface with format methods
declare module './datetime' {
  interface DateTime {
    format(format: string): string;
    formatRFC3339(): string;
    formatISO8601(): string;
    toString(): string;
  }
}
