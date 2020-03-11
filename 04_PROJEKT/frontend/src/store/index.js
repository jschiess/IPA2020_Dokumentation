// import packages
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';



Vue.use(Vuex)
import axios from "@/api";

export default new Vuex.Store({
	state: {
		loggedIn: false,
		token: '',
		user: {}
	},
	plugins: [createPersistedState()],
	mutations: {
		setToken(state, payload) {
			state.token = payload;
		},
		setLoggedIn(state, payload) {
			state.loggedIn = payload;
		},
		setUserData(state, payload) {
			state.user = payload;
		}
	},
	getters: {
		isTeacher: state => {
			console.log(state);

			return (state.user.role === 'teacher') ? true : false;
		}
	},
	actions: {
		// clears the data out of the state
		clearData: function (context) {
			context.commit('setToken', '')
			context.commit('setLoggedIn', false)
			context.commit('setUserData', {})
		},
		login: async function (context, data) {

			try {

				// send request to /login
				var response = await axios().post("/login", data);

				// get token from response.data
				var token = response.data.auth.split(" ")[1];
				var userData = response.data.tokenData


				this.$router.push("/");
			} catch (error) {
				console.error(error);
			}

			context.commit('setToken', token)
			context.commit('setUserData', userData)
			context.commit('setLoggedIn', true)
		}
	},
	modules: {
	},
})
