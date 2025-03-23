import React, { useState, useEffect, ReactNode } from 'react'
import { Button } from '@mui/material'
import * as movininTypes from ':movinin-types'
import { strings } from '@/lang/master'
import * as UserService from '@/services/UserService'
import * as helper from '@/common/helper'
import { useAnalytics } from '@/common/useAnalytics'
import { useUserContext, UserContextType } from '@/context/UserContext'
import env from '@/config/env.config'

interface LayoutProps {
  strict?: boolean
  children: ReactNode
  onLoad?: (user?: movininTypes.User) => void
}

const Layout = ({
  strict,
  children,
  onLoad
}: LayoutProps) => {
  useAnalytics()

  const { user, userLoaded } = useUserContext() as UserContextType
  const [loading, setLoading] = useState(true)

  // Debug information
  console.log('Layout state:', { user, userLoaded, loading, strict })

  useEffect(() => {
    if (userLoaded) {
      console.log('User loaded:', user ? 'authenticated' : 'not authenticated', 'strict:', strict)
      if (!user && strict) {
        // UserService.signout(false, true)
        UserService.signout(true, false)
      } else {
        setLoading(false)

        if (onLoad) {
          onLoad(user || undefined)
        }
      }
    }
  }, [user, userLoaded, strict]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleResend = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    try {
      if (user) {
        const data = { email: user.email }

        const status = await UserService.resendLink(data)
        if (status === 200) {
          helper.info(strings.VALIDATION_EMAIL_SENT)
        } else {
          helper.error(null, strings.VALIDATION_EMAIL_ERROR)
        }
      }
    } catch (err) {
      helper.error(err, strings.VALIDATION_EMAIL_ERROR)
    }
  }

  return (
    <div className="main-layout">
      <div className="content">
        {env.DEVELOPMENT && (
          <div style={{ padding: '8px', backgroundColor: '#e0f7e0', color: 'black', position: 'fixed', top: '10px', right: '10px', zIndex: 9999, fontSize: '12px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Debug: {loading ? 'Loading...' : (user ? 'User authenticated' : 'User NOT authenticated')}
          </div>
        )}

        {(!user && !loading) || (user && user.verified) ? (
          children
        ) : (
          !loading && (
            <div className="validate-email">
              <span>{strings.VALIDATE_EMAIL}</span>
              <Button type="button" variant="contained" className="btn-primary btn-resend" onClick={handleResend}>
                {strings.RESEND}
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Layout
