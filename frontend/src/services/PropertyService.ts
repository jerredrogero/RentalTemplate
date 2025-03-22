import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'
import * as UserService from './UserService'

/**
 * Create a Property.
 *
 * @param {movininTypes.CreatePropertyPayload} data
 * @returns {Promise<any>}
 */
export const create = (data: movininTypes.CreatePropertyPayload): Promise<any> =>
  axiosInstance
    .post(
      '/api/create-property',
      data,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Update a Property.
 *
 * @param {movininTypes.UpdatePropertyPayload} data
 * @returns {Promise<any>}
 */
export const update = (data: movininTypes.UpdatePropertyPayload): Promise<any> =>
  axiosInstance
    .put(
      '/api/update-property',
      data,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Delete a Property.
 *
 * @param {string} id
 * @returns {Promise<any>}
 */
export const deleteProperty = (id: string): Promise<any> =>
  axiosInstance
    .delete(
      `/api/delete-property/${encodeURIComponent(id)}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Upload a Property image.
 *
 * @param {FormData} data
 * @returns {Promise<any>}
 */
export const uploadImage = (data: FormData): Promise<any> =>
  axiosInstance
    .post(
      '/api/upload-property-image',
      data,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    .then((res) => res.data)

/**
 * Delete a Property image.
 *
 * @param {string} property
 * @param {string} image
 * @returns {Promise<any>}
 */
export const deleteImage = (property: string, image: string): Promise<any> =>
  axiosInstance
    .delete(
      `/api/delete-property-image/${encodeURIComponent(property)}/${encodeURIComponent(image)}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get a Property by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Property>}
 */
export const getProperty = (id: string): Promise<movininTypes.Property> =>
  axiosInstance
    .get(
      `/api/property/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get Properties.
 *
 * @param {movininTypes.GetPropertiesPayload} payload
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Property>>}
 */
export const getProperties = (payload: movininTypes.GetPropertiesPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Property>> =>
  axiosInstance
    .post(
      `/api/properties/${page}/${size}`,
      payload,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get Properties by owner.
 *
 * @param {string} ownerId
 * @returns {Promise<movininTypes.Property[]>}
 */
export const getOwnerProperties = (ownerId: string): Promise<movininTypes.Property[]> =>
  axiosInstance
    .get(
      `/api/owner-properties/${encodeURIComponent(ownerId)}/${UserService.getLanguage()}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get Properties for frontend.
 *
 * @param {movininTypes.GetPropertiesPayload} payload
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Property>>}
 */
export const getFrontendProperties = (payload: movininTypes.GetPropertiesPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Property>> =>
  axiosInstance
    .post(
      `/api/frontend-properties/${page}/${size}`,
      payload
    )
    .then((res) => res.data)

/**
 * Check if a Property is related to a Booking.
 *
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export const check = (id: string): Promise<boolean> =>
  axiosInstance
    .get(
      `/api/check-property/${encodeURIComponent(id)}`,
      { withCredentials: true }
    )
    .then((res) => res.status === 200) 