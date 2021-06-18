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
                <td>
                  {{ detail.japaneseRomanizedName | titleCase }}
                  <div
                    v-if="detail.japaneseRomanizedName !== detail.localizedName"
                    class="localized-name"
                  >
                    {{ detail.localizedName | titleCase }}
                  </div>
                </td>
                <td class="txt-right">
                  {{ detail.value }}
                </td>
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
                <td>
                  {{ detail.japaneseRomanizedName | titleCase }}
                  <div
                    v-if="detail.japaneseRomanizedName !== detail.localizedName"
                    class="localized-name"
                  >
                    {{ detail.localizedName | titleCase }}
                  </div>
                </td>
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
                <td>
                  {{ detail.key | fuKeyMapping }}
                  <span v-if="detail.quantity > 1">
                    x{{ detail.quantity }}
                  </span>
                </td>
                <td class="txt-right">
                  {{ detail.fuValue * detail.quantity }}
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
.score-layout table {
  white-space: nowrap;
}

.score-layout h2 span { white-space: nowrap; }

.score-layout .localized-name {
  font-size: smaller;
  margin-top: 0.5em;
  font-style: italic;
}

@media (min-width: 960px) {
  .score-layout {
    min-width: 700px;
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
import Hand from '@/core/hand'
import { Ruleset } from '@/core/ruleset-classes'
import ModalComponent from '@/components/Modal.vue'
import titleCase from '@/filters/title-case'

export default {
  components: {
    ModalComponent
  },

  filters: {
    titleCase,

    fuKeyMapping (key) {
      if (key === 'win') return 'Winning'
      if (key === 'tsumo') return 'Tsumo'
      if (key === 'concealed ron') return 'Concealed Ron'
      if (key === 'open pinfu') return 'Open Pinfu'
      if (key === 'chiitoitsu') return 'Chiitoitsu (Seven Pairs)'
      if (key === 'pair') return 'Pair'
      if (key === 'wait') return 'Wait'
      if (key === 'minkou simple') return 'Open Pon (simple)'
      if (key === 'minkou non simple') return 'Open Pon (Terminal / Honor)'
      if (key === 'minkan simple') return 'Open Kan (simple)'
      if (key === 'minkan non simple') return 'Open Kan (Terminal / Honor)'
      if (key === 'ankou simple') return 'Concealed Pon (simple)'
      if (key === 'ankou non simple') return 'Concealed Pon (Terminal / Honor)'
      if (key === 'ankan simple') return 'Concealed Kan (simple)'
      if (key === 'ankan non simple') return 'Concealed Kan (Terminal / Honor)'
      return key
    }
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
      return this.hanCalculation.han == null && this.hanCalculation.yakuman == null
    },

    hanCalculation () {
      return this.ruleset.getHanCalculator().calculate(this.hand)
    },

    han () {
      if (this.hanCalculation.han == null) return { total: 0, details: [] } // invalid or yakuman hand

      return {
        total: this.hanCalculation.han,
        details: this.hanCalculation.details.map(x => ({
          localizedName: this.$t(x.key),
          japaneseRomanizedName: this.$t(x.key, 'jp-romanized'),
          value: x.hanValue
        }))
      }
    },

    yakuman () {
      if (this.hanCalculation.yakuman == null) return { total: 0, details: [] } // invalid or not a yakuman hand

      return {
        total: this.hanCalculation.yakuman,
        details: this.hanCalculation.details.map(x => ({
          localizedName: this.$t(x.key),
          japaneseRomanizedName: this.$t(x.key, 'jp-romanized'),
          value: x.yakumanValue
        }))
      }
    },

    fu () {
      return this.ruleset.getFuCalculator().calculate(this.hand)
    },

    summary () {
      if (this.noYaku) return

      const pointResult = this.ruleset.getPointCalculator().calculate(this.hand, this.fu.total, this.han.total, this.yakuman.total)

      let summary = ''

      if (this.hand.winningType === 'ron') {
        summary = pointResult.discard + ' points'
      } else {
        if (this.hand.seatWind === 'east') {
          summary = pointResult.nonDealer + ' points from all players'
        } else {
          summary = pointResult.nonDealer + ' / ' + pointResult.dealer + ' points'
        }
      }

      return summary
    }
  }
}
</script>
