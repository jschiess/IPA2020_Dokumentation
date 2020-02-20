import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('../views/Dashboard.vue')
	},
	{
		path: '/lager',
		name: 'Lager',
		component: () => import('../views/Lager.vue')
	},
	{
		path: '/lendings',
		name: 'NewMaterial',
		component: () => import('../views/Lendings.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
