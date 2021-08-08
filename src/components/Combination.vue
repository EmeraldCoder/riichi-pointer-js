<template>
  <div
    :class="{ 'combination--selected': selected || hover }"
    class="combination"
  >
    <div
      class="combination__tiles"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
    >
      <tile-component
        v-for="(tile, index) in combination.tiles"
        :key="'tile' + index"
        :tile="tile"
      />

      <div class="combination__hover-overlay">
        <button
          @click.stop="deleteCombination"
          @touchend.stop.prevent="deleteCombination"
        >
          <font-awesome-icon :icon="deleteIcon" />
        </button>
      </div>
    </div>

    <div v-if="waitable && !isKan">
      <div
        v-if="isChii"
        class="combination__waits"
      >
        <div
          v-for="(tile, index) in combination.tiles"
          :key="'wait.' + index"
        >
          <button
            :class="{ active: waitingTile === tile }"
            @click="$emit('selectAsWaitingTile', tile)"
          >
            Wait
          </button>
        </div>
      </div>
      <div
        v-else
        class="combination__waits"
      >
        <div>
          <button
            :class="{ active: combination.tiles.includes(waitingTile) }"
            @click="$emit('selectAsWaitingTile', combination.tiles[0])"
          >
            Wait
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Combination, Sequence, Quad } from '@/core/combination-classes'
import { Tile } from '@/core/tile-classes'
import TileComponent from '@/components/Tile.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ref, computed } from 'vue'

export default {
  components: {
    TileComponent,
    FontAwesomeIcon
  },

  props: {
    combination: {
      type: Combination,
      required: true
    },
    waitable: {
      type: Boolean,
      required: false,
      default: false
    },
    waitingTile: {
      type: Tile,
      required: false,
      default: null
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  emits: ['delete', 'touch', 'selectAsWaitingTile'],

  setup (props, { emit }) {
    const touching = ref(false)
    const hover = ref(false)

    return {
      deleteIcon: faTrash,
      isChii: computed(() => props.combination instanceof Sequence),
      isKan: computed(() => props.combination instanceof Quad),
      hover: hover,

      onTouchStart: () => { if (!touching.value) touching.value = true },
      onTouchMove: () => { if (touching.value) touching.value = false },
      onTouchEnd: e => {
        if (e.cancelable) {
          e.preventDefault()
          e.stopPropagation()
        }

        if (touching.value) {
          setTimeout(() => { emit('touch') }, 0)
          touching.value = false
        }
      },

      onMouseOver: () => {
        // doing a long touch trigger the mouse over event
        // this is why we need to check if the user is not using a touch (triggered by the onTouchStart)
        if (!touching.value && !hover.value) hover.value = true
      },
      onMouseOut: () => { if (hover.value) hover.value = false },

      deleteCombination: () => {
        setTimeout(() => { emit('delete') }, 0)
      }
    }
  }
}
</script>

<style>
  .combination {
    display: inline-block;
  }

  .combination__tiles {
    position: relative;
  }

  .combination__hover-overlay {
    position: absolute;
    display: none;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .combination--selected .combination__tiles .tile {
    opacity: 0.3;
  }
  .combination--selected .combination__hover-overlay {
    display: flex;
  }

  .combination__waits {
    text-align: center;
    margin-top: calc(var(--gap-size) / 2);
  }
  .combination__waits div {
    display: inline-block;
    width: 70px;
    text-align: center;
  }
</style>
