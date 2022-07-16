<template>
  <modal-base-component
    :open="open"
    title="Configuration"
    @close="$emit('close')"
  >
    <div class="ruleset-configuration-layout">
      <h1 class="m-b">
        Calculator Mode
      </h1>

      <div class="btn-group">
        <button
          :class="{ active: mode === 'simple' }"
          @click="changeMode('simple')"
        >
          Simple
        </button>
        <button
          :class="{ active: mode === 'advanced' }"
          @click="changeMode('advanced')"
        >
          Advanced
        </button>
      </div>

      <h1 class="m-t m-b">
        Ruleset
      </h1>

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
            :disabled="readOnly"
            @click="changeOption('allowOpenTanyao', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowOpenTanyao }"
            :disabled="readOnly"
            @click="changeOption('allowOpenTanyao', false)"
          >
            No
          </button>
        </div>
      </div>

      <div class="btn-groups with-labels m-t">
        <label>Kiriage Mangan:</label>
        <div class="btn-group">
          <button
            :class="{ active: ruleset.options.kiriageMangan }"
            :disabled="readOnly"
            @click="changeOption('kiriageMangan', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.kiriageMangan }"
            :disabled="readOnly"
            @click="changeOption('kiriageMangan', false)"
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
            :disabled="readOnly"
            @click="changeOption('allowMultipleYakuman', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowMultipleYakuman }"
            :disabled="readOnly"
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
            :disabled="readOnly"
            @click="changeOption('allowDoubleYakuman', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowDoubleYakuman }"
            :disabled="readOnly"
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
            :disabled="readOnly"
            @click="changeOption('allowDoubleWindFu', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowDoubleWindFu }"
            :disabled="readOnly"
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
            :disabled="readOnly"
            @click="changeOption('renhouValue', 'mangan')"
          >
            Mangan
          </button>
          <button
            :class="{ active: ruleset.options.renhouValue === 'yakuman' }"
            :disabled="readOnly"
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
            :disabled="readOnly"
            @click="changeOption('kazoeYakumanAsSanbaiman', true)"
          >
            Sanbaiman
          </button>
          <button
            :class="{ active: !ruleset.options.kazoeYakumanAsSanbaiman }"
            :disabled="readOnly"
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
            :disabled="readOnly"
            @click="changeOption('allowOpenRiichi', true)"
          >
            Yes
          </button>
          <button
            :class="{ active: !ruleset.options.allowOpenRiichi }"
            :disabled="readOnly"
            @click="changeOption('allowOpenRiichi', false)"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </modal-base-component>
</template>

<script>
import ModalBaseComponent from '@/components/ModalBase.vue'
import { key as wrcRulesetKey } from '@/rulesets/wrc-ruleset'
import { key as customRulesetKey } from '@/rulesets/custom-ruleset'
import { computed } from 'vue'

export default {
  components: {
    ModalBaseComponent
  },

  props: {
    open: {
      type: Boolean,
      required: true
    },
    ruleset: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },

  emits: ['close', 'updateRuleset', 'updateMode'],

  setup (props, { emit }) {
    return {
      wrcRulesetKey,
      customRulesetKey,

      readOnly: computed(() => props.ruleset.key !== customRulesetKey),

      changePreset: key => { if (props.ruleset !== key) emit('updateRuleset', key) },

      changeOption: (option, value) => {
        if (props.ruleset[option] !== value) {
          const options = { ...props.ruleset.options }
          options[option] = value
          emit('updateRuleset', props.ruleset.key, options)
        }
      },

      changeMode: mode => {
        if (mode !== props.mode) {
          emit('updateMode', mode)
        }
      }
    }
  }
}
</script>

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
