import express from 'express'
import routeNames from '../config/vrboRoutes.config'
import vrboController from '../controllers/vrboController'
import authJwt from '../middlewares/authJwt'

const router = express.Router()

// Create VRBO listing
router.post(
  routeNames.create_listing,
  [authJwt.verifyToken],
  vrboController.createListing,
)

// Update VRBO listing
router.put(
  routeNames.update_listing,
  [authJwt.verifyToken],
  vrboController.updateListing,
)

// Sync VRBO calendar
router.post(
  routeNames.sync_calendar,
  [authJwt.verifyToken],
  vrboController.syncCalendar,
)

// Sync VRBO listings
router.post(
  routeNames.sync_listings,
  [authJwt.verifyToken],
  vrboController.syncListings,
)

export default router 