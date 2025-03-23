import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import SearchForm from '@/components/SearchForm'
import * as movininTypes from ':movinin-types'
import * as CountryService from '@/services/CountryService'
import * as LocationService from '@/services/LocationService'
import { strings } from '@/lang/home'
import env from '@/config/env.config'
import '@/assets/css/home.css'

const Home = () => {
  const [countries, setCountries] = useState<movininTypes.CountryInfo[]>([])
  const [locations, setLocations] = useState<movininTypes.Location[]>([])

  const onLoad = async () => {
    try {
      console.log('Home: Loading countries and locations...')
      const _countries = await CountryService.getCountriesWithLocations('', true, env.MIN_LOCATIONS)
      console.log('Home: Countries loaded', _countries.length)
      setCountries(_countries)
      
      const _locations = await LocationService.getLocationsWithPosition()
      console.log('Home: Locations loaded', _locations.length)
      setLocations(_locations)
    } catch (error) {
      console.error('Error loading home data:', error)
    }
  }

  return (
    <Layout onLoad={onLoad} strict={false}>
      <div style={{ 
        padding: '30px', 
        backgroundColor: '#ffffff',
        color: '#000000',
        margin: '30px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        position: 'relative',
        zIndex: 100
      }}>
        <h1>{strings.TITLE}</h1>
        <p>{strings.COVER}</p>
        
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '5px'
        }}>
          <h2>Find Your Perfect Rental</h2>
          <SearchForm />
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px'
        }}>
          <h2>{strings.SERVICES_TITLE}</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-between'
          }}>
            {/* Service cards would go here */}
            <div style={{
              flex: '1 1 300px',
              padding: '15px',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px'
            }}>
              <h3>{strings.SERVICES_FLEET_TITLE}</h3>
              <p>{strings.SERVICES_FLEET}</p>
            </div>
            
            <div style={{
              flex: '1 1 300px',
              padding: '15px',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px'
            }}>
              <h3>{strings.SERVICES_FLEXIBLE_TITLE}</h3>
              <p>{strings.SERVICES_FLEXIBLE}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
