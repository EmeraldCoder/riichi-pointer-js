<template>
  <modal-component
    v-model="value"
    title="Score"
    @close="$emit('close')"
  >
    <div
      v-if="noYaku"
      class="score-layout"
    >
      <div class="bold txt-center m-t m-b">
        Your hand can't score any point because there is no yaku.
      </div>
    </div>

    <div
      v-else
      class="score-layout"
    >
      <div class="m-t txt-center">
        <div class="txt-2 bold m-b">
          {{ summary }}
        </div>

        <div v-if="yakuman.total > 0">
          {{ yakuman.total }} yakuman
        </div>
        <div v-else>
          {{ han.total }} han / {{ fu.total }} fu
        </div>
      </div>

      <div class="score-layout__details m-t-2">
        <div v-if="yakuman.total > 0">
          <h2><span>Yakuman Details</span></h2>

          <table>
            <tbody>
              <tr
                v-for="(detail, index) in yakuman.details"
                :key="index"
              >
                <td>{{ detail.name }}</td>
                <td>{{ detail.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="yakuman.total === 0">
          <h2><span>Han Details</span></h2>

          <table>
            <tbody>
              <tr
                v-for="(detail, index) in han.details"
                :key="index"
              >
                <td>{{ detail.name }}</td>
                <td class="txt-right">
                  {{ detail.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="yakuman.total === 0">
          <h2><span>Fu Details</span></h2>

          <table>
            <tbody>
              <tr
                v-for="(detail, index) in fu.details"
                :key="index"
              >
                <td>{{ detail.name }}</td>
                <td class="txt-right">
                  {{ detail.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </modal-component>
</template>

<style>
@media (min-width: 960px) {
  .score-layout {
    min-width: 500px;
  }

  .score-layout__details {
    display: flex;
  }

  .score-layout__details > * {
    flex: 1;
    padding-left: var(--gap-size);
    padding-right: var(--gap-size);
  }

  .score-layout__details > *:first-child {
    padding-left: 0;
  }

  .score-layout__details > *:last-child {
    padding-right: 0;
  }
}
</style>

<script>
import { calculateFu, calculatePoint } from '@/core/pointer-classes'
import { Hand } from '@/core/hand-classes'
import { Ruleset } from '@/core/ruleset-classes'
import ModalComponent from '@/components/Modal.vue'

export default {
  components: {
    ModalComponent
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },
    hand: {
      type: Hand,
      required: true
    },
    ruleset: {
      type: Ruleset,
      required: true
    }
  },

  computed: {
    noYaku () {
      return this.yakuman.total <= 0 && (this.han.total - this.hand.nbDora) <= 0
    },

    han () {
      const patterns = this.ruleset.getYakuPatterns()

      const han = patterns.reduce((agg, x) => {
        const checkResult = x.check(this.hand)
        if (checkResult > 0) {
          agg.total += checkResult
          agg.details.push({ value: checkResult, name: `${x.japaneseName} (${x.englishName})` })
        }
        return agg
      }, { total: 0, details: [] })

      if (this.hand.nbDora > 0) {
        han.total += this.hand.nbDora
        han.details.push({ value: this.hand.nbDora, name: 'Dora' })
      }

      return han
    },

    yakuman () {
      const patterns = this.ruleset.getYakumanPatterns()

      return patterns.reduce((agg, x) => {
        const checkResult = x.check(this.hand)
        if (checkResult > 0) {
          agg.total += checkResult
          agg.details.push({ value: checkResult, name: `${x.japaneseName} (${x.englishName})` })
        }
        return agg
      }, { total: 0, details: [] })
    },

    fu () {
      return calculateFu(this.hand)
    },

    summary () {
      const pointResult = calculatePoint(this.hand, this.han.total, this.fu.total, this.yakuman.total)

      let summary = ''

      if (this.hand.winningType === 'ron') {
        summary = pointResult + ' points'
      } else {
        if (this.hand.seatWind === 'east') {
          summary = pointResult + ' points from all players'
        } else {
          summary = pointResult.nonDealer + ' / ' + pointResult.dealer + ' points'
        }
      }

      return summary
    }
  }
}
</script>
