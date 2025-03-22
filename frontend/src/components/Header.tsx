import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import BookingsIcon from '@mui/icons-material/Book'
import SettingsIcon from '@mui/icons-material/Settings'
import SignoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import * as movininTypes from ':movinin-types'
import { strings } from '@/lang/header'
import { useUser } from '@/context/UserContext'
import * as UserService from '@/services/UserService'

function Header() {
  const navigate = useNavigate()
  const { user, signout } = useUser()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSettingsClick = () => {
    handleMenuClose()
    navigate('/settings')
  }

  const handleSignout = () => {
    handleMenuClose()
    signout()
    navigate('/')
  }

  const handleSideMenuOpen = () => {
    setIsSideMenuOpen(true)
  }

  const handleSideMenuClose = () => {
    setIsSideMenuOpen(false)
  }

  const isPropertyOwner = user && user.type === movininTypes.UserType.PropertyOwner
  const isSignedIn = !!user

  return (
    <div className="header">
      <AppBar position="fixed" className="app-bar">
        <Toolbar className="toolbar">
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="open drawer" 
            onClick={handleSideMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <div className="logo-container">
            <a href="/" className="logo-link">
              <img src="/logo.png" alt="Logo" className="logo" />
            </a>
          </div>
          
          <div style={{ flexGrow: 1 }} />
          
          {isSignedIn ? (
            <>
              <IconButton
                edge="end"
                aria-label="account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                {user.avatar ? (
                  <Avatar src={`/avatars/${user.avatar}`} alt={user.fullName} />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {isPropertyOwner && (
                  <MenuItem onClick={() => {
                    handleMenuClose()
                    navigate('/property-owner')
                  }}>
                    <HomeIcon sx={{ mr: 1 }} />
                    {strings.PROPERTY_OWNER_DASHBOARD}
                  </MenuItem>
                )}
                <MenuItem onClick={handleSettingsClick}>
                  <SettingsIcon sx={{ mr: 1 }} />
                  {strings.SETTINGS}
                </MenuItem>
                <MenuItem onClick={handleSignout}>
                  <SignoutIcon sx={{ mr: 1 }} />
                  {strings.SIGN_OUT}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/sign-in')}>
              {strings.SIGN_IN}
            </Button>
          )}
          
          <Drawer 
            anchor="left"
            open={isSideMenuOpen} 
            onClose={handleSideMenuClose}
          >
            <List sx={{ width: 250 }}>
              <ListItem 
                button
                onClick={() => {
                  navigate('/')
                  handleSideMenuClose()
                }}
              >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary={strings.HOME} />
              </ListItem>
              
              {isSignedIn && (
                <ListItem 
                  button
                  onClick={() => {
                    navigate('/bookings')
                    handleSideMenuClose()
                  }}
                >
                  <ListItemIcon><BookingsIcon /></ListItemIcon>
                  <ListItemText primary={strings.BOOKINGS} />
                </ListItem>
              )}
              
              {isPropertyOwner && (
                <ListItem 
                  button
                  onClick={() => {
                    navigate('/property-owner')
                    handleSideMenuClose()
                  }}
                >
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary={strings.PROPERTY_OWNER_DASHBOARD} />
                </ListItem>
              )}
              
              <ListItem 
                button
                onClick={() => {
                  navigate('/about')
                  handleSideMenuClose()
                }}
              >
                <ListItemText primary={strings.ABOUT} />
              </ListItem>
              
              <ListItem 
                button
                onClick={() => {
                  navigate('/tos')
                  handleSideMenuClose()
                }}
              >
                <ListItemText primary={strings.TOS} />
              </ListItem>
              
              <ListItem 
                button
                onClick={() => {
                  navigate('/contact')
                  handleSideMenuClose()
                }}
              >
                <ListItemText primary={strings.CONTACT} />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header 