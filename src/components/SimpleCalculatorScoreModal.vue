<template>
  <modal-component
    :open="open"
    title="Score"
    @close="$emit('close')"
  >
    <div
      v-if="data != null"
      class="score-layout"
    >
      <div class="m-t txt-center">
        <div class="txt-2 bold m-b">
          {{ data.summary }}
        </div>

        <div v-if="data.yakuman != null">
          {{ data.yakuman }} yakuman
        </div>
        <div v-else-if="data.fu !== 0">
          {{ data.han }} han / {{ data.fu }} fu
        </div>
        <div v-else>
          {{ data.han }} han
        </div>
      </div>
    </div>
  </modal-component>
</template>

<script>
import Hand from '@/core/hand.js'
import ModalComponent from '@/components/Modal.vue'
import formatNumber from '@/filters/format-number'
import { computed } from 'vue'

export default {
  components: {
    ModalComponent
  },

  props: {
    open: {
      type: Boolean,
      required: true
    },
    winningType: {
      type: String,
      required: true
    },
    dealer: {
      type: Boolean,
      required: true
    },
    han: {
      type: Number,
      required: true
    },
    fu: {
      type: Number,
      required: true
    },
    yakuman: {
      type: Number,
      required: true
    },
    ruleset: {
      type: Object,
      required: true
    }
  },

  emits: ['close'],

  setup (props) {
    const data = computed(() => {
      if (props.han == null && props.yakuman == null) return null // no yaku hand

      const isYakuman = props.yakuman !== 0

      const hand = new Hand({
        winningType: props.winningType,
        seatWind: props.dealer ? 'east' : 'south' // could be west or north, it's only to tell that the player was not dealer
      })

      const point = props.ruleset.pointCalculator.calculate(hand, props.fu, props.han, props.yakuman)

      let summary = ''
      if (props.winningType === 'ron') {
        summary = formatNumber(point.discard) + ' points'
      } else {
        if (props.dealer) {
          summary = formatNumber(point.nonDealer) + ' points from all players'
        } else {
          summary = formatNumber(point.nonDealer) + ' / ' + formatNumber(point.dealer) + ' points'
        }
      }

      if (isYakuman) {
        return {
          summary,
          yakuman: props.yakuman
        }
      } else {
        return {
          summary,
          han: mapHanDescription(props.han),
          fu: props.fu
        }
      }
    })

    return {
      data
    }
  }
}

function mapHanDescription (han) {
  if (han === 13) return '13+'
  if (han >= 11) return '11, 12'
  if (han >= 8) return '8, 9, 10'
  if (han >= 6) return '6, 7'
  return han
}
</script>

<style>
@media (min-width: 960px) {
  .score-layout {
    min-width: 700px;
  }
}
</style>
