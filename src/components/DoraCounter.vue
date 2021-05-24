<template>
  <div class="dora-counter">
    <button
      :disabled="value <= 0"
      @click="decrement"
    >
      <font-awesome-icon :icon="decrementIcon" />
    </button>

    <span class="txt-2 txt-center">{{ value }}</span>

    <button @click="increment">
      <font-awesome-icon :icon="incrementIcon" />
    </button>
  </div>
</template>

<style>
  .dora-counter {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dora-counter button,
  .dora-counter span {
    width: 50px;
  }
</style>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    value: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      incrementIcon: faPlus,
      decrementIcon: faMinus
    }
  },

  methods: {
    increment () {
      this.$emit('input', this.value + 1)
    },

    decrement () {
      if (this.value > 0) {
        this.$emit('input', this.value - 1)
      }
    }
  }
}
</script>
