<template>
  <div class="dora-counter">
    <button
      :disabled="modelValue <= 0"
      @click="decrement"
    >
      <font-awesome-icon :icon="decrementIcon" />
    </button>

    <span class="txt-2 txt-center">{{ modelValue }}</span>

    <button @click="increment">
      <font-awesome-icon :icon="incrementIcon" />
    </button>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    modelValue: {
      type: Number,
      required: true
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    return {
      incrementIcon: faPlus,
      decrementIcon: faMinus,

      increment: () => { emit('update:modelValue', props.modelValue + 1) },
      decrement: () => { emit('update:modelValue', props.modelValue - 1) }
    }
  }
}
</script>

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
