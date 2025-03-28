import React, { useState, useRef } from 'react'
import {
  FormControl,
  TextField,
  Button,
  IconButton
} from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import { strings as commonStrings } from '@/lang/common'
import { strings } from '@/lang/booking-filter'
import LocationSelectList from './LocationSelectList'
import Accordion from '@/components/Accordion'

import '@/assets/css/property-scheduler-filter.css'

interface PropertySchedulerFilterProps {
  collapse?: boolean
  className?: string
  onSubmit?: (filter: movininTypes.Filter | null) => void
}

const PropertySchedulerFilter = ({
  collapse,
  className,
  onSubmit
}: PropertySchedulerFilterProps) => {
  const [location, setLocation] = useState('')
  const [keyword, setKeyword] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleLocationChange = (locations: movininTypes.Option[]) => {
    setLocation(locations.length > 0 ? locations[0]._id : '')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault()

    let filter: movininTypes.Filter | null = {
      location,
      keyword
    }

    if (!location && !keyword) {
      filter = null
    }
    if (onSubmit) {
      onSubmit(movininHelper.clone(filter))
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <Accordion title={commonStrings.SEARCH} collapse={collapse} className={`${className ? `${className} ` : ''}property-scheduler-filter`}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }} />
        <FormControl fullWidth margin="dense">
          <LocationSelectList
            label={strings.LOCATION}
            variant="standard"
            onChange={handleLocationChange}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <TextField
            inputRef={inputRef}
            variant="standard"
            value={keyword}
            onKeyDown={handleSearchKeyDown}
            onChange={handleSearchChange}
            placeholder={commonStrings.SEARCH_PLACEHOLDER}
            slotProps={{
              input: {
                endAdornment: keyword ? (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setKeyword('')
                      inputRef.current?.focus()
                    }}
                  >
                    <ClearIcon className="d-adornment-icon" />
                  </IconButton>
                ) : (
                  <SearchIcon className="d-adornment-icon" />
                ),
              }
            }}
            className="bf-search"
          />
        </FormControl>
        <Button type="submit" variant="contained" className="btn-primary btn-search" fullWidth>
          {commonStrings.SEARCH}
        </Button>
      </form>
    </Accordion>
  )
}

export default PropertySchedulerFilter
