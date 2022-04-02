import { getProperty } from 'dot-prop'
import en from './locales/en.json'
import jpRomanized from './locales/jp-romanized.json'

const defaultLocale = 'en'
const messages = {
  en,
  'jp-romanized': jpRomanized
}

export const t = (key, locale) => getProperty(messages[locale ?? defaultLocale], key) ?? key
