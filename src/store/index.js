import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token:'',
	},
	mutations: {
		getToken(state,token) {
      state.token = token;
      localStorage.setItem('Authorization', token);
    }
	},
	actions: {

	},
	modules: {

	},
});