import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SIGN_IN: 'Connexion',
    SIGN_OUT: 'Déconnexion',
    SETTINGS: 'Paramètres',
    LANGUAGE: 'Langue',
    HOME: 'Accueil',
    BOOKINGS: 'Réservations',
    ABOUT: 'À propos',
    TOS: 'Conditions d\'utilisation',
    CONTACT: 'Contact',
    AGENCIES: 'Agences',
    LOCATIONS: 'Destinations',
    PRIVACY_POLICY: 'Politique de confidentialité',
    COOKIE_POLICY: 'Politique des cookies',
    PROPERTY_OWNER_DASHBOARD: 'Tableau de bord du propriétaire',
  },
  en: {
    SIGN_IN: 'Sign in',
    SIGN_OUT: 'Sign out',
    SETTINGS: 'Settings',
    LANGUAGE: 'Language',
    HOME: 'Home',
    BOOKINGS: 'Bookings',
    ABOUT: 'About',
    TOS: 'Terms of Service',
    CONTACT: 'Contact',
    AGENCIES: 'Agencies',
    LOCATIONS: 'Destinations',
    PRIVACY_POLICY: 'Privacy Policy',
    COOKIE_POLICY: 'Cookie Policy',
    PROPERTY_OWNER_DASHBOARD: 'Property Owner Dashboard',
  },
})

langHelper.setLanguage(strings)
export { strings } 