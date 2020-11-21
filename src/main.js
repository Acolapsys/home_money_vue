import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import dateFilter from '@/filters/date.filter'
import store from './store'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuelidate)
Vue.use(firebase)
Vue.config.productionTip = false
Vue.filter('date', dateFilter)

const firebaseConfig = {
  apiKey: 'AIzaSyCiUmoyooJI2cZO9kol6l7BU8ZVtMjbO3I',
  authDomain: 'home-money-587c5.firebaseapp.com',
  databaseURL: 'https://home-money-587c5.firebaseio.com',
  projectId: 'home-money-587c5',
  storageBucket: 'home-money-587c5.appspot.com',
  messagingSenderId: '954164911793',
  appId: '1:954164911793:web:345ab7640987df169b0c90'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
