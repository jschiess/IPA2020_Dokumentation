import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loggedIn: false,
		token: '',
		user: {}
	},
	plugins: [createPersistedState()],
	mutations: {
		setToken(state, payload) {
			state.token = payload
		},
		setLoggedIn(state, payload) {
			state.loggedIn = payload;
		},
		setUserData(state, payload) {
			state.user = payload
		}
	},
	actions: {
		clearData: function (context) {
			context.commit('setToken', '')
			context.commit('setLoggedIn', false)
			context.commit('setUserData', {})
		},
		login: function (context, data) {
			context.commit('setToken', data.token)
			context.commit('setUserData', data.userData)
			context.commit('setLoggedIn', true)
		}
	},
	modules: {
	},
})
