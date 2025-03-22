/**
 * Server Port. Default is 4004.
 *
 * @type {number}
 */
export const PORT = Number.parseInt(__env__('MI_PORT', false, '4004'), 10)

/**
 * VRBO API Key.
 *
 * @type {string}
 */
export const VRBO_API_KEY = __env__('MI_VRBO_API_KEY', false, '')

/**
 * Enable VRBO integration.
 *
 * @type {boolean}
 */
export const VRBO_ENABLED = __env__('MI_VRBO_ENABLED', false, 'false') === 'true' 