const routes = {
  create: '/api/create-booking',
  checkout: '/api/checkout',
  update: '/api/update-booking',
  updateStatus: '/api/update-booking-status',
  delete: '/api/delete-bookings',
  deleteTempBooking: '/api/delete-temp-booking/:bookingId/:sessionId',
  getBooking: '/api/booking/:id/:language',
  getBookingId: '/api/booking-id/:sessionId',
  getBookings: '/api/bookings/:page/:size/:language',
  getBookingsByProperties: '/api/bookings-by-properties/:page/:size/:language',
  hasBookings: '/api/has-bookings/:renter',
  cancelBooking: '/api/cancel-booking/:id',
}

export default routes
