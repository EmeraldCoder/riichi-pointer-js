import * as WrcRuleset from './rulesets/wrc-ruleset'
import * as CustomRuleset from './rulesets/custom-ruleset'

const localStorageKey = 'riichi-pointer-ruleset'
const defaultPreset = WrcRuleset.key
let instance = null

function setup (key, options) {
  if (key === WrcRuleset.key) {
    instance = WrcRuleset.create(options)
  } else if (key === CustomRuleset.key) {
    instance = CustomRuleset.create(options)
  } else {
    throw Error(`ruleset key [${key}] not supported`)
  }

  if (key === defaultPreset) {
    localStorage.removeItem(localStorageKey)
  } else if (key === CustomRuleset.key) {
    // only need to save the options for the custom ruleset for now because they are readonly for the other presets
    localStorage.setItem(localStorageKey, JSON.stringify({ key, options: instance.options }))
  } else {
    localStorage.setItem(localStorageKey, JSON.stringify({ key }))
  }
}

function initialize () {
  // try to find a previous ruleset in the localStorage of the browser to re-apply on the application
  try {
    const localStorageItem = localStorage.getItem(localStorageKey)

    if (localStorageItem != null) {
      const parsedLocalStorageItem = JSON.parse(localStorageItem)
      setup(parsedLocalStorageItem.key, parsedLocalStorageItem.options)
    }
  } catch { }

  // put the default preset if no previous ruleset was found or if an error occured while trying to setup it
  if (instance == null) setup(defaultPreset)
}

initialize()

export function getRuleset () {
  return instance
}

export function setRuleset (key, options) {
  setup(key, options)
}
