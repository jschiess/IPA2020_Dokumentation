import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

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

export default router
