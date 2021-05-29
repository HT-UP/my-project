import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import { request } from './request/app'
import md5 from 'js-md5'
import qs from 'qs'

Vue.prototype.$getAjax = request.getAjax;
Vue.prototype.$postAjax = request.postAjax;

Vue.config.productionTip = false

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
