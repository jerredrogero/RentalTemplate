import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
  },
  en: {
  },
})

langHelper.setLanguage(strings)
export { strings }
