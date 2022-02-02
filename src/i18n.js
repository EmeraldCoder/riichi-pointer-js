import { getProperty } from 'dot-prop'

const defaultLocale = 'en'
const messages = loadLocaleMessages()

export const t = (key, locale) => getProperty(messages[locale ?? defaultLocale], key) ?? key

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}
