import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: "/login",
		name: "Login",
		component: () =>
			import( /* webpackChunkName: "login" */ "../views/Login.vue"),
	},
	{
		path: "/home",
		name: "Home",
		component: () =>
			import( /* webpackChunkName: "home" */ "../views/Home.vue"),
	},
	{
		path: "/about",
		name: "About",
		component: () =>
			import( /* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

const router = new VueRouter({
	//	mode: 'history',
	//	base: process.env.NODE_ENV === 'test' ? '/guanwang/' : '/',
	routes,
});

export default router;