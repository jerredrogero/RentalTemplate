import * as movininTypes from ':movinin-types';
/**
 * Format a number.
 *
 * @export
 * @param {number} x
 * @param {string} language ISO 639-1 language code
 * @returns {string}
 */
export declare const formatNumber: (x: number, language: string) => string;
/**
 * Format a Date number to two digits.
 *
 * @export
 * @param {number} n
 * @returns {string}
 */
export declare const formatDatePart: (n: number) => string;
/**
 * Capitalize a string.
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export declare const capitalize: (str: string) => string;
/**
 * Check if a value is a Date.
 *
 * @export
 * @param {?*} [value]
 * @returns {boolean}
 */
export declare const isDate: (value?: any) => boolean;
/**
 * Join two url parts.
 *
 * @param {?string} [part1]
 * @param {?string} [part2]
 * @returns {string}
 */
export declare const joinURL: (part1?: string, part2?: string) => string;
/**
 * Check if a string is an integer.
 *
 * @param {string} val
 * @returns {boolean}
 */
export declare const isInteger: (val: string) => boolean;
/**
 * Check if a string is a year.
 *
 * @param {string} val
 * @returns {boolean}
 */
export declare const isYear: (val: string) => boolean;
/**
 * Check if a string is a CVV.
 *
 * @param {string} val
 * @returns {boolean}
 */
export declare const isCvv: (val: string) => boolean;
/**
 * Check if two arrays are equal.
 *
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
export declare const arrayEqual: (a: any, b: any) => boolean;
/**
 * Clone an object or array.
 *
 * @param {*} obj
 * @returns {*}
 */
export declare const clone: (obj: any) => any;
/**
 * Clone an array.
 *
 * @export
 * @template T
 * @param {T[]} arr
 * @returns {(T[] | undefined | null)}
 */
export declare const cloneArray: <T>(arr: T[]) => T[] | undefined | null;
/**
 * Check if two filters are equal.
 *
 * @param {?(movininTypes.Filter | null)} [a]
 * @param {?(movininTypes.Filter | null)} [b]
 * @returns {boolean}
 */
export declare const filterEqual: (a?: movininTypes.Filter | null, b?: movininTypes.Filter | null) => boolean;
/**
 * Flatten Agency array.
 *
 * @param {movininTypes.User[]} companies
 * @returns {string[]}
 */
export declare const flattenAgencies: (companies: movininTypes.User[]) => string[];
/**
 * Get number of days between two dates.
 *
 * @param {?Date} [from]
 * @param {?Date} [to]
 * @returns {number}
 */
export declare const days: (from?: Date, to?: Date) => number;
/**
 * Check if User's language is French.
 *
 * @param {?movininTypes.User} [user]
 * @returns {boolean}
 */
export declare const fr: (user?: movininTypes.User) => boolean;
/**
 * Convert Extra string to number.
 *
 * @param {string} extra
 * @returns {number}
 */
export declare const extraToNumber: (extra: string) => number;
/**
 * Convert Extra number to string.
 *
 * @param {number} extra
 * @returns {string}
 */
export declare const extraToString: (extra: number) => string;
/**
 * Trim carriage return.
 *
 * @param {string} str
 * @returns {string}
 */
export declare const trimCarriageReturn: (str: string) => string;
/**
 * Get total days between two dates.
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number}
 */
export declare const totalDays: (date1: Date, date2: Date) => number;
/**
 * Get number of days in a month.
 *
 * @param {number} month
 * @param {number} year
 * @returns {number}
 */
export declare const daysInMonth: (month: number, year: number) => number;
/**
 * Get number of days in a year.
 *
 * @param {number} year
 * @returns {(366 | 365)}
 */
export declare const daysInYear: (year: number) => 366 | 365;
/**
 * Get all PropertyTypes.
 *
 * @returns {movininTypes.PropertyType[]}
 */
export declare const getAllPropertyTypes: () => movininTypes.PropertyType[];
/**
 * Get all RentalTerms.
 *
 * @returns {movininTypes.RentalTerm}
 */
export declare const getAllRentalTerms: () => movininTypes.RentalTerm[];
/**
 * Check whether language is french
 *
 * @param {string} language
 * @returns {boolean}
 */
export declare const isFrench: (language?: string) => language is "fr";
/**
 * Calculate total price.
 *
 * @param {movininTypes.Property} property
 * @param {Date} from
 * @param {Date} to
 * @param {?movininTypes.PropertyOptions} [options]
 * @returns {number}
 */
export declare const calculateTotalPrice: (property: movininTypes.Property, from: Date, to: Date, options?: movininTypes.PropertyOptions) => number;
/**
 * Convert price from a given currency to another.
 *
 * @async
 * @param {number} amount
 * @param {string} from
 * @param {string} to
 * @returns {Promise<number>}
 */
export declare const convertPrice: (amount: number, from: string, to: string) => Promise<number>;
/**
 * Check if currency is supported.
 *
 * @param {string} currency
 * @returns {boolean}
 */
export declare const checkCurrency: (currency: string) => boolean;
/**
 * Check if currency is written from right to left.
 *
 * @returns {*}
 */
export declare const currencyRTL: (currencySymbol: string) => boolean;
/**
 * Format price
 *
 * @param {number} price
 * @param {string} currency
 * @param {string} language ISO 639-1 language code
 * @returns {boolean}
 */
export declare const formatPrice: (price: number, currency: string, language: string) => string;
/**
 * Truncates a string.
 *
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export declare const truncateString: (str: string, maxLength: number) => string;
