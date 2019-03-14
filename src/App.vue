<template>
  <div>
    <div
      id="left-menu"
      :class="{ open: leftMenuIsOpen, close: !leftMenuIsOpen }">
      <nav>
        <a
          href="#"
          @click="reset">Reset</a>
      </nav>
      <a
        id="left-menu-slider"
        @click="toggleLeftMenu"><span id="left-menu-slider-icon">{{ leftMenuIsOpen ? '&lt;' : '&gt;' }}</span></a>
    </div>

    <div id="layout">
      <div style="width: 100%;">
        <img
          src="img/logo.png"
          style="height: 40px; display: block; float: left; margin-right: 40px;">
        <h1 style="font-size: 30px; line-height: 40px;"><span>{{ title }}</span></h1>
        <div style="clear: both;"/>
      </div>

      <div
        v-if="currentView === 'TileSelection'"
        id="select-tile-view">
        <div v-if="addType !== 'chii'">
          <img
            src="img/dragongreen.png"
            @click="selectTile('dragon', 'green')">
          <img
            src="img/dragonred.png"
            @click="selectTile('dragon', 'red')">
          <img
            src="img/dragonwhite.png"
            @click="selectTile('dragon', 'white')">
        </div>
        <div v-if="addType !== 'chii'">
          <img
            src="img/windeast.png"
            @click="selectTile('wind', 'east')">
          <img
            src="img/windsouth.png"
            @click="selectTile('wind', 'south')">
          <img
            src="img/windwest.png"
            @click="selectTile('wind', 'west')">
          <img
            src="img/windnorth.png"
            @click="selectTile('wind', 'north')">
        </div>
        <div>
          <img
            src="img/bamboo1.png"
            @click="selectTile('bamboo', 1)">
          <img
            src="img/bamboo2.png"
            @click="selectTile('bamboo', 2)">
          <img
            src="img/bamboo3.png"
            @click="selectTile('bamboo', 3)">
          <img
            src="img/bamboo4.png"
            @click="selectTile('bamboo', 4)">
          <img
            src="img/bamboo5.png"
            @click="selectTile('bamboo', 5)">
          <img
            src="img/bamboo6.png"
            @click="selectTile('bamboo', 6)">
          <img
            src="img/bamboo7.png"
            @click="selectTile('bamboo', 7)">
          <img
            v-if="addType !== 'chii'"
            src="img/bamboo8.png"
            @click="selectTile('bamboo', 8)">
          <img
            v-if="addType !== 'chii'"
            src="img/bamboo9.png"
            @click="selectTile('bamboo', 9)">
        </div>
        <div>
          <img
            src="img/character1.png"
            @click="selectTile('character', 1)">
          <img
            src="img/character2.png"
            @click="selectTile('character', 2)">
          <img
            src="img/character3.png"
            @click="selectTile('character', 3)">
          <img
            src="img/character4.png"
            @click="selectTile('character', 4)">
          <img
            src="img/character5.png"
            @click="selectTile('character', 5)">
          <img
            src="img/character6.png"
            @click="selectTile('character', 6)">
          <img
            src="img/character7.png"
            @click="selectTile('character', 7)">
          <img
            v-if="addType !== 'chii'"
            src="img/character8.png"
            @click="selectTile('character', 8)">
          <img
            v-if="addType !== 'chii'"
            src="img/character9.png"
            @click="selectTile('character', 9)">
        </div>
        <div>
          <img
            src="img/dot1.png"
            @click="selectTile('dot', 1)">
          <img
            src="img/dot2.png"
            @click="selectTile('dot', 2)">
          <img
            src="img/dot3.png"
            @click="selectTile('dot', 3)">
          <img
            src="img/dot4.png"
            @click="selectTile('dot', 4)">
          <img
            src="img/dot5.png"
            @click="selectTile('dot', 5)">
          <img
            src="img/dot6.png"
            @click="selectTile('dot', 6)">
          <img
            src="img/dot7.png"
            @click="selectTile('dot', 7)">
          <img
            v-if="addType !== 'chii'"
            src="img/dot8.png"
            @click="selectTile('dot', 8)">
          <img
            v-if="addType !== 'chii'"
            src="img/dot9.png"
            @click="selectTile('dot', 9)">
        </div>
      </div>

      <div v-if="currentView === 'Main'">
        <div style="margin: 10px 0;">
          <fieldset>
            <legend>Winning type</legend>

            <div style="line-height: 14px; float: left; max-width: 30%; overflow: hidden; margin-right: 5%;">
              <span class="txt1">Winning By<br></span>
              <select
                v-model="winningType"
                style="width: 100%">
                <option value="tsumo">Tsumo</option>
                <option value="ron">Ron</option>
              </select>
            </div>
            <div style="line-height: 14px;float: left; max-width: 30%; overflow: hidden; margin-right: 5%;">
              <span class="txt1">Complete By<br></span>
              <select
                v-model="winningSecondaryType"
                style="width: 100%">
                <option/>
                <option value="haitei raoyue">Haitei Raoyue</option>
                <option value="houtei raoyui">Houtei Raoyui</option>
                <option value="rinshan kaihou">Rinshan Kaihou</option>
                <option value="chan kan">Chan Kan</option>
              </select>
            </div>
            <div style="line-height: 14px;float: left; max-width: 30%; overflow: hidden;">
              <span class="txt1">Riichi<br></span>
              <select
                v-model="winningRiichiType"
                style="width: 100%">
                <option/>
                <option value="riichi">Riichi</option>
                <option value="riichi ippatsu">Riichi Ippatsu</option>
                <option value="double riichi">Double Riichi</option>
                <option value="double riichi ippatsu">Double Riichi Ippatsu</option>
              </select>
            </div>
          </fieldset>
        </div>

        <div style="margin: 10px 0;">
          <fieldset>
            <legend>Winds</legend>

            <div style="line-height: 14px; float: left; max-width: 40%; overflow: hidden; margin-right: 5%;">
              <span class="txt1">Prevalent: <br></span>
              <select v-model="prevalentWind">
                <option value="east">East</option>
                <option value="south">South</option>
                <option value="west">West</option>
                <option value="north">North</option>
              </select>
            </div>

            <div style="line-height: 14px; float: left; max-width: 40%; overflow: hidden;">
              <span class="txt1">Seat: <br></span>
              <select v-model="seatWind">
                <option value="east">East</option>
                <option value="south">South</option>
                <option value="west">West</option>
                <option value="north">North</option>
              </select>
            </div>
          </fieldset>
        </div>

        <div style="margin: 10px 0;">
          <div style="float: left; width: 50%;">
            <fieldset>
              <legend>Dora</legend>
              <div style="margin-bottom: 10px;">
                <input
                  type="button"
                  value="+ Dora"
                  @click="addDora(false)">
              </div>
              <div
                id="Dora"
                class="box box-dora">
                <span
                  v-for="(dora, index) in doraTiles"
                  :key="index"
                  :data-index="index">
                  <img
                    :src="'img/' + dora.suit + dora.value + '.png'"
                    @click.right.prevent="removeDora(index, false)">
                </span>
              </div>
            </fieldset>
          </div>

          <div style="float: left; width: 50%;">
            <fieldset>
              <legend>Ura-Dora</legend>
              <div style="margin-bottom: 10px;">
                <input
                  type="button"
                  value="+ Ura-Dora"
                  @click="addDora(true)">
              </div>
              <div
                id="UraDora"
                class="box box-dora">
                <span
                  v-for="(dora, index) in uraDoraTiles"
                  :key="index"
                  :data-index="index">
                  <img
                    :src="'img/' + dora.suit + dora.value + '.png'"
                    @click.right.prevent="removeDora(index, true)">
                </span>
              </div>
            </fieldset>
          </div>

          <div style="clear: both;"/>
        </div>

        <div style="margin: 10px 0;">
          <fieldset>
            <legend>Concealed combinaisons</legend>
            <div v-if="!handIsFinish">
              <input
                type="button"
                value="+ Pair"
                @click="add(true, 'pair')">
              <input
                type="button"
                value="+ Pon"
                @click="add(true, 'pon')">
              <input
                type="button"
                value="+ Kan"
                @click="add(true, 'kan')">
              <input
                type="button"
                value="+ Chii"
                @click="add(true, 'chii')">
            </div>
            <div
              id="ConcealedCombinaison"
              class="box box-combinaison"
              style="margin-top: 10px;">
              <template v-for="(combinaison, combinaisonIndex) in concealedCombinaisons">
                <span
                  v-for="(tile, index) in combinaison.tiles"
                  :key="'concealCombinaison.' + combinaisonIndex + '.' + index"
                  :class="{ waiting: winningTile === tile, last: index === combinaison.tiles.length - 1 }"
                  @click.right.prevent="remove(combinaisonIndex, false)"
                  @click.left="setWinningTile(tile)"
                >
                  <img :src="'img/' + tile.suit + tile.value + '.png'">
                </span>
              </template>
            </div>
          </fieldset>
        </div>

        <div style="margin: 10px 0;">
          <fieldset>
            <legend>Open combinaisons</legend>
            <div v-if="!handIsFinish">
              <input
                type="button"
                value="+ Pon"
                @click="add(false, 'pon')">
              <input
                type="button"
                value="+ Kan"
                @click="add(false, 'kan')">
              <input
                type="button"
                value="+ Chii"
                @click="add(false, 'chii')">
            </div>
            <div
              id="OpenCombinaison"
              class="box box-combinaison"
              style="margin-top: 10px;">
              <template v-for="(combinaison, combinaisonIndex) in openCombinaisons">
                <span
                  v-for="(tile, index) in combinaison.tiles"
                  :key="'openCombinaison.' + combinaisonIndex + '.' + index"
                  :class="{ waiting: winningTile === tile, last: index === combinaison.tiles.length - 1 }"
                  @click.right.prevent="remove(combinaisonIndex, true)"
                  @click.left="setWinningTile(tile)"
                >
                  <img :src="'img/' + tile.suit + tile.value + '.png'">
                </span>
              </template>
            </div>
          </fieldset>
        </div>

        <div>
          <input
            v-if="handIsFinish"
            type="button"
            value="Calculate hand points"
            @click="showPoints">
        </div>
      </div>

      <div v-if="currentView === 'Result'">
        <div style="margin-bottom: 20px">
          <input
            type="button"
            value="back to your hand"
            @click="returnToMain">
        </div>
        <div style="margin: 20px 0;">
          <score-component
            :hand="hand"
            :ruleset="ruleset" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Hand } from './core/hand-classes'
import { TileFactory } from './core/tile-classes'
import { CombinaisonFactory } from './core/combinaison-classes'
import { DefaultRuleset } from './core/ruleset-classes'
import ScoreComponent from './components/Score.vue'

export default {
  components: {
    ScoreComponent
  },

  data () {
    return {
      title: 'Your hand', // Title of the current active view on the interface
      currentView: 'Main', // Id of the current active view on the interface (Main, TileSuitSelection, TileValueSelection, Result)
      prevalentWind: 'east', // name of the wind prevalent for the round (east, south, west, north)
      seatWind: 'east', // name of the wind of the player seat (east, south, west, north)
      winningType: 'tsumo', // indicate if the player won with a self-draw or discard (tsumo, ron)
      winningSecondaryType: '', // indicate if the player won with a particular circonstance (haitei raoyue, houtei raoyui, rinshan kaihou, chan kan)
      winningRiichiType: '', // indicate if the player won with riichi circonstance (riichi / riichi ippatsu / double riichi / double riichi ippatsu)
      doraTiles: [], // list of the dora tiles
      uraDoraTiles: [], // list of the ura-dora tiles
      winningTile: null, // winning tile selected by the user
      concealedCombinaisons: [], // list of the concealed combinaisons of the player
      openCombinaisons: [], // list of the open combinaisons of the player
      addForDora: null, // ndicate if the adding process is for dora or not (ex. : combinaison)
      addIsConcealed: null, // indicate if the combinaison that the user is currently adding is concealed or not
      addType: null, // type of the combinaison that the user is currently adding (pair, pon, kan, chii)
      addIsUraDora: null, // indicate if the dora that the user is currently adding is ura-dora or not
      leftMenuIsOpen: false,
      ruleset: new DefaultRuleset(),
      hand: null
    }
  },

  computed: {
    // computed property that indicate if the player hand is in a finish state (complete)
    handIsFinish () {
      const hand = new Hand(this.concealedCombinaisons, this.openCombinaisons)
      return hand.isFinish()
    }
  },

  methods: {
    reset () {
      this.title = 'Your hand'
      this.currentView = 'Main'
      this.prevalentWind = 'east'
      this.seatWind = 'east'
      this.winningType = 'tsumo'
      this.winningSecondaryType = ''
      this.winningRiichiType = ''
      this.doraTiles = []
      this.uraDoraTiles = []
      this.winningTile = null
      this.concealedCombinaisons = []
      this.openCombinaisons = []
      this.addForDora = null
      this.addIsConcealed = null
      this.addType = null
      this.addIsUraDora = null
    },

    /**
     * action to begin the process of adding a new dora
     * this open the TileSelection view on the interface
     *
     * @param bool isUraDora indicate if the dora is an ura-dora (under the dora for riichi win)
     */
    addDora (isUraDora) {
      this.addForDora = true
      this.addIsUraDora = isUraDora
      this.currentView = 'TileSelection'
      this.title = 'Select a tile'
    },

    removeDora (index, isUraDora) {
      if (confirm('Do you want to delete this dora?')) {
        if (isUraDora) {
          this.uraDoraTiles.splice(index, 1)
        } else {
          this.doraTiles.splice(index, 1)
        }
      }
    },

    /**
     * action to begin the process of adding a new combinaison
     * this open the TileSelection view on the interface
     *
     * @param bool isConcealed indicate if the new combinaison will be concealed or not
     * @param string type specify the combinaison type that will be add (pair, pon, kan, chii)
     */
    add (isConcealed, type) {
      this.addForDora = false
      this.addIsConcealed = isConcealed
      this.addType = type
      this.currentView = 'TileSelection'
      this.title = 'Select a tile'
    },

    remove (index, isOpen) {
      if (confirm('Do you want to delete this combinaison?')) {
        this.winningTile = null

        if (isOpen) {
          this.openCombinaisons.splice(index, 1)
        } else {
          this.concealedCombinaisons.splice(index, 1)
        }
      }
    },

    /**
     * action when the user select the tile value of the combinaison during the process of adding a new combinaison
     * this will finalize the adding process and return on the Main view on the interface
     *
     * @param string value specify the tile value of the combinaison that will be add ('red', 'east', 1, 9, ...)
     */
    selectTile (suit, value) {
      if (this.addForDora) {
        const tile = TileFactory.create(suit, value)
        if (this.addIsUraDora) {
          this.uraDoraTiles.push(tile)
        } else {
          this.doraTiles.push(tile)
        }
      } else {
        const firstCombinaisonTile = TileFactory.create(suit, value)
        const combinaison = CombinaisonFactory.create(this.addType, firstCombinaisonTile)

        if (this.addIsConcealed) {
          this.concealedCombinaisons.push(combinaison)
        } else {
          this.openCombinaisons.push(combinaison)
        }
      }

      this.addForDora = null
      this.addIsConcealed = null
      this.addType = null
      this.addIsUraDora = null
      this.currentView = 'Main'
      this.title = 'Your hand'
    },

    /**
     * action when the user select the winning tile
     *
     * @param object tile
     */
    setWinningTile (tile) {
      if (this.winningTile === tile) {
        this.winningTile = null
      } else {
        this.winningTile = tile
      }
    },

    /**
     * action when the user want to return to the Main view on the interface
     */
    returnToMain () {
      this.currentView = 'Main'
      this.title = 'Your hand'
    },

    /**
     * action when the user want to calculate the points of his hand
     * this will calculate the hand values
     * and this will open the Result view on the interface
    */
    showPoints () {
      if (this.winningTile === null) {
        alert('You must select your waiting tile')
        return
      }

      const combinaisons = [].concat(this.concealedCombinaisons, this.openCombinaisons)
      const winningCombinaison = combinaisons.filter(x => x.tiles.indexOf(this.winningTile) > -1)[0]

      const hand = new Hand(
        this.concealedCombinaisons,
        this.openCombinaisons,
        this.seatWind,
        this.prevalentWind,
        combinaisons.indexOf(winningCombinaison),
        winningCombinaison.tiles.indexOf(this.winningTile),
        this.winningType,
        this.winningSecondaryType,
        this.doraTiles,
        this.uraDoraTiles
      )

      hand.isRiichi = this.winningRiichiType !== ''
      hand.isDoubleRiichi = this.winningRiichiType === 'double riichi' || this.winningRiichiType === 'double riichi ippatsu'
      hand.isIppatsu = this.winningRiichiType === 'riichi ippatsu' || this.winningRiichiType === 'double riichi ippatsu'

      this.hand = hand
      this.currentView = 'Result'
      this.title = 'Hand points'
    },

    toggleLeftMenu () {
      this.leftMenuIsOpen = !this.leftMenuIsOpen
    }
  }
}
</script>
