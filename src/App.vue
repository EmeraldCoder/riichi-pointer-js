<template>
  <div>
    <header>
      <div class="container">
        <h1>Your Hand</h1>

        <div
          id="QuickModeSwitcher"
          class="btn-group m-r"
        >
          <button
            :class="{ active: mode === 'simple' }"
            @click="switchMode('simple')"
          >
            Simple
          </button>
          <button
            :class="{ active: mode === 'advanced' }"
            @click="switchMode('advanced')"
          >
            Advanced
          </button>
        </div>

        <button @click="reset">
          Reset
        </button>

        <button
          class="text"
          style="font-size: 1.3rem;"
          title="Modify ruleset configuration"
          @click="rulesetConfigurationModal = true"
        >
          <font-awesome-icon :icon="settingsIcon" />
        </button>
      </div>
    </header>

    <main>
      <advanced-calculator-component
        v-if="mode === 'advanced'"
        :ruleset="ruleset"
      />
      <simple-calculator-component
        v-if="mode === 'simple'"
        :ruleset="ruleset"
      />
    </main>

    <configuration-modal-component
      :open="rulesetConfigurationModal"
      :ruleset="ruleset"
      :mode="mode"
      @updateRuleset="updateRuleset"
      @updateMode="switchMode"
      @close="rulesetConfigurationModal = false"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { getRuleset, setRuleset } from './ruleset'
import ConfigurationModalComponent from './components/ConfigurationModal.vue'
import AdvancedCalculatorComponent from './components/AdvancedCalculator.vue'
import SimpleCalculatorComponent from './components/SimpleCalculator.vue'
import eventBus from './event-bus'

const modeLocalStorageKey = 'riichi-pointer-mode'

export default {
  components: {
    FontAwesomeIcon,
    ConfigurationModalComponent,
    AdvancedCalculatorComponent,
    SimpleCalculatorComponent
  },

  data () {
    return {
      ruleset: null, // define the ruleset used by the calculator
      settingsIcon: faCog,
      rulesetConfigurationModal: false, // indicate if the ruleset configuration modal is open
      mode: mapMode(localStorage[modeLocalStorageKey])
    }
  },

  created () {
    this.ruleset = getRuleset()
  },

  methods: {
    reset () {
      eventBus.emit('reset')
    },

    updateRuleset (key, options) {
      setRuleset(key, options)
      this.ruleset = getRuleset()
    },

    switchMode (mode) {
      if (this.mode !== mode) {
        localStorage[modeLocalStorageKey] = mode
        this.mode = mode
      }
    }
  }
}

function mapMode (mode) {
  const defaultMode = 'advanced'
  const validModes = ['simple', 'advanced']

  if (mode == null || !validModes.includes(mode)) return defaultMode

  return mode
}
</script>

<style>
#QuickModeSwitcher {
  display: none;
}

@media (min-width: 500px) {
  #QuickModeSwitcher {
    display: block;
  }
}
</style>
