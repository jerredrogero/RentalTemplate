import React, { useState, useEffect } from 'react'
import { Container, Paper, Typography, TextField, Button, Grid, FormControlLabel, Checkbox, MenuItem, Box, CircularProgress } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import * as movininTypes from ':movinin-types'
import Layout from '@/components/Layout'
import { useUser } from '@/context/UserContext'
import * as PropertyService from '@/services/PropertyService'
import * as LocationService from '@/services/LocationService'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/property'

function EditProperty() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    type: movininTypes.PropertyType.House,
    description: '',
    bedrooms: 1,
    bathrooms: 1,
    kitchens: 1,
    parkingSpaces: 0,
    size: 0,
    petsAllowed: false,
    furnished: false,
    aircon: false,
    minimumAge: 21,
    location: '',
    address: '',
    price: 0,
    hidden: false,
    cancellation: 0,
    rentalTerm: movininTypes.RentalTerm.Monthly,
    image: '',
    agency: '',
    available: true,
  })
  const [locations, setLocations] = useState<movininTypes.Location[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<string>('')

  useEffect(() => {
    if (!user || user.type !== movininTypes.UserType.PropertyOwner) {
      navigate('/')
      return
    }

    const fetchData = async () => {
      try {
        setInitialLoading(true)
        
        // Fetch locations
        const fetchedLocations = await LocationService.getLocations()
        setLocations(fetchedLocations)
        
        // Fetch property
        if (id) {
          const property = await PropertyService.getProperty(id)
          
          if (!property) {
            navigate('/property-owner')
            return
          }
          
          // Check if property belongs to this owner
          if (property.owner && property.owner._id !== user._id) {
            navigate('/property-owner')
            return
          }
          
          setFormData({
            _id: property._id,
            name: property.name,
            type: property.type,
            description: property.description,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            kitchens: property.kitchens || 1,
            parkingSpaces: property.parkingSpaces || 0,
            size: property.size || 0,
            petsAllowed: property.petsAllowed,
            furnished: property.furnished,
            aircon: property.aircon || false,
            minimumAge: property.minimumAge,
            location: property.location._id,
            address: property.address || '',
            price: property.price,
            hidden: property.hidden || false,
            cancellation: property.cancellation || 0,
            rentalTerm: property.rentalTerm,
            image: property.image,
            agency: property.agency ? property.agency._id : '',
            available: property.available !== undefined ? property.available : true,
          })
          
          setOriginalImage(property.image)
          setImagePreview(`/properties/${property.image}`)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setInitialLoading(false)
      }
    }

    fetchData()
  }, [id, user, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name) newErrors.name = commonStrings.REQUIRED_FIELD
    if (!formData.description) newErrors.description = strings.DESCRIPTION_REQUIRED
    if (!formData.location) newErrors.location = commonStrings.REQUIRED_FIELD
    if (formData.price <= 0) newErrors.price = commonStrings.REQUIRED_FIELD
    if (!imageFile && !imagePreview) newErrors.image = commonStrings.IMAGE_REQUIRED
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      // Upload new image if changed
      let imageName = originalImage
      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)
        const uploadResult = await PropertyService.uploadImage(formData)
        imageName = uploadResult.filename
        
        // Delete old image if it exists
        if (originalImage) {
          await PropertyService.deleteImage(id as string, originalImage)
        }
      }
      
      // Update the property
      const propertyData: movininTypes.UpdatePropertyPayload = {
        ...formData,
        _id: id as string,
        image: imageName,
      }
      
      await PropertyService.update(propertyData)
      navigate('/property-owner')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
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
          <Typography variant="h4" gutterBottom>
            {strings.UPDATE_PROPERTY}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label={strings.NAME}
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="type"
                  label={strings.PROPERTY_TYPE}
                  select
                  fullWidth
                  value={formData.type}
                  onChange={handleSelectChange}
                  required
                >
                  <MenuItem value={movininTypes.PropertyType.House}>{strings.HOUSE}</MenuItem>
                  <MenuItem value={movininTypes.PropertyType.Apartment}>{strings.APARTMENT}</MenuItem>
                  <MenuItem value={movininTypes.PropertyType.Townhouse}>{strings.TOWN_HOUSE}</MenuItem>
                  <MenuItem value={movininTypes.PropertyType.Plot}>{strings.PLOT}</MenuItem>
                  <MenuItem value={movininTypes.PropertyType.Farm}>{strings.FARM}</MenuItem>
                  <MenuItem value={movininTypes.PropertyType.Commercial}>{strings.COMMERCIAL}</MenuItem>
                  <MenuItem value={movininTypes.PropertyType.Industrial}>{strings.INDUSTRIAL}</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="location"
                  label={strings.LOCATION}
                  select
                  fullWidth
                  value={formData.location}
                  onChange={handleSelectChange}
                  error={!!errors.location}
                  helperText={errors.location}
                  required
                >
                  {locations.map((location) => (
                    <MenuItem key={location._id} value={location._id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={strings.DESCRIPTION}
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.description}
                  onChange={handleInputChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="bedrooms"
                  label={strings.BEDROOMS}
                  type="number"
                  fullWidth
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="bathrooms"
                  label={strings.BATHROOMS}
                  type="number"
                  fullWidth
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="kitchens"
                  label={strings.KITCHENS}
                  type="number"
                  fullWidth
                  value={formData.kitchens}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="parkingSpaces"
                  label={strings.PARKING_SPACES}
                  type="number"
                  fullWidth
                  value={formData.parkingSpaces}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="size"
                  label={strings.SIZE}
                  type="number"
                  fullWidth
                  value={formData.size}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  label={strings.PRICE}
                  type="number"
                  fullWidth
                  value={formData.price}
                  onChange={handleInputChange}
                  error={!!errors.price}
                  helperText={errors.price}
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="minimumAge"
                  label={strings.MINIMUM_AGE}
                  type="number"
                  fullWidth
                  value={formData.minimumAge}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 21 } }}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="rentalTerm"
                  label={strings.RENTAL_TERM}
                  select
                  fullWidth
                  value={formData.rentalTerm}
                  onChange={handleSelectChange}
                  required
                >
                  <MenuItem value={movininTypes.RentalTerm.Monthly}>Monthly</MenuItem>
                  <MenuItem value={movininTypes.RentalTerm.Weekly}>Weekly</MenuItem>
                  <MenuItem value={movininTypes.RentalTerm.Daily}>Daily</MenuItem>
                  <MenuItem value={movininTypes.RentalTerm.Yearly}>Yearly</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="address"
                  label={strings.ADDRESS}
                  fullWidth
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="petsAllowed"
                      checked={formData.petsAllowed}
                      onChange={handleInputChange}
                    />
                  }
                  label={strings.PETS_ALLOWED}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="furnished"
                      checked={formData.furnished}
                      onChange={handleInputChange}
                    />
                  }
                  label={strings.FURNISHED}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="aircon"
                      checked={formData.aircon}
                      onChange={handleInputChange}
                    />
                  }
                  label={strings.AIRCON}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="hidden"
                      checked={formData.hidden}
                      onChange={handleInputChange}
                    />
                  }
                  label={strings.HIDDEN}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="available"
                      checked={formData.available}
                      onChange={handleInputChange}
                    />
                  }
                  label={strings.AVAILABLE}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  {strings.IMAGES}
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span">
                    {commonStrings.UPLOAD_IMAGE}
                  </Button>
                </label>
                {errors.image && (
                  <Typography color="error" variant="caption" display="block">
                    {errors.image}
                  </Typography>
                )}
                {imagePreview && (
                  <Box mt={2} sx={{ maxWidth: 300 }}>
                    <img src={imagePreview} alt="Preview" style={{ width: '100%' }} />
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => navigate('/property-owner')}
                  >
                    {commonStrings.CANCEL}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : commonStrings.UPDATE}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Layout>
  )
}

export default EditProperty 