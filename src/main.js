// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.config.productionTip = false

Vue.use(VueFire)
var config = {
  apiKey: 'AIzaSyBe46_RmTSC5Zv4ARaLUaB_AagS58qxVMs',
  authDomain: 'welcome-21522.firebaseapp.com',
  databaseURL: 'https://welcome-21522.firebaseio.com',
  projectId: 'welcome-21522',
  storageBucket: 'welcome-21522.appspot.com',
  messagingSenderId: '641835008464'
}
firebase.initializeApp(config)

export const auth = firebase.auth()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
