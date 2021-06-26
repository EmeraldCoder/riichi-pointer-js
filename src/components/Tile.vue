<template>
  <div
    :class="{ 'tile--hoverable': hoverable, 'tile--disabled': disabled }"
    class="tile"
  >
    <svg role="img"><use :xlink:href="publicPath + 'riichi-mahjong-tiles/svgstore.svg#' + tileSvgStoreKey" /></svg>
  </div>
</template>

<style>
  .tile {
    display: inline-block;
    background: #fff;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid var(--dark-green);
  }

  .tile svg {
    width: 58px;
    height: calc(58px * (400/300));
    vertical-align: middle;
  }

  .tile--disabled {
    opacity: 0.3;
  }

  @media(hover: hover) and (pointer: fine) {
    .tile--hoverable:not(.tile--disabled):hover {
      cursor: pointer;
      position: relative;
      border-color: var(--orange-hover);
    }
    .tile--hoverable:not(.tile--disabled):hover::after {
      content: '';
      background: var(--orange-hover);
      z-index: 1;
      position: absolute;
      top: -1px;
      left: -1px;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      opacity: 0.5;
      border-radius: 5px;
    }
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
    hoverable: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      publicPath: process.env.VUE_APP_PUBLIC_PATH
    }
  },

  computed: {
    tileSvgStoreKey () {
      if (this.tile.suit === 'character') {
        return `Man${this.tile.value}`
      } else if (this.tile.suit === 'bamboo') {
        return `Sou${this.tile.value}`
      } else if (this.tile.suit === 'dot') {
        return `Pin${this.tile.value}`
      } else if (this.tile.value === 'east') {
        return 'Ton'
      } else if (this.tile.value === 'south') {
        return 'Nan'
      } else if (this.tile.value === 'west') {
        return 'Shaa'
      } else if (this.tile.value === 'north') {
        return 'Pei'
      } else if (this.tile.value === 'white') {
        return 'Haku'
      } else if (this.tile.value === 'green') {
        return 'Hatsu'
      } else if (this.tile.value === 'red') {
        return 'Chun'
      }
      return null
    }
  }
}
</script>
