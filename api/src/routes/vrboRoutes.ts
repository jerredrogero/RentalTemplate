import express from 'express'
import * as vrboController from '../controllers/vrboController'
import * as authJwt from '../middlewares/authJwt'

const router = express.Router()

// Sync VRBO listings for a property owner
router.get(
  '/sync-listings/:ownerId',
  [authJwt.verifyToken],
  vrboController.syncVrboListings
)

// Sync VRBO calendar for a property
router.get(
  '/sync-calendar/:propertyId',
  [authJwt.verifyToken],
  vrboController.syncVrboCalendar
)

// Create a VRBO listing for a property
router.post(
  '/create-listing/:propertyId',
  [authJwt.verifyToken],
  vrboController.createVrboListing
)

// Update a VRBO listing for a property
router.put(
  '/update-listing/:propertyId',
  [authJwt.verifyToken],
  vrboController.updateVrboListing
)

export default router 