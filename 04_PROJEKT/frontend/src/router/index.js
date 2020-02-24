import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/',
		name: 'dashboard',
		component: () => import('../views/Dashboard.vue')
	},
	{
		path: '/inventory',
		name: 'Inventory',
		component: () => import('../views/Inventory.vue')
	},
	{
		path: '/lendings',
		name: 'lendings',
		component: () => import('../views/Lendings.vue')
	},
	{
		path: '/newMaterial',
		name: 'newMaterial',
		component: () => import('../views/NewMaterial.vue')
	},
]




const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	const publicPages = ['/login']
	const authRequired = !publicPages.includes(to.path);

	const loggedIn = store.state.token

	if (authRequired && !loggedIn) {
		return next('/login')
	}
	next();
})

export default router
