<template>
  <div :class="{ tile, 'tile--selected': selected }">
    <img :src="'/img/' + tile.suit + tile.value + '.png'">
  </div>
</template>

<style>
  .tile {
    width: 3vw;
    display: inline-block;
  }
  .tile img {
    display: block;
    width: 100%;
    height: auto;
  }
  .tile--selected {
    opacity: 0.5;
  }
</style>

<script>
import { Tile } from '@/core/tile-classes'

export default {
  name: 'TileComponent',

  props: {
    tile: {
      type: Tile,
      required: true
    },
    selected: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>
