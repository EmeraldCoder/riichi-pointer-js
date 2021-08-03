<template>
  <div class="container simple-calculator">
    <div class="btn-group m-b">
      <button
        :class="{ active: winningType === 'tsumo' }"
        @click="winningType = 'tsumo'"
      >
        Tsumo
      </button>
      <button
        :class="{ active: winningType === 'ron' }"
        @click="winningType = 'ron'"
      >
        Ron
      </button>
    </div>

    <div class="btn-group m-b">
      <button
        :class="{ active: isDealer }"
        @click="isDealer = true"
      >
        Dealer
      </button>
      <button
        :class="{ active: !isDealer }"
        @click="isDealer = false"
      >
        Non Dealer
      </button>
    </div>

    <div class="grid">
      <label>Han:</label>
      <select v-model="han">
        <option :value="0">
          0
        </option>
        <option :value="1">
          1
        </option>
        <option :value="2">
          2
        </option>
        <option :value="3">
          3
        </option>
        <option :value="4">
          4
        </option>
        <option :value="5">
          5
        </option>
        <option :value="6">
          6, 7
        </option>
        <option :value="8">
          8, 9, 10
        </option>
        <option :value="11">
          11, 12
        </option>
        <option :value="13">
          13+
        </option>
      </select>

      <label>Fu:</label>
      <select v-model="fu">
        <option :value="0">
          0
        </option>
        <option :value="20">
          20
        </option>
        <option :value="25">
          25
        </option>
        <option :value="30">
          30
        </option>
        <option :value="40">
          40
        </option>
        <option :value="50">
          50
        </option>
        <option :value="60">
          60
        </option>
        <option :value="70">
          70
        </option>
        <option :value="80">
          80
        </option>
        <option :value="90">
          90
        </option>
        <option :value="100">
          100
        </option>
        <option :value="110">
          110
        </option>
      </select>

      <label>Yakuman:</label>
      <select v-model="yakuman">
        <option
          v-for="option in yakumanValues"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <div class="m-t calculate-button">
      <button
        :disabled="!canCalculatePoint"
        @click="showPoints"
      >
        <font-awesome-icon :icon="calculateIcon" />
        Calculate Score
      </button>
    </div>
  </div>

  <score-modal-component
    :open="scoreModal"
    :winning-type="winningType"
    :dealer="isDealer"
    :han="parsedHan"
    :fu="parsedFu"
    :yakuman="parsedYakuman"
    :ruleset="ruleset"
    @close="scoreModal = false"
  />
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'
import { ref, computed, onUnmounted, watch } from 'vue'
import eventBus from './../event-bus'
import ScoreModalComponent from './SimpleCalculatorScoreModal.vue'

export default {
  components: {
    FontAwesomeIcon,
    ScoreModalComponent
  },

  props: {
    ruleset: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    const scoreModal = ref(false)
    const winningType = ref('tsumo')
    const isDealer = ref(true)
    const han = ref('0')
    const fu = ref('0')
    const yakuman = ref('0')
    const parsedHan = computed(() => parseInt(han.value))
    const parsedFu = computed(() => parseInt(fu.value))
    const parsedYakuman = computed(() => parseInt(yakuman.value))

    const canCalculatePoint = computed(() => {
      return parsedYakuman.value !== 0 || parsedHan.value >= 5 || (parsedHan.value !== 0 && parsedFu.value !== 0)
    })

    const reset = () => {
      winningType.value = 'tsumo'
      isDealer.value = true
      han.value = 0
      fu.value = 0
      yakuman.value = 0
    }

    eventBus.on('reset', reset)
    onUnmounted(() => { eventBus.off('reset', reset) })

    const yakumanValues = computed(() => {
      const { allowMultipleYakuman, allowDoubleYakuman } = props.ruleset.options

      if (!allowMultipleYakuman && !allowDoubleYakuman) return [0, 1]
      if (!allowMultipleYakuman && allowDoubleYakuman) return [0, 1, 2]

      return [0, 1, 2, 3, 4]
    })

    watch(yakumanValues, values => {
      if (!values.includes(parsedYakuman.value)) yakuman.value = 0
    })

    return {
      winningType,
      isDealer,
      han,
      fu,
      yakuman,
      canCalculatePoint,
      scoreModal,
      parsedHan,
      parsedFu,
      parsedYakuman,
      yakumanValues,
      showPoints: () => { scoreModal.value = true },
      calculateIcon: faCalculator
    }
  }
}
</script>

<style>
.simple-calculator.container {
  max-width: 500px;
}

.simple-calculator .grid {
  display: grid;
  grid-template-columns: 1fr auto auto 1fr;
  align-items: center;
  row-gap: var(--gap-size);
  column-gap: var(--gap-size);
}
.simple-calculator .grid label {
  grid-column: 2;
  grid-row: auto;
  text-align: right;
}
.simple-calculator .grid select {
  grid-column: 3;
  grid-row: auto;
  width: 150px;
}

.simple-calculator .calculate-button button {
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 2.5rem;
}

select {
  background: var(--green);
  border: 1px solid var(--dark-green);
  padding: 0.5rem var(--gap-size);
  color: #fff;
  font-size: 1rem;
  font-weight: normal;
  border-radius: var(--radius);
}
select:hover:enabled {
  background: var(--green-hover);
}
</style>
