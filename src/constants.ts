/**
 * Month names in Amharic
 */
export const MONTH_NAMES: string[] = [
  '', // 0-index placeholder
  'መስከረም',
  'ጥቅምት',
  'ኅዳር',
  'ታኅሣሥ',
  'ጥር',
  'የካቲት',
  'መጋቢት',
  'ሚያዝያ',
  'ግንቦት',
  'ሰኔ',
  'ሐምሌ',
  'ነሐሴ',
  'ጳጉሜን',
];

/**
 * Day names in Amharic
 */
export const DAY_NAMES: string[] = [
  '', // 0-index placeholder
  'ሰኞ', // Monday
  'ማክሰኞ', // Tuesday
  'ረቡዕ', // Wednesday
  'ሐሙስ', // Thursday
  'ዓርብ', // Friday
  'ቅዳሜ', // Saturday
  'እሑድ', // Sunday
];

/**
 * Day names in long form
 */
export const DAY_NAMES_LONG: string[] = [
  '',
  'ሰኞ',
  'ማክሰኞ',
  'ረቡዕ',
  'ሐሙስ',
  'ዓርብ',
  'ቅዳሜ',
  'እሑድ',
];

/**
 * Orthodox day names (Saints' days)
 */
export const ORTHODOX_DAY_NAMES: string[] = [
  '',
  'ልደታ',
  'ታደዎስ',
  'ቅዱስ',
  'ሩፋኤል',
  'አቡነ',
  'ቅዱሳን',
  'ሥላሴ',
  'እግዝእትነ',
  'ቅዱስ',
  'ገብርኤል',
  'ዮሐንስ',
  'ሚካኤል',
  'እየሱስ',
  'አማኑኤል',
  'ቂርቆስ',
  'እግዚአብሔር',
  'እስጢፋኖስ',
  'መድኃኔዓለም',
  'ደብረዘይት',
  'ሕንፅተ',
  'መስቀል',
  'ሩፋኤል',
  'ድንግል',
  'ሚካኤል',
  'አቡነ',
  'እግዚአብሔር',
  'መድኃኔዓለም',
  'ጊዮርጊስ',
  'በዓለ',
  'ምህረት',
];

/**
 * Orthodox year names (Evangelists)
 */
export const ORTHODOX_YEAR_NAMES: string[] = [
  'ዮሐንስ', // John
  'ማቴዎስ', // Matthew
  'ማርቆስ', // Mark
  'ሉቃስ', // Luke
];

/**
 * Geez numbers
 */
export const GEEZ_NUMBERS: string[] = [
  '',
  '፩',
  '፪',
  '፫',
  '፬',
  '፭',
  '፮',
  '፯',
  '፰',
  '፱',
  '፲',
  '፲፩',
  '፲፪',
  '፲፫',
  '፲፬',
  '፲፭',
  '፲፮',
  '፲፯',
  '፲፰',
  '፲፱',
  '፳',
  '፳፩',
  '፳፪',
  '፳፫',
  '፳፬',
  '፳፭',
  '፳፮',
  '፳፯',
  '፳፰',
  '፳፱',
  '፴',
];

/**
 * Time of day names
 */
export const TIME_OF_DAY_NAMES: Record<string, string> = {
  midnight: 'እኩለ፡ሌሊት',
  morning: 'ጡዋት',
  noon: 'ቀትር',
  afternoon: 'ከሰዓት',
  evening: 'ምሽት',
  night: 'ሌሊት',
};

/**
 * Era names
 */
export const ERA_AM = 'ዓ/ም'; // ዓመተ ምሕረት (Anno Mundi - Year of Mercy)
export const ERA_BC = 'ዓ/ዓ'; // ዓመተ ዓለም (Before Christ)

/**
 * Date format constants
 */
export const DATE_ETHIOPIAN = 'l፣ F d ቀን H:i:s A T Y E';
export const DATE_ETHIOPIAN_ORTHODOX = 'l፣ F d ቀን (x) H:i:s A T Y (X) E';
export const DATE_GEEZ = 'l፣ F V ቀን H:i:s A T K E';
export const DATE_GEEZ_ORTHODOX = 'l፣ F V ቀን (x) H:i:s A T K (X) E';
