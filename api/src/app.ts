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

// ... existing code ... 