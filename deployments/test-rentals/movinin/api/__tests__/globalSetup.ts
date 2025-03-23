import 'dotenv/config'
import bcrypt from 'bcrypt'
import * as movininTypes from ':movinin-types'
import * as env from '../src/config/env.config'
import * as logger from '../src/common/logger'
import * as databaseHelper from '../src/common/databaseHelper'
import User from '../src/models/User'

export default async function globalSetup() {
  try {
    // env admin
    if (env.ADMIN_EMAIL) {
      await databaseHelper.connect(env.DB_URI, false, false)
      const adminFromEnv = await User.findOne({ email: env.ADMIN_EMAIL })
      if (!adminFromEnv) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash('Un1tTest5', salt)
        const admin = new User({
          fullName: 'admin',
          email: env.ADMIN_EMAIL,
          language: 'en',
          password: passwordHash,
          type: movininTypes.UserType.Admin,
        })
        await admin.save()
        logger.info('globalSetup: Admin user created:', admin.id)
      }
      await databaseHelper.close()
      logger.info('Database connection closed')
    }
  } catch (err) {
    logger.error('Error while running global setup', err)
  }
}
