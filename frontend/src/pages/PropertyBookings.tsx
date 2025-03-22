import React, { useState, useEffect } from 'react'
import { Container, Paper, Typography, Box, CircularProgress, Card, CardContent, Grid, Chip, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import * as movininTypes from ':movinin-types'
import Layout from '@/components/Layout'
import { useUser } from '@/context/UserContext'
import * as PropertyService from '@/services/PropertyService'
import * as BookingService from '@/services/BookingService'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/properties'

function PropertyBookings() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [property, setProperty] = useState<movininTypes.Property | null>(null)
  const [bookings, setBookings] = useState<movininTypes.Booking[]>([])

  useEffect(() => {
    if (!user || user.type !== movininTypes.UserType.PropertyOwner) {
      navigate('/')
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch property
        if (id) {
          const fetchedProperty = await PropertyService.getProperty(id)
          
          if (!fetchedProperty) {
            navigate('/property-owner')
            return
          }
          
          // Check if property belongs to this owner
          if (fetchedProperty.owner && fetchedProperty.owner._id !== user._id) {
            navigate('/property-owner')
            return
          }
          
          setProperty(fetchedProperty)
          
          // Fetch bookings for this property
          const bookingResult = await BookingService.getBookingsByProperties([id], 1, 100)
          if (bookingResult && bookingResult.length > 0 && bookingResult[0].resultData) {
            setBookings(bookingResult[0].resultData)
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, user, navigate])

  const getStatusColor = (status: movininTypes.BookingStatus) => {
    switch (status) {
      case movininTypes.BookingStatus.Pending:
        return 'warning'
      case movininTypes.BookingStatus.Paid:
      case movininTypes.BookingStatus.Reserved:
        return 'success'
      case movininTypes.BookingStatus.Cancelled:
        return 'error'
      default:
        return 'default'
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString()
  }

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          {property && (
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" gutterBottom>
                  {strings.BOOKINGS_FOR} {property.name}
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/property-owner')}
                >
                  {strings.BACK_TO_DASHBOARD}
                </Button>
              </Box>
              
              {bookings.length > 0 ? (
                <Grid container spacing={3}>
                  {bookings.map((booking) => (
                    <Grid item xs={12} key={booking._id}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle1" color="textSecondary">
                                {commonStrings.RENTER}
                              </Typography>
                              <Typography variant="body1">
                                {booking.renter.fullName}
                              </Typography>
                              {booking.renter.email && (
                                <Typography variant="body2">
                                  {booking.renter.email}
                                </Typography>
                              )}
                              {booking.renter.phone && (
                                <Typography variant="body2">
                                  {booking.renter.phone}
                                </Typography>
                              )}
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle1" color="textSecondary">
                                {commonStrings.DATES}
                              </Typography>
                              <Typography variant="body1">
                                {formatDate(booking.from)} - {formatDate(booking.to)}
                              </Typography>
                              <Box mt={1}>
                                <Chip 
                                  label={booking.status} 
                                  color={getStatusColor(booking.status)}
                                  size="small"
                                />
                              </Box>
                            </Grid>
                            
                            <Grid item xs={12}>
                              <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" color="primary">
                                  ${booking.price}
                                </Typography>
                                <Button 
                                  variant="outlined" 
                                  size="small"
                                  onClick={() => navigate(`/booking/${booking._id}`)}
                                >
                                  {strings.VIEW_DETAILS}
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box textAlign="center" py={4}>
                  <Typography variant="body1">
                    {strings.NO_BOOKINGS_FOUND}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Layout>
  )
}

export default PropertyBookings 