import '@babel/polyfill';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
	Input,
	Form,
    FormItem,
	Button,
	
} from 'element-ui';

import {message} from './assets/js/message';

Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);

Vue.prototype.$message = message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
