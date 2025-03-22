import React from 'react'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import * as movininTypes from ':movinin-types'
import Layout from '@/components/Layout'
import PropertyOwnerDashboardComponent from '@/components/PropertyOwnerDashboard'
import { useUser } from '@/context/UserContext'

function PropertyOwnerDashboard() {
  const navigate = useNavigate()
  const { user } = useUser()

  if (!user || user.type !== movininTypes.UserType.PropertyOwner) {
    navigate('/')
    return null
  }

  return (
    <Layout>
      <Container maxWidth="xl">
        <PropertyOwnerDashboardComponent user={user} />
      </Container>
    </Layout>
  )
}

export default PropertyOwnerDashboard 