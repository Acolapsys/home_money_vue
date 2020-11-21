import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import dateFilter from '@/filters/date.filter'
import store from './store'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
