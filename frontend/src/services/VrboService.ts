import axios from 'axios'
import * as movininTypes from ':movinin-types'
import Env from '../config/env.config'

/**
 * Create a VRBO listing for a property.
 *
 * @param {string} propertyId - The ID of the property
 * @returns {Promise<any>} - A promise that resolves to the created listing
 */
export const createListing = async (propertyId: string): Promise<any> => {
  const url = `${Env.API_HOST}/create-listing/${propertyId}`
  return axios.post(url)
}

/**
 * Update a VRBO listing for a property.
 *
 * @param {string} propertyId - The ID of the property
 * @returns {Promise<any>} - A promise that resolves to the updated listing
 */
export const updateListing = async (propertyId: string): Promise<any> => {
  const url = `${Env.API_HOST}/update-listing/${propertyId}`
  return axios.put(url)
}

/**
 * Sync VRBO calendar for a property.
 *
 * @param {string} propertyId - The ID of the property
 * @returns {Promise<any>} - A promise that resolves to the sync result
 */
export const syncCalendar = async (propertyId: string): Promise<any> => {
  const url = `${Env.API_HOST}/sync-calendar/${propertyId}`
  return axios.get(url)
}

/**
 * Sync VRBO listings for a property owner.
 *
 * @param {string} ownerId - The ID of the property owner
 * @returns {Promise<any>} - A promise that resolves to the listings
 */
export const syncListings = async (ownerId: string): Promise<any> => {
  const url = `${Env.API_HOST}/sync-listings/${ownerId}`
  return axios.get(url)
} 