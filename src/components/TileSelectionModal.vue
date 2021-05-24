<template>
  <modal-component
    v-model="value"
    title="Tile Selection"
    @close="$emit('close')"
  >
    <div>
      <div
        v-for="(suit, suitIndex) in tilesGroupedBySuit"
        :key="suitIndex"
        class="tile-suit"
      >
        <tile-component
          v-for="(tile, tileIndex) in suit.tiles"
          :key="suitIndex + '.' + tileIndex"
          :tile="tile.tile"
          :hoverable="true"
          :disabled="tile.disabled"
          @click.native="selectTile(tile)"
        />
      </div>
    </div>
  </modal-component>
</template>

<style>
.tile-suit {
  white-space: nowrap;
  overflow-x: auto;
  margin-bottom: calc(var(--gap-size) / 2);
}
.tile-suit:last-child {
  margin-bottom: 0;
}
</style>

<script>
import ModalComponent from '@/components/Modal.vue'
import TileComponent from '@/components/Tile.vue'

export default {
  name: 'TileSelectionComponent',

  components: {
    ModalComponent,
    TileComponent
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },

    tiles: {
      type: Array,
      required: true
    }
  },

  computed: {
    tilesGroupedBySuit () {
      return this.tiles.reduce((agg, tile) => {
        const suitIndex = agg.findIndex(x => x.suit === tile.tile.suit)

        if (suitIndex > -1) {
          agg[suitIndex].tiles.push(tile)
        } else {
          agg.push({ suit: tile.tile.suit, tiles: [tile] })
        }

        return agg
      }, [])
    }
  },

  methods: {
    selectTile (tile) {
      if (!tile.disabled) {
        this.$emit('selectTile', { suit: tile.tile.suit, value: tile.tile.value })
      }
    }
  }
}
</script>
