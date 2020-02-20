import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {
			username: 'holo',
			role: 'teacher'
		},
		isLoggedIn: true,
		token: ''
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
