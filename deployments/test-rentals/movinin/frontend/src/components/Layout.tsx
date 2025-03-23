import React, { useState, useEffect, ReactNode } from 'react'
import { Button } from '@mui/material'
import * as movininTypes from ':movinin-types'
import { strings } from '@/lang/master'
import * as UserService from '@/services/UserService'
import * as helper from '@/common/helper'
import { useAnalytics } from '@/common/useAnalytics'
import { useUserContext, UserContextType } from '@/context/UserContext'

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
    <>
      {(!user && !loading) || (user && user.verified) ? (
        <div className="content">
          {/* Debug rendering info */}
          <div style={{ padding: '10px', background: '#f2f2f2', display: 'none' }}>
            Layout Debug: Rendering {user ? 'authenticated' : 'unauthenticated'} content
          </div>
          {children}
        </div>
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
    </>
  )
}

export default Layout
