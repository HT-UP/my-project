import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: () =>
			import( /* webpackChunkName: "login" */ './views/login.vue'),
		meta: {
			title: '登录'
		}
	},
	//{
	//  path: '/about',
	//  name: 'About',
	//  // route level code-splitting
	//  // this generates a separate chunk (about.[hash].js) for this route
	//  // which is lazy-loaded when the route is visited.
	//  component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
	//}
]

const router = new VueRouter({
	//	mode: 'history',
	// base: '/redphone-platform',
	routes
})

export default router