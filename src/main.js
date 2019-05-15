// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { ToastPlugin, LoadingPlugin } from 'vux'
import FastClick from 'fastclick'

// icons
import './icons'

// 自定义指令
import './directives/title'

// less
import './assets/less/main.less'

FastClick.attach(document.body)

// vux
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

Vue.prototype.$urlUpload = process.env.urlUpload

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
