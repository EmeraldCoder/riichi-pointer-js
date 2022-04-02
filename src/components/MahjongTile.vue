<template>
  <div
    :class="{ 'tile--hoverable': hoverable, 'tile--disabled': disabled }"
    class="tile"
  >
    <i :class="`tile-icon ${iconSpriteCssClass}`" />
  </div>
</template>

<script>
import { Tile } from '@/core/tile-classes'
import { computed } from 'vue'
import '../assets/tile-icons/sprite.css'

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
      iconSpriteCssClass: computed(() => getTileIconSpriteCssClass(props.tile))
    }
  }
}

function getTileIconSpriteCssClass (tile) {
  if (tile.suit === 'character') return `man-${tile.value}`
  else if (tile.suit === 'bamboo') return `sou-${tile.value}`
  else if (tile.suit === 'dot') return `pin-${tile.value}`
  else if (tile.value === 'east') return 'ton'
  else if (tile.value === 'south') return 'nan'
  else if (tile.value === 'west') return 'shaa'
  else if (tile.value === 'north') return 'pei'
  else if (tile.value === 'red') return 'chun'
  else if (tile.value === 'green') return 'hatsu'
  else if (tile.value === 'white') return 'haku'
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
