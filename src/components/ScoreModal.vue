<template>
  <modal-component
    :open="open"
    title="Score"
    @close="$emit('close')"
  >
    <div
      v-if="data == null"
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
          {{ data.summary }}
        </div>

        <div v-if="data.yakuman != null">
          {{ data.yakuman.total }} yakuman
        </div>
        <div v-else>
          {{ data.han.total }} han / {{ data.fu.total }} fu
        </div>
      </div>

      <div class="score-layout__details m-t-2">
        <div v-if="data.yakuman != null">
          <h2><span>Yakuman Details</span></h2>

          <table>
            <tbody>
              <tr
                v-for="(detail, index) in data.yakuman.details"
                :key="index"
              >
                <td>
                  {{ titleCase(detail.japaneseRomanizedName) }}
                  <div
                    v-if="detail.japaneseRomanizedName !== detail.localizedName"
                    class="localized-name"
                  >
                    {{ titleCase(detail.localizedName) }}
                  </div>
                </td>
                <td class="txt-right">
                  {{ detail.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="data.yakuman == null">
          <h2><span>Han Details</span></h2>

          <table>
            <tbody>
              <tr
                v-for="(detail, index) in data.han.details"
                :key="index"
              >
                <td>
                  {{ titleCase(detail.japaneseRomanizedName) }}
                  <div
                    v-if="detail.japaneseRomanizedName !== detail.localizedName"
                    class="localized-name"
                  >
                    {{ titleCase(detail.localizedName) }}
                  </div>
                </td>
                <td class="txt-right">
                  {{ detail.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="data.yakuman == null">
          <h2><span>Fu Details</span></h2>

          <table>
            <tbody>
              <tr
                v-for="(detail, index) in data.fu.details"
                :key="index"
              >
                <td>
                  {{ titleCase(t(`fuRules.${detail.key}`)) }}
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

<script>
import Hand from '@/core/hand'
import ModalComponent from '@/components/Modal.vue'
import titleCase from '@/filters/title-case'
import formatNumber from '@/filters/format-number'
import { computed } from 'vue'
import { t } from '@/i18n'

export default {
  components: {
    ModalComponent
  },

  props: {
    open: {
      type: Boolean,
      required: true
    },
    hand: {
      type: Hand,
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
      const hanCalculation = props.ruleset.hanCalculator.calculate(props.hand)

      if (hanCalculation.han == null && hanCalculation.yakuman == null) return null // no yaku hand

      const isYakuman = hanCalculation.yakuman != null

      const fuCalculation = isYakuman ? null : props.ruleset.fuCalculator.calculate(props.hand)

      const point = props.ruleset.pointCalculator.calculate(props.hand, fuCalculation?.total, hanCalculation.han, hanCalculation.yakuman)

      let summary = ''
      if (props.hand.winningType === 'ron') {
        summary = formatNumber(point.discard) + ' points'
      } else {
        if (props.hand.seatWind === 'east') {
          summary = formatNumber(point.nonDealer) + ' points from all players'
        } else {
          summary = formatNumber(point.nonDealer) + ' / ' + formatNumber(point.dealer) + ' points'
        }
      }

      if (isYakuman) {
        return {
          summary,
          yakuman: {
            total: hanCalculation.yakuman,
            details: hanCalculation.details.map(x => ({
              localizedName: t(x.key),
              japaneseRomanizedName: t(x.key, 'jp-romanized'),
              value: x.yakumanValue
            }))
          }
        }
      } else {
        return {
          summary,
          han: {
            total: hanCalculation.han,
            details: hanCalculation.details.map(x => ({
              localizedName: t(x.key),
              japaneseRomanizedName: t(x.key, 'jp-romanized'),
              value: x.hanValue
            }))
          },
          fu: fuCalculation
        }
      }
    })

    return {
      data,
      t,
      titleCase
    }
  }
}
</script>

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
