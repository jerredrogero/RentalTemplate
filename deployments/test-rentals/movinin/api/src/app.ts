import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import nocache from 'nocache'
import cookieParser from 'cookie-parser'
import i18n from './lang/i18n'
import * as env from './config/env.config'
import cors from './middlewares/cors'
import allowedMethods from './middlewares/allowedMethods'
import agencyRoutes from './routes/agencyRoutes'
import bookingRoutes from './routes/bookingRoutes'
import locationRoutes from './routes/locationRoutes'
import notificationRoutes from './routes/notificationRoutes'
import propertyRoutes from './routes/propertyRoutes'
import userRoutes from './routes/userRoutes'
import stripeRoutes from './routes/stripeRoutes'
import countryRoutes from './routes/countryRoutes'
import paypalRoutes from './routes/paypalRoutes'
import ipinfoRoutes from './routes/ipinfoRoutes'
import vrboRoutes from './routes/vrboRoutes'
import * as helper from './common/helper'

const app = express()

app.use(helmet.contentSecurityPolicy())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.crossOriginEmbedderPolicy())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())
app.use(helmet.originAgentCluster())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(helmet.crossOriginOpenerPolicy())

app.use(nocache())
app.use(compression({ threshold: 0 }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

app.use(cors())
app.options('*', cors())
app.use(cookieParser(env.COOKIE_SECRET))
app.use(allowedMethods)

// Add a simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      backend_host: env.BACKEND_HOST,
      frontend_host: env.FRONTEND_HOST
    }
  });
});

// Add a root path handler
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Test Rentals API is running',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// Add test endpoint
app.post('/api/test-auth', async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = require('./models/User').default;
    const bcrypt = require('bcrypt');
    
    console.log('Test auth called with:', email);
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(200).json({ success: false, message: 'User not found', email });
    }
    
    console.log('User found:', user.email, 'Type:', user.type);
    
    const match = await bcrypt.compare(password, user.password);
    
    console.log('Password match:', match);
    
    if (!match) {
      return res.status(200).json({ success: false, message: 'Password does not match', email });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      user: {
        id: user._id,
        email: user.email,
        type: user.type,
        active: user.active,
        verified: user.verified
      }
    });
  } catch (error) {
    console.error('Test auth error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'An unknown error occurred' 
    });
  }
});

app.use('/', agencyRoutes)
app.use('/', bookingRoutes)
app.use('/', locationRoutes)
app.use('/', notificationRoutes)
app.use('/', propertyRoutes)
app.use('/', userRoutes)
app.use('/', stripeRoutes)
app.use('/', countryRoutes)
app.use('/', paypalRoutes)
app.use('/', ipinfoRoutes)
app.use('/', vrboRoutes)

i18n.locale = env.DEFAULT_LANGUAGE

helper.mkdir(env.CDN_USERS)
helper.mkdir(env.CDN_TEMP_USERS)
helper.mkdir(env.CDN_PROPERTIES)
helper.mkdir(env.CDN_TEMP_PROPERTIES)
helper.mkdir(env.CDN_LOCATIONS)
helper.mkdir(env.CDN_TEMP_LOCATIONS)

export default app
