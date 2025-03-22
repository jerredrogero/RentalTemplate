import * as movininHelper from ':movinin-helper'
import env from '@/config/env.config'

/**
* Get currency (always returns USD).
*
* @returns {string}
*/
export const getCurrency = () => 'USD'

/**
 * Return currency symbol (always returns $).
 *
 * @returns {string}
 */
export const getCurrencySymbol = () => '$'

/**
 * No need to convert price as we only use USD.
 *
 * @async
 * @param {number} amount
 * @returns {Promise<number>}
 */
export const convertPrice = async (amount: number) => amount

/**
 * Check if currency is written from right to left.
 * For USD, it's always left-to-right.
 *
 * @returns {boolean}
 */
export const currencyRTL = () => false
