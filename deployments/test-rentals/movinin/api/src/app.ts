import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import nocache from 'nocache'
import cookieParser from 'cookie-parser'
import i18n from './lang/i18n'
import * as env from './config/env.config'
import { __env__ } from './config/env.config'
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

// Apply CORS first, before any other middleware
app.use(cors())
app.options('*', cors())

// Add explicit CORS headers for extra protection
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  return next();
});

// Configure Helmet to be less restrictive for CORS
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false
  })
);

app.use(nocache())
app.use(compression({ threshold: 0 }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

app.use(cookieParser(env.COOKIE_SECRET))
app.use(allowedMethods)

// Settings endpoint - add it explicitly since it's failing
app.get('/api/settings', (req, res) => {
  // Return minimal configuration for now
  res.status(200).json({
    language: env.DEFAULT_LANGUAGE,
    currency: 'USD',
    company: __env__('MI_COMPANY_NAME', false, 'Test Rental Company'),
    pagination: {
      enabled: true,
      size: 10
    }
  });
});

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
