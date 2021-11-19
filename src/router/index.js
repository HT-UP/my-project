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
		meta: {
			title: '登录'
		}
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

// 全局导航钩子
router.beforeEach((to, from, next) => {
	document.title = '××管理系统 - ' + `${to.meta.title}`;
	next();
//	if(to.path == '/login') {
//		localStorage.clear()
//		next();
//	} else {
//		if(localStorage.getItem('Authorization') == null || localStorage.getItem('Authorization') == '') {
//			message.error("用户登录失效，请重新登录");
//			next('/login');
//		} else {
//			next();
//		}
//	}
});

export default router;