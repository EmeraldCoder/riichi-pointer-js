<template>
  <div>
    <header>
      <div class="container">
        <h1>Your Hand</h1>

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

    <main class="container main-layout">
      <div class="main-layout__infos">
        <div class="main-layout__tiles-info">
          <h2><span>Combinaisons</span></h2>

          <div class="combinaisons-toolbar">
            <div class="btn-group">
              <button
                :class="{ active: addIsConcealed }"
                @click="addIsConcealed = true"
              >
                Concealed
              </button>
              <button
                :class="{ active: !addIsConcealed }"
                :disabled="!openedCombinaisonAvailable"
                @click="addIsConcealed = false"
              >
                Open
              </button>
            </div>

            <button
              :disabled="!addNormalCombinaisonAvailable"
              @click="addCombinaison('sequence')"
            >
              <font-awesome-icon :icon="plusIcon" />
              Sequence
            </button>
            <button
              :disabled="!addNormalCombinaisonAvailable"
              @click="addCombinaison('triplet')"
            >
              <font-awesome-icon :icon="plusIcon" />
              Triplet
            </button>
            <button
              :disabled="!addNormalCombinaisonAvailable"
              @click="addCombinaison('quad')"
            >
              <font-awesome-icon :icon="plusIcon" />
              Quad
            </button>
            <button
              :disabled="!addPairAvailable"
              @click="addCombinaison('pair')"
            >
              <font-awesome-icon :icon="plusIcon" />
              Pair
            </button>
            <button
              :disabled="!addOrphanAvailable"
              @click="addCombinaison('orphan')"
            >
              <font-awesome-icon :icon="plusIcon" />
              Orphan
            </button>
          </div>

          <div class="combinaisons-wrapper m-t">
            <h3 v-if="concealedCombinaisons.length > 0">
              Concealed
            </h3>
            <div
              v-if="concealedCombinaisons.length > 0"
              class="combinaison-group"
            >
              <combinaison-component
                v-for="(combinaison, index) in concealedCombinaisons"
                :key="'combinaison.concealed.' + index"
                :combinaison="combinaison"
                :waitable="true"
                :waiting-tile="waitingTile"
                :selected="combinaison === touchedCombinaison"
                @selectAsWaitingTile="toggleWaitingTile"
                @delete="removeConcealedCombinaison"
                @touch="touchCombinaison"
              />
            </div>

            <h3
              v-if="openCombinaisons.length > 0"
              :class="{ 'm-t-2': concealedCombinaisons.length > 0 }"
            >
              Open
            </h3>

            <div
              v-if="openCombinaisons.length > 0"
              class="combinaison-group"
            >
              <combinaison-component
                v-for="(combinaison, index) in openCombinaisons"
                :key="'combinaison.opened.' + index"
                :combinaison="combinaison"
                :selected="combinaison === touchedCombinaison"
                @delete="removeOpenedCombinaison"
                @touch="touchCombinaison"
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
    </main>

    <tile-selection-modal-component
      v-model="tileSelectionModal"
      :tiles="availableTilesForSelection"
      @selectTile="selectTile"
      @close="tileSelectionModal = false"
    />

    <score-modal-component
      v-if="hand != null"
      v-model="scoreModal"
      :hand="hand"
      :ruleset="ruleset"
      @close="scoreModal = false"
    />

    <ruleset-configuration-modal-component
      v-model="rulesetConfigurationModal"
      :ruleset="ruleset"
      @updateRuleset="updateRuleset"
      @close="rulesetConfigurationModal = false"
    />
  </div>
</template>

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

.combinaisons-toolbar {
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

  .combinaisons-toolbar .btn-group {
    width: 100%;
  }
}

/* ---
COMBINAISONS WRAPPER
--- */

.combinaisons-wrapper {
  background: rgba(255, 255, 255, 0.3);
  padding: var(--gap-size);
  min-height: 100px;
  max-height: 63vh;
  overflow-y: auto;
  border: 1px solid var(--dark-green);
}
.combinaisons-wrapper h3 {
  font-size: 1rem;
  line-height: 1rem;
  font-weight: bold;
  margin-bottom: var(--gap-size);
}
.combinaisons-wrapper .combinaison-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-size);
}

@media (min-width: 960px) {
  .combinaisons-wrapper {
    min-height: 440px;
  }
}
</style>

<script>
import Hand from './core/hand'
import { TileFactory, NumberedTile } from './core/tile-classes'
import { CombinaisonFactory, Orphan, Pair, Quad } from './core/combinaison-classes'
import { getRuleset, setRuleset } from './ruleset'
import CombinaisonComponent from './components/Combinaison.vue'
import TileSelectionModalComponent from './components/TileSelectionModal.vue'
import DoraCounterComponent from './components/DoraCounter.vue'
import ScoreModalComponent from './components/ScoreModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalculator, faCog, faPlus } from '@fortawesome/free-solid-svg-icons'
import RulesetConfigurationModalComponent from './components/RulesetConfigurationModal.vue'

export default {
  components: {
    CombinaisonComponent,
    TileSelectionModalComponent,
    DoraCounterComponent,
    ScoreModalComponent,
    FontAwesomeIcon,
    RulesetConfigurationModalComponent
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
      concealedCombinaisons: [], // list of the concealed combinaisons of the player
      openCombinaisons: [], // list of the open combinaisons of the player
      addIsConcealed: true, // indicate if the combinaison that the user is currently adding is concealed or not
      addType: null, // type of the combinaison that the user is currently adding (pair, triplet, quad, sequence)
      touchedCombinaison: null, // keep track of which combinaison the user touch on mobile
      ruleset: null, // define the ruleset used by the calculator
      hand: null, // the hand object generate by the user selection (null if the hand is not in a finished state)
      tileSelectionModal: false, // indicate if the tile selection modal is open
      scoreModal: false, // indicate if the score modal is open
      calculateIcon: faCalculator,
      settingsIcon: faCog,
      plusIcon: faPlus,
      rulesetConfigurationModal: false // indicate if the ruleset configuration modal is open
    }
  },

  computed: {
    canCalculatePoint () {
      const counts = this.combinaisonCounts
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

      this.concealedCombinaisons.concat(this.openCombinaisons).forEach(combinaison => {
        combinaison.tiles.forEach(tile => {
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

    combinaisonCounts () {
      let pair = 0
      let orphan = 0
      let quad = this.openCombinaisons.filter(x => x instanceof Quad).length
      let normal = this.openCombinaisons.length

      this.concealedCombinaisons.forEach(x => {
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
      const counts = this.combinaisonCounts
      return this.addIsConcealed && counts.normal === 0 && counts.pair <= 1 && counts.orphan < 12
    },

    addPairAvailable () {
      const counts = this.combinaisonCounts
      return this.addIsConcealed && (counts.pair === 0 || ((counts.normal + counts.orphan) === 0 && counts.pair < 7))
    },

    addNormalCombinaisonAvailable () {
      const counts = this.combinaisonCounts
      return counts.orphan === 0 && counts.pair <= 1 && counts.normal < 4
    },

    riichiAvailable () {
      return this.openCombinaisons.length === 0 && !this.specialCases.includes('firstTurn')
    },

    openedCombinaisonAvailable () {
      return this.riichiType == null && !this.specialCases.includes('firstTurn')
    },

    tenhouChiihouRenhouAvailable () {
      return this.openCombinaisons.length === 0 && this.riichiType == null && !this.specialCases.includes('lastTile')
    },

    chankanAvailable () {
      return !this.specialCases.includes('rinshan') && !this.specialCases.includes('lastTile') && this.winningType === 'ron'
    },

    rinshanAvailable () {
      return this.winningType === 'tsumo' && this.combinaisonCounts.quad > 0
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

      // if the user add a riichi and the add combinaison was on "opened", we need to reset
      // it to "concealed" because we can't have opened combinaison with riichi and the button
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

  created () {
    this.ruleset = getRuleset()
  },

  mounted () {
    // global event listener to unselect the touched combinaison on mobile
    // when the user touch anywhere on the screen
    document.addEventListener('touchend', () => {
      this.touchedCombinaison = null
    })
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
      this.concealedCombinaisons = []
      this.openCombinaisons = []
      this.addIsConcealed = true
      this.addType = null
      this.touchedCombinaison = null
      this.hand = null
    },

    addCombinaison (type) {
      this.addType = type
      this.tileSelectionModal = true
    },

    selectTile ({ suit, value }) {
      const firstCombinaisonTile = TileFactory.create(suit, value)
      const combinaison = CombinaisonFactory.create(this.addType, firstCombinaisonTile)

      if (this.addIsConcealed) {
        this.concealedCombinaisons.push(combinaison)
      } else {
        this.openCombinaisons.push(combinaison)
      }

      this.tileSelectionModal = false
    },

    removeConcealedCombinaison (combinaison) {
      if (this.touchedCombinaison === combinaison) {
        this.touchedCombinaison = null
      }

      if (combinaison.tiles.includes(this.waitingTile)) {
        this.waitingTile = null
      }

      const index = this.concealedCombinaisons.indexOf(combinaison)
      this.concealedCombinaisons.splice(index, 1)
    },

    removeOpenedCombinaison (combinaison) {
      if (this.touchedCombinaison === combinaison) {
        this.touchedCombinaison = null
      }

      const index = this.openCombinaisons.indexOf(combinaison)
      this.openCombinaisons.splice(index, 1)
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

    touchCombinaison (combinaison) {
      if (this.touchedCombinaison === combinaison) {
        this.touchedCombinaison = null
      } else {
        this.touchedCombinaison = combinaison
      }
    },

    updateRuleset (key, options) {
      setRuleset(key, options)
      this.ruleset = getRuleset()
    },

    showPoints () {
      const winningCombinaison = this.concealedCombinaisons.filter(x => x.tiles.includes(this.waitingTile))[0]

      const hand = new Hand({
        concealedCombinaisons: this.concealedCombinaisons,
        openCombinaisons: this.openCombinaisons,
        roundWind: this.prevalentWind,
        seatWind: this.seatWind,
        winningType: this.winningType,
        nbDora: this.nbDora,
        winningCombinaisonIndex: this.concealedCombinaisons.indexOf(winningCombinaison),
        winningTileIndex: winningCombinaison.tiles.indexOf(this.waitingTile)
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
