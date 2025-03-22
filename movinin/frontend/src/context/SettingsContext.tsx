import React, { createContext, useState, useContext } from 'react'

export type SettingsContextType = {
  settings: any
  setSettings: React.Dispatch<React.SetStateAction<any>>
  loaded: boolean
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

interface SettingsProviderProps {
  children: React.ReactNode
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<any>({})
  const [loaded, setLoaded] = useState(false)

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        loaded,
        setLoaded,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsProvider')
  }
  
  return context
} 