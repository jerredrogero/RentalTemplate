import cors from 'cors'
import * as helper from '../common/helper'
import * as env from '../config/env.config'
import * as logger from '../common/logger'

// In a production environment, you would want to restrict this to specific domains
// For test deployment, we'll allow all origins to simplify troubleshooting
const CORS_CONFIG: cors.CorsOptions = {
  origin: '*', // Allow all origins for testing
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-access-token'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/**
 * CORS middleware.
 *
 * @export
 * @returns {*}
 */
export default () => cors(CORS_CONFIG)
