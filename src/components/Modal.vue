<template>
  <div
    ref="modal"
    :class="{ 'modal--opened': value }"
    class="modal"
  >
    <header>
      <div class="container">
        <button
          class="modal__back-button m-r"
          @click="$emit('close')"
        >
          <font-awesome-icon :icon="backIcon" />
        </button>

        <h1>{{ title }}</h1>

        <button
          class="modal__close-button"
          @click="$emit('close')"
        >
          <font-awesome-icon :icon="closeIcon" />
        </button>
      </div>
    </header>

    <main class="container">
      <slot />
    </main>
  </div>
</template>

<style>
.modal {
  display: none;
  position: relative;
}
.modal__back-button {
  display: none;
}
.modal__close-button {
  display: none;
}

body.modal-opened {
  overflow: hidden;
}

/* ---
Mobile Version (fullscreen modal)
--- */

@media (max-width: 959px) {
  .modal.modal--opened {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--light-green);
    z-index: 4;
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }
  .modal.modal--opened .modal__back-button {
    display: block;
  }
}

/* ---
Desktop Version (centered modal)
--- */

@media (min-width: 960px) {
  .modal header {
    position: sticky;
  }

  .modal main {
    padding-top: var(--gap-size);
  }

  body.modal-opened::after {
    content: "";
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }

  .modal.modal--opened {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    background: var(--light-green);
    z-index: 4;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 15px #000;
    max-height: calc(100vh - (var(--gap-size) * 2));
    overflow-y: auto;
  }
  .modal.modal--opened .modal__close-button {
    display: block;
  }
}
</style>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const modalHash = 'modal'

export default {
  components: {
    FontAwesomeIcon
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },

    title: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      closeIcon: faTimes,
      backIcon: faArrowLeft,
      keyUpEventListenerHandler: null,
      hashChangeEventListenerHandler: null
    }
  },

  watch: {
    value (newValue) {
      if (newValue) {
        this.initializeModal()
      } else {
        this.disposeModal()
      }
    }
  },

  beforeDestroy () {
    // ensure all resources are dispose
    this.disposeModal()
  },

  mounted () {
    if (this.value) this.initializeModal()
  },

  methods: {
    initializeModal () {
      // add a key event listener to close the modal if the user press the Escape key
      this.keyUpEventListenerHandler = document.addEventListener('keyup', e => {
        if (e.key === 'Escape' && this.value) {
          this.$emit('close')
        }
      })

      // add a hash to the url and watch for hashchange to capture browser back feature to close the modal
      location.hash = modalHash
      this.hashChangeEventListenerHandler = window.addEventListener('hashchange', e => {
        if (e.oldURL.endsWith(`#${modalHash}`) && !e.newURL.endsWith(`#${modalHash}`)) {
          e.preventDefault()
          this.$emit('close')
        }
      })

      // add the css class that will activate the overly on the body
      document.body.classList.add('modal-opened')

      // ensure that we are always at the top of the content when we open a modal
      setTimeout(() => { this.$refs.modal.scrollTo(0, 0) }, 0)
    },

    disposeModal () {
      // clear the event listener added during initialization
      if (this.keyUpEventListenerHandler) {
        document.removeEventListener(this.keyUpEventListenerHandler)
        delete this.keyUpEventListenerHandler
      }
      if (this.hashChangeEventListenerHandler) {
        window.removeEventListener(this.hashChangeEventListenerHandler)
        delete this.hashChangeEventListenerHandler
      }

      // remove the css class from the body to remove the overlay
      document.body.classList.remove('modal-opened')

      // remove the hash from the url and history if necessary
      if (location.hash === `#${modalHash}`) history.back()
    }
  }
}
</script>
