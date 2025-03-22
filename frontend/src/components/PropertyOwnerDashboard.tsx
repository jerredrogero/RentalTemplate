import React, { useState, useEffect } from 'react'
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import * as movininTypes from ':movinin-types'
import * as PropertyService from '../services/PropertyService'
import * as BookingService from '../services/BookingService'
import { strings as commonStrings } from '../lang/common'
import { strings } from '../lang/properties'
import VrboSettings from './VrboSettings'

interface PropertyOwnerDashboardProps {
  user: movininTypes.User
}

function PropertyOwnerDashboard({ user }: PropertyOwnerDashboardProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [properties, setProperties] = useState<movininTypes.Property[]>([])
  const [bookings, setBookings] = useState<movininTypes.Booking[]>([])
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    if (user && user._id) {
      fetchProperties()
    }
  }, [user])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      
      // Get properties for the property owner
      const payload: movininTypes.GetPropertiesPayload = {
        owners: [user._id as string],
      }
      
      const result = await PropertyService.getProperties(payload, 1, 100)
      if (result && result.length > 0 && result[0].resultData) {
        setProperties(result[0].resultData)
        
        // Fetch bookings for these properties
        const propertyIds = result[0].resultData.map(property => property._id as string)
        if (propertyIds.length > 0) {
          const bookingResult = await BookingService.getBookingsByProperties(propertyIds, 1, 100)
          if (bookingResult && bookingResult.length > 0 && bookingResult[0].resultData) {
            setBookings(bookingResult[0].resultData)
          }
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleCreateProperty = () => {
    navigate('/create-property')
  }

  const handleEditProperty = (propertyId: string) => {
    navigate(`/edit-property/${propertyId}`)
  }

  const handleViewBookings = (propertyId: string) => {
    navigate(`/property-bookings/${propertyId}`)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {strings.PROPERTY_OWNER_DASHBOARD}
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label={strings.PROPERTIES} />
          <Tab label={strings.BOOKINGS} />
          <Tab label={strings.SETTINGS} />
        </Tabs>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {tabValue === 0 && (
            <>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" color="primary" onClick={handleCreateProperty}>
                  {strings.CREATE_PROPERTY}
                </Button>
              </Box>

              <Grid container spacing={3}>
                {properties.length > 0 ? (
                  properties.map((property) => (
                    <Grid item xs={12} sm={6} md={4} key={property._id}>
                      <Card>
                        <Box sx={{ height: 200, overflow: 'hidden' }}>
                          <img
                            src={`/properties/${property.image}`}
                            alt={property.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Box>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {property.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {property.bedrooms} {strings.BEDROOMS} • {property.bathrooms} {strings.BATHROOMS}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {property.type}
                          </Typography>
                          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                            ${property.price} / {property.rentalTerm.toLowerCase()}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={() => handleEditProperty(property._id as string)}>
                            {commonStrings.EDIT}
                          </Button>
                          <Button size="small" onClick={() => handleViewBookings(property._id as string)}>
                            {strings.VIEW_BOOKINGS}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                      {strings.NO_PROPERTIES_FOUND}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Grid item xs={12} key={booking._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {booking.property.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(booking.from).toLocaleDateString()} - {new Date(booking.to).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {booking.renter.fullName}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                          ${booking.price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {booking.status}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => navigate(`/booking/${booking._id}`)}>
                          {strings.VIEW_DETAILS}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" align="center">
                    {strings.NO_BOOKINGS_FOUND}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}

          {tabValue === 2 && (
            <Box mt={2}>
              {properties.length > 0 && (
                <VrboSettings
                  user={user}
                  property={properties[0]}
                  onSettingsUpdated={fetchProperties}
                />
              )}
            </Box>
          )}
        </>
      )}
    </Container>
  )
}

export default PropertyOwnerDashboard 