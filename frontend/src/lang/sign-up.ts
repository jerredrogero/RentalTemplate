import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SIGN_UP_HEADING: 'Inscription',
    SIGN_UP: "S'inscrire",
    SIGN_UP_ERROR: "Une erreur s'est produite lors de l'inscription.",
    RENTER: 'Locataire',
    PROPERTY_OWNER: 'Propriétaire',
  },
  en: {
    SIGN_UP_HEADING: 'Register',
    SIGN_UP: 'Register',
    SIGN_UP_ERROR: 'An error occurred during sign up.',
    RENTER: 'Renter',
    PROPERTY_OWNER: 'Property Owner',
  },
})

langHelper.setLanguage(strings)
export { strings } 