import axiosInstance from './axiosInstance'

/**
 * Fetches company settings from the API.
 * 
 * @returns {Promise<any>} - Promise containing the company settings
 */
export const getSettings = () => (
  new Promise<any>((resolve, reject) => {
    axiosInstance
      .get('/api/settings')
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
) 