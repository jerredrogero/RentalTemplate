import { Request, Response } from 'express'
import VrboService from '../../../__services/vrbo'
import * as env from '../config/env.config'
import Property from '../models/Property'
import Booking from '../models/Booking'
import * as logger from '../common/logger'
import i18n from '../lang/i18n'

// Initialize VRBO service
const vrboService = new VrboService(env.VRBO_API_KEY)

/**
 * Sync VRBO listings for a property owner.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const syncVrboListings = async (req: Request, res: Response) => {
  try {
    // Check if VRBO integration is enabled
    if (!env.VRBO_ENABLED) {
      return res.status(400).send(i18n.t('VRBO_INTEGRATION_DISABLED'))
    }

    const { ownerId } = req.params

    // Get VRBO listings
    const vrboListings = await vrboService.getListings(ownerId)

    // Return the listings
    return res.json(vrboListings)
  } catch (err) {
    logger.error(`[vrbo.syncVrboListings] ${i18n.t('DB_ERROR')}`, err)
    return res.status(500).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Sync VRBO calendar for a property.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const syncVrboCalendar = async (req: Request, res: Response) => {
  try {
    // Check if VRBO integration is enabled
    if (!env.VRBO_ENABLED) {
      return res.status(400).send(i18n.t('VRBO_INTEGRATION_DISABLED'))
    }

    const { propertyId } = req.params

    // Get bookings for the property
    const bookings = await Booking.find({ property: propertyId })

    // Sync calendar with VRBO
    const result = await vrboService.syncCalendar(propertyId, bookings)

    // Return the result
    return res.json(result)
  } catch (err) {
    logger.error(`[vrbo.syncVrboCalendar] ${i18n.t('DB_ERROR')}`, err)
    return res.status(500).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Create a VRBO listing for a property.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const createVrboListing = async (req: Request, res: Response) => {
  try {
    // Check if VRBO integration is enabled
    if (!env.VRBO_ENABLED) {
      return res.status(400).send(i18n.t('VRBO_INTEGRATION_DISABLED'))
    }

    const { propertyId } = req.params

    // Get the property
    const property = await Property.findById(propertyId)
      .populate('location')
      .populate('agency')

    if (!property) {
      return res.status(404).send(i18n.t('PROPERTY_NOT_FOUND'))
    }

    // Create VRBO listing
    const result = await vrboService.createListing(property)

    // Return the result
    return res.json(result)
  } catch (err) {
    logger.error(`[vrbo.createVrboListing] ${i18n.t('DB_ERROR')}`, err)
    return res.status(500).send(i18n.t('DB_ERROR') + err)
  }
}

/**
 * Update a VRBO listing for a property.
 *
 * @export
 * @async
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const updateVrboListing = async (req: Request, res: Response) => {
  try {
    // Check if VRBO integration is enabled
    if (!env.VRBO_ENABLED) {
      return res.status(400).send(i18n.t('VRBO_INTEGRATION_DISABLED'))
    }

    const { propertyId } = req.params

    // Get the property
    const property = await Property.findById(propertyId)
      .populate('location')
      .populate('agency')

    if (!property) {
      return res.status(404).send(i18n.t('PROPERTY_NOT_FOUND'))
    }

    // Update VRBO listing
    const result = await vrboService.updateListing(property)

    // Return the result
    return res.json(result)
  } catch (err) {
    logger.error(`[vrbo.updateVrboListing] ${i18n.t('DB_ERROR')}`, err)
    return res.status(500).send(i18n.t('DB_ERROR') + err)
  }
} 