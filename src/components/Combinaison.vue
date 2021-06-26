<template>
  <div
    :class="{ 'combinaison--selected': selected || hover }"
    class="combinaison"
  >
    <div
      class="combinaison__tiles"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
    >
      <tile-component
        v-for="(tile, index) in combinaison.tiles"
        :key="'tile' + index"
        :tile="tile"
      />

      <div class="combinaison__hover-overlay">
        <button
          @click.stop="deleteCombinaison"
          @touchend.stop.prevent="deleteCombinaison"
        >
          <font-awesome-icon :icon="deleteIcon" />
        </button>
      </div>
    </div>

    <div v-if="waitable && !isKan">
      <div
        v-if="isChii"
        class="combinaison__waits"
      >
        <div
          v-for="(tile, index) in combinaison.tiles"
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
        class="combinaison__waits"
      >
        <div>
          <button
            :class="{ active: combinaison.tiles.includes(waitingTile) }"
            @click="$emit('selectAsWaitingTile', combinaison.tiles[0])"
          >
            Wait
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .combinaison {
    display: inline-block;
  }

  .combinaison__tiles {
    position: relative;
  }

  .combinaison__hover-overlay {
    position: absolute;
    display: none;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .combinaison--selected .combinaison__tiles .tile {
    opacity: 0.3;
  }
  .combinaison--selected .combinaison__hover-overlay {
    display: flex;
  }

  .combinaison__waits {
    text-align: center;
    margin-top: calc(var(--gap-size) / 2);
  }
  .combinaison__waits div {
    display: inline-block;
    width: 70px;
    text-align: center;
  }
</style>

<script>
import { Combinaison, Sequence, Quad } from '@/core/combinaison-classes'
import { Tile } from '@/core/tile-classes'
import TileComponent from '@/components/Tile.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    TileComponent,
    FontAwesomeIcon
  },

  props: {
    combinaison: {
      type: Combinaison,
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

  data () {
    return {
      hover: false,
      touching: false,
      deleteIcon: faTrash
    }
  },

  computed: {
    isChii () {
      return this.combinaison instanceof Sequence
    },

    isKan () {
      return this.combinaison instanceof Quad
    }
  },

  methods: {
    onTouchStart () {
      if (!this.touching) this.touching = true
    },
    onTouchMove () {
      if (this.touching) this.touching = false
    },
    onTouchEnd (e) {
      if (e.cancelable) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (this.touching) {
        setTimeout(() => {
          this.$emit('touch', this.combinaison)
        }, 0)

        this.touching = false
      }
    },

    onMouseOver () {
      // doing a long touch trigger the mouse over event
      // this is why we need to check if the user is not using a touch (triggered by the onTouchStart)
      if (!this.touching && !this.hover) this.hover = true
    },
    onMouseOut () {
      if (this.hover) this.hover = false
    },

    deleteCombinaison () {
      setTimeout(() => {
        this.$emit('delete', this.combinaison)
      }, 0)
    }
  }
}
</script>
