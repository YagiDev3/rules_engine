import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import draggable from 'vuedraggable'

Vue.use(Vuetify)
Vue.use(draggable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
