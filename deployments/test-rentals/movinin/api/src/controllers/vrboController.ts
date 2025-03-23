import { Request, Response } from 'express'
import * as env from '../config/env.config'
import Property from '../models/Property'
import Booking from '../models/Booking'
import * as logger from '../common/logger'
import i18n from '../lang/i18n'

/**
 * Sync calendar with VRBO.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const syncCalendar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const property = await Property.findById(id)
    if (!property) {
      return res.status(204).send(i18n.t('PROPERTY_NOT_FOUND'))
    }

    if (!property.vrboEnabled || !property.vrboListingId) {
      return res.status(400).send(i18n.t('PROPERTY_NOT_VRBO_ENABLED'))
    }

    // Get bookings for this property (for informational purposes only)
    await Booking.find({ property: id })

    // Placeholder for actual VRBO API integration
    // In a real implementation, this would call the VRBO API to sync the calendar
    const success = true

    if (success) {
      return res.sendStatus(200)
    }
    return res.status(400).send(i18n.t('VRBO_SYNC_ERROR'))
  } catch (err) {
    logger.error(`[vrbo.syncCalendar] ${i18n.t('DB_ERROR')} ${req.params.id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Sync all listings with VRBO.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const syncListings = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find({ vrboEnabled: true })

    if (properties.length === 0) {
      return res.status(204).send(i18n.t('NO_VRBO_PROPERTIES'))
    }

    // Placeholder for actual VRBO API integration
    // In a real implementation, this would call the VRBO API to sync all listings
    const success = true

    if (success) {
      return res.sendStatus(200)
    }
    return res.status(400).send(i18n.t('VRBO_SYNC_ERROR'))
  } catch (err) {
    logger.error(`[vrbo.syncListings] ${i18n.t('DB_ERROR')}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Create a listing on VRBO.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const createListing = async (req: Request, res: Response) => {
  try {
    const { body }: { body: { propertyId: string } } = req
    const { propertyId } = body

    if (!env.VRBO_ENABLED) {
      return res.status(400).send(i18n.t('VRBO_NOT_ENABLED'))
    }

    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(204).send(i18n.t('PROPERTY_NOT_FOUND'))
    }

    // Placeholder for actual VRBO API integration
    // In a real implementation, this would call the VRBO API to create a listing
    const listingId = `VRBO-${Date.now()}`

    // Update property with VRBO listing ID
    property.vrboEnabled = true
    property.vrboListingId = listingId
    await property.save()

    return res.json({ listingId })
  } catch (err) {
    logger.error(`[vrbo.createListing] ${i18n.t('DB_ERROR')} ${JSON.stringify(req.body)}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Update a listing on VRBO.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {unknown}
 */
export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!env.VRBO_ENABLED) {
      return res.status(400).send(i18n.t('VRBO_NOT_ENABLED'))
    }

    const property = await Property.findById(id)
    if (!property) {
      return res.status(204).send(i18n.t('PROPERTY_NOT_FOUND'))
    }

    if (!property.vrboEnabled || !property.vrboListingId) {
      return res.status(400).send(i18n.t('PROPERTY_NOT_VRBO_ENABLED'))
    }

    // Placeholder for actual VRBO API integration
    // In a real implementation, this would call the VRBO API to update a listing
    const success = true

    if (success) {
      return res.sendStatus(200)
    }
    return res.status(400).send(i18n.t('VRBO_UPDATE_ERROR'))
  } catch (err) {
    logger.error(`[vrbo.updateListing] ${i18n.t('DB_ERROR')} ${req.params.id}`, err)
    return res.status(400).send(i18n.t('DB_ERROR') + err)
  }
}

export default {
  createListing,
  updateListing,
  syncCalendar,
  syncListings
} 