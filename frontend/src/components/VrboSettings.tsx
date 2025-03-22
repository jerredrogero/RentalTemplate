import React, { useState, useEffect } from 'react'
import {
  FormControl,
  FormControlLabel,
  Switch,
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material'
import * as movininTypes from ':movinin-types'
import * as UserService from '../services/UserService'
import * as PropertyService from '../services/PropertyService'
import * as VrboService from '../services/VrboService'
import { strings as commonStrings } from '../lang/common'
import { strings } from '../lang/properties'

interface VrboSettingsProps {
  user: movininTypes.User
  property: movininTypes.Property
  onSettingsUpdated?: () => void
}

function VrboSettings({ user, property, onSettingsUpdated }: VrboSettingsProps) {
  const [loading, setLoading] = useState(false)
  const [syncLoading, setSyncLoading] = useState(false)
  const [vrboEnabled, setVrboEnabled] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [syncSuccess, setSyncSuccess] = useState(false)

  useEffect(() => {
    // Here you would check if the property is already synced with VRBO
    // This is a placeholder for actual implementation
    setVrboEnabled(false)
  }, [property])

  const handleVrboEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVrboEnabled(event.target.checked)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      setError(false)
      setSuccess(false)

      // Here you would save the VRBO settings
      // This is a placeholder for actual implementation
      if (vrboEnabled) {
        await VrboService.createListing(property._id)
      } else {
        // Disable VRBO integration
      }

      setSuccess(true)
      if (onSettingsUpdated) {
        onSettingsUpdated()
      }
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async () => {
    try {
      setSyncLoading(true)
      setSyncSuccess(false)
      setError(false)

      // Here you would sync the property with VRBO
      // This is a placeholder for actual implementation
      await VrboService.syncCalendar(property._id)

      setSyncSuccess(true)
    } catch (err) {
      setError(true)
    } finally {
      setSyncLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 4, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        VRBO Integration
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {commonStrings.GENERIC_ERROR}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {commonStrings.SETTINGS_UPDATED}
        </Alert>
      )}

      {syncSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Calendar synced successfully
        </Alert>
      )}

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormControlLabel
          control={<Switch checked={vrboEnabled} onChange={handleVrboEnabledChange} />}
          label="Enable VRBO Integration"
        />
      </FormControl>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {commonStrings.SAVE}
        </Button>

        {vrboEnabled && (
          <Button
            variant="outlined"
            onClick={handleSync}
            disabled={syncLoading}
            startIcon={syncLoading ? <CircularProgress size={20} /> : null}
          >
            Sync Calendar
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default VrboSettings 