<template>
  <div
    :class="{ 'tile--hoverable': hoverable, 'tile--disabled': disabled }"
    class="tile"
  >
    <svg role="img"><use :xlink:href="publicPath + 'riichi-mahjong-tiles/svgstore.svg#' + svgStoreKey" /></svg>
  </div>
</template>

<script>
import { Tile } from '@/core/tile-classes'
import { computed } from 'vue'

export default {
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

  setup (props) {
    return {
      svgStoreKey: computed(() => getTileSvgStoreKey(props.tile)),
      publicPath: process.env.VUE_APP_PUBLIC_PATH
    }
  }
}

function getTileSvgStoreKey (tile) {
  if (tile.suit === 'character') {
    return `Man${tile.value}`
  } else if (tile.suit === 'bamboo') {
    return `Sou${tile.value}`
  } else if (tile.suit === 'dot') {
    return `Pin${tile.value}`
  } else if (tile.value === 'east') {
    return 'Ton'
  } else if (tile.value === 'south') {
    return 'Nan'
  } else if (tile.value === 'west') {
    return 'Shaa'
  } else if (tile.value === 'north') {
    return 'Pei'
  } else if (tile.value === 'white') {
    return 'Haku'
  } else if (tile.value === 'green') {
    return 'Hatsu'
  } else if (tile.value === 'red') {
    return 'Chun'
  }
  return null
}
</script>

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
