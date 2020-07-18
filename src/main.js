import Vue from 'vue'
import App from './App.vue'
import Vr from 'vue-resource'

Vue.use(Vr);

new Vue({
  el: '#app',
  render: h => h(App)
})
