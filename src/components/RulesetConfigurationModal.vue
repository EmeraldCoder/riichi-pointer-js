<template>
  <modal-component
    v-model="value"
    title="Ruleset Configuration"
    @close="$emit('close')"
  >
    <div class="ruleset-configuration-layout">
      <div class="btn-group">
        <button
          :class="{ active: ruleset.key === wrcRulesetKey }"
          @click="changePreset(wrcRulesetKey)"
        >
          WRC
        </button>

        <button
          :class="{ active: ruleset.key === customRulesetKey }"
          @click="changePreset(customRulesetKey)"
        >
          Custom
        </button>
      </div>

      <h2><span>Options</span></h2>

      <div class="btn-groups with-labels m-t">
        <label>Allow Open Tanyao:</label>
        <div class="btn-group">
          <button
            :class="{ active: ruleset.options.allowOpenTanyao }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowOpenTanyao', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowOpenTanyao }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowOpenTanyao', false)"
          >
            No
          </button>
        </div>
      </div>

      <div class="btn-groups with-labels m-t">
        <label>Allow Multiple Yakuman:</label>
        <div class="btn-group">
          <button
            :class="{ active: ruleset.options.allowMultipleYakuman }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowMultipleYakuman', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowMultipleYakuman }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowMultipleYakuman', false)"
          >
            No
          </button>
        </div>
      </div>

      <div class="btn-groups with-labels m-t">
        <label>Allow Double Yakuman:</label>
        <div class="btn-group">
          <button
            :class="{ active: ruleset.options.allowDoubleYakuman }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowDoubleYakuman', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowDoubleYakuman }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowDoubleYakuman', false)"
          >
            No
          </button>
        </div>
      </div>

      <div class="btn-groups with-labels m-t">
        <label>Allow Double Wind Fu:</label>
        <div class="btn-group">
          <button
            :class="{ active: ruleset.options.allowDoubleWindFu }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowDoubleWindFu', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowDoubleWindFu }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowDoubleWindFu', false)"
          >
            No
          </button>
        </div>
      </div>

      <div class="btn-groups with-labels m-t">
        <label>Renhou Value:</label>
        <div class="btn-group">
          <button
            :class="{ active: ruleset.options.renhouValue === 'mangan' }"
            :disabled="optionsAreReadonly"
            @click="changeOption('renhouValue', 'mangan')"
          >
            Mangan
          </button>
          <button
            :class="{ active: ruleset.options.renhouValue === 'yakuman' }"
            :disabled="optionsAreReadonly"
            @click="changeOption('renhouValue', 'yakuman')"
          >
            Yakuman
          </button>
        </div>
      </div>

      <div class="btn-groups with-labels m-t">
        <label>Kazoe Yakuman Value:</label>
        <div class="btn-group">
          <button
            :class="{ active: ruleset.options.kazoeYakumanAsSanbaiman }"
            :disabled="optionsAreReadonly"
            @click="changeOption('kazoeYakumanAsSanbaiman', true)"
          >
            Sanbaiman
          </button>
          <button
            :class="{ active: !ruleset.options.kazoeYakumanAsSanbaiman }"
            :disabled="optionsAreReadonly"
            @click="changeOption('kazoeYakumanAsSanbaiman', false)"
          >
            Yakuman
          </button>
        </div>
      </div>

      <h2><span>Optionals Yaku</span></h2>

      <div class="btn-groups with-labels m-t">
        <label>Allow Open Riichi:</label>
        <div class="btn-group">
          <button
            :class="{ active: ruleset.options.allowOpenRiichi }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowOpenRiichi', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowOpenRiichi }"
            :disabled="optionsAreReadonly"
            @click="changeOption('allowOpenRiichi', false)"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </modal-component>
</template>

<style>
.ruleset-configuration-layout {
  max-width: 500px;
  margin: auto;
}

.ruleset-configuration-layout .btn-groups.with-labels {
  grid-template-columns: auto 250px;
}

@media (max-width: 500px) {
  .ruleset-configuration-layout .btn-groups.with-labels {
    display: block;
  }

  .ruleset-configuration-layout .btn-groups.with-labels label {
    display: block;
    text-align: left;
    padding-bottom: calc(var(--gap-size) / 2);
  }
}

@media (min-width: 960px) {
  .ruleset-configuration-layout {
    min-width: 500px;
  }
}
</style>

<script>
import ModalComponent from '@/components/Modal.vue'
import { key as wrcRulesetKey } from '@/rulesets/wrc-ruleset'
import { key as customRulesetKey } from '@/rulesets/custom-ruleset'

export default {
  components: {
    ModalComponent
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },
    ruleset: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      wrcRulesetKey,
      customRulesetKey
    }
  },

  computed: {
    optionsAreReadonly () {
      return this.ruleset.key !== customRulesetKey
    }
  },

  methods: {
    changePreset (key) {
      if (this.ruleset.key !== key) {
        this.$emit('updateRuleset', key)
      }
    },

    changeOption (option, value) {
      if (this.ruleset[option] !== value) {
        const options = { ...this.ruleset.options }
        options[option] = value

        this.$emit('updateRuleset', this.ruleset.key, options)
      }
    }
  }
}
</script>
