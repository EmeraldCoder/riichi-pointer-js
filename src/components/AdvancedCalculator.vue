<template>
  <div class="container main-layout">
    <div class="main-layout__infos">
      <div class="main-layout__tiles-info">
        <h2><span>Combinations</span></h2>

        <div class="combinations-toolbar">
          <div class="btn-group">
            <button
              :class="{ active: addIsConcealed }"
              @click="addIsConcealed = true"
            >
              Concealed
            </button>
            <button
              :class="{ active: !addIsConcealed }"
              :disabled="!openedCombinationAvailable"
              @click="addIsConcealed = false"
            >
              Open
            </button>
          </div>

          <button
            :disabled="!addNormalCombinationAvailable"
            @click="addCombination('sequence')"
          >
            <font-awesome-icon :icon="plusIcon" />
            Sequence
          </button>
          <button
            :disabled="!addNormalCombinationAvailable"
            @click="addCombination('triplet')"
          >
            <font-awesome-icon :icon="plusIcon" />
            Triplet
          </button>
          <button
            :disabled="!addNormalCombinationAvailable"
            @click="addCombination('quad')"
          >
            <font-awesome-icon :icon="plusIcon" />
            Quad
          </button>
          <button
            :disabled="!addPairAvailable"
            @click="addCombination('pair')"
          >
            <font-awesome-icon :icon="plusIcon" />
            Pair
          </button>
          <button
            :disabled="!addOrphanAvailable"
            @click="addCombination('orphan')"
          >
            <font-awesome-icon :icon="plusIcon" />
            Orphan
          </button>
        </div>

        <div class="combinations-wrapper m-t">
          <h3 v-if="concealedCombinations.length > 0">
            Concealed
          </h3>
          <div
            v-if="concealedCombinations.length > 0"
            class="combination-group"
          >
            <combination-component
              v-for="(combination, index) in concealedCombinations"
              :key="'combination.concealed.' + index"
              :combination="combination"
              :waitable="true"
              :waiting-tile="waitingTile"
              :selected="combination === touchedCombination"
              @selectAsWaitingTile="toggleWaitingTile"
              @delete="removeConcealedCombination(combination)"
              @touch="touchCombination(combination)"
            />
          </div>

          <h3
            v-if="openCombinations.length > 0"
            :class="{ 'm-t-2': concealedCombinations.length > 0 }"
          >
            Open
          </h3>

          <div
            v-if="openCombinations.length > 0"
            class="combination-group"
          >
            <combination-component
              v-for="(combination, index) in openCombinations"
              :key="'combination.opened.' + index"
              :combination="combination"
              :selected="combination === touchedCombination"
              @delete="removeOpenedCombination(combination)"
              @touch="touchCombination(combination)"
            />
          </div>
        </div>
      </div>

      <div class="main-layout__general-info">
        <h2 class="no-mobile">
          <span>Configurations</span>
        </h2>

        <div class="btn-group">
          <button
            :class="{ active: winningType === 'tsumo' }"
            :disabled="!tsumoAvailable"
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

        <div class="btn-groups m-t">
          <div class="btn-group">
            <button
              :class="{ active: riichiType === 'normal' }"
              :disabled="!riichiAvailable"
              @click="riichiType = riichiType === 'normal' ? null : 'normal'"
            >
              Riichi
            </button>
            <button
              :class="{ active: riichiType === 'double' }"
              :disabled="!riichiAvailable"
              @click="riichiType = riichiType === 'double' ? null : 'double'"
            >
              Double Riichi
            </button>
          </div>

          <div class="btn-group">
            <button
              :class="{ active: riichiIsIppatsu }"
              :disabled="!riichiAvailable"
              @click="riichiIsIppatsu = !riichiIsIppatsu"
            >
              Ippatsu
            </button>
          </div>

          <div
            v-if="ruleset.options.allowOpenRiichi"
            class="btn-group"
          >
            <button
              :class="{ active: riichiIsOpen }"
              :disabled="!riichiAvailable"
              @click="riichiIsOpen = !riichiIsOpen"
            >
              Open Riichi
            </button>
          </div>
        </div>

        <h2><span>Winds</span></h2>

        <div class="responsive">
          <div class="btn-groups with-labels">
            <label>Prevalent:</label>
            <div class="btn-group">
              <button
                :class="{ active: prevalentWind === 'east' }"
                @click="prevalentWind = 'east'"
              >
                East
              </button>
              <button
                :class="{ active: prevalentWind === 'south' }"
                @click="prevalentWind = 'south'"
              >
                South
              </button>
              <button
                :class="{ active: prevalentWind === 'west' }"
                @click="prevalentWind = 'west'"
              >
                West
              </button>
              <button
                :class="{ active: prevalentWind === 'north' }"
                @click="prevalentWind = 'north'"
              >
                North
              </button>
            </div>

            <label>Seat:</label>
            <div class="btn-group">
              <button
                :class="{ active: seatWind === 'east' }"
                @click="seatWind = 'east'"
              >
                East
              </button>
              <button
                :class="{ active: seatWind === 'south' }"
                @click="seatWind = 'south'"
              >
                South
              </button>
              <button
                :class="{ active: seatWind === 'west' }"
                @click="seatWind = 'west'"
              >
                West
              </button>
              <button
                :class="{ active: seatWind === 'north' }"
                @click="seatWind = 'north'"
              >
                North
              </button>
            </div>
          </div>
        </div>

        <h2><span>Dora</span></h2>

        <dora-counter-component v-model="nbDora" />

        <h2><span>Special Cases</span></h2>

        <div class="btn-group-column">
          <button
            :class="{ active: specialCases.includes('lastTile') }"
            :disabled="!haiteiHouteiAvailable"
            @click="toggleSpecialCase('lastTile')"
          >
            Haitei Raoyue / Houtei Raoyui
          </button>
          <button
            :class="{ active: specialCases.includes('firstTurn') }"
            :disabled="!tenhouChiihouRenhouAvailable"
            @click="toggleSpecialCase('firstTurn')"
          >
            Tenhou / Chiihou / Renhou
          </button>
          <button
            :class="{ active: specialCases.includes('rinshan') }"
            :disabled="!rinshanAvailable"
            @click="toggleSpecialCase('rinshan')"
          >
            Rinshan Kaihou
          </button>
          <button
            :class="{ active: specialCases.includes('chankan') }"
            :disabled="!chankanAvailable"
            @click="toggleSpecialCase('chankan')"
          >
            Chankan
          </button>
        </div>
      </div>
    </div>

    <div class="main-layout__calculate-button">
      <button
        :disabled="!canCalculatePoint"
        @click="showPoints"
      >
        <font-awesome-icon :icon="calculateIcon" />
        Calculate Score
      </button>
    </div>
  </div>

  <tile-selection-modal-component
    :open="tileSelectionModal"
    :tiles="availableTilesForSelection"
    @selectTile="selectTile"
    @close="tileSelectionModal = false"
  />

  <score-modal-component
    v-if="hand != null"
    :open="scoreModal"
    :hand="hand"
    :ruleset="ruleset"
    @close="scoreModal = false"
  />
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalculator, faPlus } from '@fortawesome/free-solid-svg-icons'
import Hand from './../core/hand'
import { TileFactory, NumberedTile } from './../core/tile-classes'
import { CombinationFactory, Orphan, Pair, Quad } from './../core/combination-classes'
import CombinationComponent from './Combination.vue'
import TileSelectionModalComponent from './TileSelectionModal.vue'
import DoraCounterComponent from './DoraCounter.vue'
import ScoreModalComponent from './AdvancedCalculatorScoreModal.vue'
import eventBus from './../event-bus'

export default {
  components: {
    CombinationComponent,
    TileSelectionModalComponent,
    DoraCounterComponent,
    ScoreModalComponent,
    FontAwesomeIcon
  },

  props: {
    ruleset: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      prevalentWind: 'east', // name of the wind prevalent for the round (east, south, west, north)
      seatWind: 'east', // name of the wind of the player seat (east, south, west, north)
      winningType: 'tsumo', // indicate if the player won with a self-draw or discard (tsumo, ron)
      specialCases: [], // indicate if the player won with a particular circonstance (firstTurn, lastTile, rinshan, chankan)
      riichiType: null, // indicate if the player won with riichi circonstance (riichi / double riichi)
      riichiIsIppatsu: false, // indicate if the player's riichi was ippatsu (won on the first round after declaring riichi)
      riichiIsOpen: false, // indicate if the player's riichi is an open riichi (optional yaku)
      nbDora: 0, // indicate the number of dora in the player's hand
      waitingTile: null, // winning tile selected by the user
      concealedCombinations: [], // list of the concealed combinations of the player
      openCombinations: [], // list of the open combinations of the player
      addIsConcealed: true, // indicate if the combination that the user is currently adding is concealed or not
      addType: null, // type of the combination that the user is currently adding (pair, triplet, quad, sequence)
      touchedCombination: null, // keep track of which combination the user touch on mobile
      hand: null, // the hand object generate by the user selection (null if the hand is not in a finished state)
      tileSelectionModal: false, // indicate if the tile selection modal is open
      scoreModal: false, // indicate if the score modal is open
      calculateIcon: faCalculator,
      plusIcon: faPlus
    }
  },

  computed: {
    canCalculatePoint () {
      const counts = this.combinationCounts
      return this.waitingTile != null &&
       (
         (counts.pair === 7 && counts.normal === 0 && counts.orphan === 0) ||
         (counts.pair === 1 && counts.orphan === 12 && counts.normal === 0) ||
         (counts.pair === 1 && counts.normal === 4 && counts.orphan === 0)
       )
    },

    availableTiles () {
      const availableTiles = this.ruleset.tiles.map(x => {
        return { tile: x, count: 4 }
      })

      this.concealedCombinations.concat(this.openCombinations).forEach(combination => {
        combination.tiles.forEach(tile => {
          availableTiles.find(x => x.tile.suit === tile.suit && x.tile.value === tile.value).count--
        })
      })

      return availableTiles
    },

    availableTilesForSelection () {
      if (this.addType === 'sequence') {
        return this.availableTiles.map(tile => {
          let disabled = tile.count === 0 || !(tile.tile instanceof NumberedTile) || tile.tile.value >= 8

          if (!disabled) {
            const nextTile = this.availableTiles.find(x => x.tile.suit === tile.tile.suit && x.tile.value === tile.tile.value + 1)
            const nextTile2 = this.availableTiles.find(x => x.tile.suit === tile.tile.suit && x.tile.value === tile.tile.value + 2)
            disabled = nextTile.count === 0 || nextTile2.count === 0
          }

          return { tile: tile.tile, disabled }
        })
      } else {
        let tileNecessary = 1

        if (this.addType === 'pair') tileNecessary = 2
        else if (this.addType === 'triplet') tileNecessary = 3
        else if (this.addType === 'quad') tileNecessary = 4

        return this.availableTiles.map(tile => {
          const disabled = tile.count < tileNecessary
          return { tile: tile.tile, disabled }
        })
      }
    },

    combinationCounts () {
      let pair = 0
      let orphan = 0
      let quad = this.openCombinations.filter(x => x instanceof Quad).length
      let normal = this.openCombinations.length

      this.concealedCombinations.forEach(x => {
        if (x instanceof Orphan) orphan++
        else if (x instanceof Pair) pair++
        else if (x instanceof Quad) {
          quad++
          normal++
        } else normal++
      })

      return { pair, orphan, quad, normal }
    },

    addOrphanAvailable () {
      const counts = this.combinationCounts
      return this.addIsConcealed && counts.normal === 0 && counts.pair <= 1 && counts.orphan < 12
    },

    addPairAvailable () {
      const counts = this.combinationCounts
      return this.addIsConcealed && (counts.pair === 0 || ((counts.normal + counts.orphan) === 0 && counts.pair < 7))
    },

    addNormalCombinationAvailable () {
      const counts = this.combinationCounts
      return counts.orphan === 0 && counts.pair <= 1 && counts.normal < 4
    },

    riichiAvailable () {
      return this.openCombinations.length === 0 && !this.specialCases.includes('firstTurn')
    },

    openedCombinationAvailable () {
      return this.riichiType == null && !this.specialCases.includes('firstTurn')
    },

    tenhouChiihouRenhouAvailable () {
      return this.openCombinations.length === 0 && this.riichiType == null && !this.specialCases.includes('lastTile')
    },

    chankanAvailable () {
      return !this.specialCases.includes('rinshan') && !this.specialCases.includes('lastTile') && this.winningType === 'ron'
    },

    rinshanAvailable () {
      return this.winningType === 'tsumo' && this.combinationCounts.quad > 0
    },

    haiteiHouteiAvailable () {
      return !this.specialCases.includes('firstTurn') && !this.specialCases.includes('chankan')
    },

    tsumoAvailable () {
      return !this.specialCases.includes('chankan')
    }
  },

  watch: {
    riichiIsIppatsu (value) {
      // if the user select the ippatsu and the riichi was not selected, we need to select it
      if (value === true && this.riichiType == null) this.riichiType = 'normal'
    },

    riichiIsOpen (value) {
      // if the user select the ippatsu and the riichi was not selected, we need to select it
      if (value === true && this.riichiType == null) this.riichiType = 'normal'
    },

    riichiType (value) {
      // if the user removed his riichi and the ippatsu was selected, we need to reset it
      if (value == null && this.riichiIsIppatsu) this.riichiIsIppatsu = false
      // if the user removed his riichi and the open riichi was selected, we need to reset it
      if (value == null && this.riichiIsOpen) this.riichiIsOpen = false

      // if the user add a riichi and the add combination was on "opened", we need to reset
      // it to "concealed" because we can't have opened combination with riichi and the button
      // will be disabled anyway
      if (value != null && !this.addIsConcealed) this.addIsConcealed = true
    },

    specialCases (value) {
      if (value.includes('firstTurn') && !this.addIsConcealed) this.addIsConcealed = true
    },

    rinshanAvailable (value) {
      if (!value && this.specialCases.includes('rinshan')) this.specialCases.splice(this.specialCases.indexOf('rinshan'), 1)
    }
  },

  mounted () {
    // global event listener to unselect the touched combination on mobile
    // when the user touch anywhere on the screen
    document.addEventListener('touchend', this.resetTouchedCombination)

    eventBus.on('reset', this.reset)
  },

  unmounted () {
    document.removeEventListener('touchend', this.resetTouchedCombination)
    eventBus.off('reset', this.reset)
  },

  methods: {
    reset () {
      this.prevalentWind = 'east'
      this.seatWind = 'east'
      this.winningType = 'tsumo'
      this.specialCases = []
      this.riichiType = null
      this.riichiIsIppatsu = false
      this.riichiIsOpen = false
      this.nbDora = 0
      this.waitingTile = null
      this.concealedCombinations = []
      this.openCombinations = []
      this.addIsConcealed = true
      this.addType = null
      this.touchedCombination = null
      this.hand = null
    },

    addCombination (type) {
      this.addType = type
      this.tileSelectionModal = true
    },

    selectTile ({ suit, value }) {
      const firstTile = TileFactory.create(suit, value)
      const combination = CombinationFactory.create(this.addType, firstTile)

      if (this.addIsConcealed) {
        this.concealedCombinations.push(combination)
      } else {
        this.openCombinations.push(combination)
      }

      this.tileSelectionModal = false
    },

    removeConcealedCombination (combination) {
      if (this.touchedCombination === combination) {
        this.touchedCombination = null
      }

      if (combination.tiles.includes(this.waitingTile)) {
        this.waitingTile = null
      }

      const index = this.concealedCombinations.indexOf(combination)
      this.concealedCombinations.splice(index, 1)
    },

    removeOpenedCombination (combination) {
      if (this.touchedCombination === combination) {
        this.touchedCombination = null
      }

      const index = this.openCombinations.indexOf(combination)
      this.openCombinations.splice(index, 1)
    },

    toggleWaitingTile (tile) {
      if (this.waitingTile === tile) {
        this.waitingTile = null
      } else {
        this.waitingTile = tile
      }
    },

    toggleSpecialCase (specialCase) {
      if (this.specialCases.includes(specialCase)) {
        this.specialCases.splice(this.specialCases.indexOf(specialCase), 1)
      } else {
        this.specialCases.push(specialCase)
      }
    },

    touchCombination (combination) {
      if (this.touchedCombination === combination) {
        this.touchedCombination = null
      } else {
        this.touchedCombination = combination
      }
    },

    resetTouchedCombination () {
      this.touchedCombination = null
    },

    showPoints () {
      const winningCombination = this.concealedCombinations.filter(x => x.tiles.includes(this.waitingTile))[0]

      const hand = new Hand({
        concealedCombinations: this.concealedCombinations,
        openCombinations: this.openCombinations,
        roundWind: this.prevalentWind,
        seatWind: this.seatWind,
        winningType: this.winningType,
        nbDora: this.nbDora,
        winningCombinationIndex: this.concealedCombinations.indexOf(winningCombination),
        winningTileIndex: winningCombination.tiles.indexOf(this.waitingTile)
      })

      if (this.riichiType === 'normal' || this.riichiType === 'double') hand.yakus.push('riichi')
      if (this.riichiType === 'double') hand.yakus.push('double riichi')
      if (this.riichiIsIppatsu) hand.yakus.push('ippatsu')
      if (this.riichiIsOpen) hand.yakus.push('open riichi')

      if (this.specialCases.includes('rinshan')) hand.yakus.push('rinshan kaihou')
      if (this.specialCases.includes('chankan')) hand.yakus.push('chankan')

      if (this.specialCases.includes('firstTurn')) {
        if (this.seatWind === 'east' && this.winningType === 'tsumo') hand.yakus.push('tenhou')
        else if (this.seatWind !== 'east' && this.winningType === 'tsumo') hand.yakus.push('chiihou')
        else if (this.seatWind !== 'east' && this.winningType === 'ron') hand.yakus.push('renhou')
      }

      if (this.specialCases.includes('lastTile')) {
        if (this.winningType === 'tsumo') hand.yakus.push('haitei raoyue')
        else hand.yakus.push('houtei raoyui')
      }

      this.hand = hand

      this.scoreModal = true
    }
  }
}
</script>

<style>
/* ---
LAYOUT
--- */

.main-layout__infos {
  display: flex;
  flex-direction: column;
}

.main-layout__general-info {
  order: -1;
}

.main-layout__calculate-button button {
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 2.5rem;
}

.combinations-toolbar {
  display: flex;
  column-gap: calc(var(--gap-size) / 2);
  row-gap: calc(var(--gap-size) / 2);
  flex-wrap: wrap;
}

@media (min-width: 960px) {
  .main-layout__infos {
    flex-direction: row;
    padding-bottom: calc(var(--gap-size) * 2);
  }

  .main-layout__tiles-info {
    flex: 1;
    margin-right: calc(var(--gap-size) * 4);
  }

  .main-layout__general-info {
    min-width: 450px;
    order: 0;
  }
}

@media (max-width: 959px) {
  .main-layout__infos {
    padding-bottom: 50px;
  }

  .main-layout__calculate-button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: #43a047;
  }

  .main-layout__calculate-button button {
    border-radius: 0;
  }

  .combinations-toolbar .btn-group {
    width: 100%;
  }
}

/* ---
COMBINATIONS WRAPPER
--- */

.combinations-wrapper {
  background: rgba(255, 255, 255, 0.3);
  padding: var(--gap-size);
  min-height: 100px;
  max-height: 63vh;
  overflow-y: auto;
  border: 1px solid var(--dark-green);
}
.combinations-wrapper h3 {
  font-size: 1rem;
  line-height: 1rem;
  font-weight: bold;
  margin-bottom: var(--gap-size);
}
.combinations-wrapper .combination-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-size);
}

@media (min-width: 960px) {
  .combinations-wrapper {
    min-height: 440px;
  }
}
</style>
