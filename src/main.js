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
	Loading,
	MessageBox,
	Table,
	Pagination,
	TableColumn
} from 'element-ui';

import {message} from './assets/js/message';

Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(TableColumn);
Vue.use(Loading.directive);

Vue.prototype.$message = message;

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
