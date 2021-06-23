import Vue from 'vue'
import App from './App.vue'
import './assets/style.css'
import i18n from './i18n'

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#App')
