// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './page/Home'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import Info from './page/Info'
import Detail from './page/Good_Detail'
import Qrcode from './page/Qrcode'
import { ToastPlugin } from 'vux'

Es6Promise.polyfill()
Vue.use(VueRouter)
Vue.use(ToastPlugin)
const routes = [{
  path: '/',
  component: Home
}, {
  path: '/info',
  component: Info
}, {
  path: '/detail',
  component: Detail
}, {
  path: '/qr',
  component: Qrcode
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.wm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
