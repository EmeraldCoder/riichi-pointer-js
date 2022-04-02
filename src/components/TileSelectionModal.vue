<template>
  <modal-base-component
    :open="open"
    title="Tile Selection"
    @close="$emit('close')"
  >
    <div>
      <div
        v-for="(suit, suitIndex) in tilesGroupedBySuit"
        :key="suitIndex"
        class="tile-suit"
      >
        <mahjong-tile-component
          v-for="(tile, tileIndex) in suit.tiles"
          :key="suitIndex + '.' + tileIndex"
          :tile="tile.tile"
          :hoverable="true"
          :disabled="tile.disabled"
          @click="selectTile(tile)"
        />
      </div>
    </div>
  </modal-base-component>
</template>

<script>
import ModalBaseComponent from '@/components/ModalBase.vue'
import MahjongTileComponent from '@/components/MahjongTile.vue'
import { computed } from 'vue'

export default {
  name: 'TileSelectionComponent',

  components: {
    ModalBaseComponent,
    MahjongTileComponent
  },

  props: {
    open: {
      type: Boolean,
      required: true
    },

    tiles: {
      type: Array,
      required: true
    }
  },

  emits: ['close', 'selectTile'],

  setup (props, { emit }) {
    return {
      tilesGroupedBySuit: computed(() => groupTilesBySuit(props.tiles)),

      selectTile: tile => {
        if (!tile.disabled) emit('selectTile', { suit: tile.tile.suit, value: tile.tile.value })
      }
    }
  }
}

function groupTilesBySuit (tiles) {
  return tiles.reduce((agg, tile) => {
    const suitIndex = agg.findIndex(x => x.suit === tile.tile.suit)

    if (suitIndex > -1) {
      agg[suitIndex].tiles.push(tile)
    } else {
      agg.push({ suit: tile.tile.suit, tiles: [tile] })
    }

    return agg
  }, [])
}
</script>

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
