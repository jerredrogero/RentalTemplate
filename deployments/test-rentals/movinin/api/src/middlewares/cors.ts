import cors from 'cors'

/**
 * CORS configuration.
 * 
 * Simplified to allow all origins for deployment troubleshooting
 */
const CORS_CONFIG: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-access-token'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}

/**
 * CORS middleware.
 *
 * @export
 * @returns {*}
 */
export default () => cors(CORS_CONFIG)
