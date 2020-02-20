<template lang='pug'>
	v-app
		Menu
		v-content
			router-view( v-on:login="login" v-on:message="message")
		v-snackbar( top v-for="n in snacks" :key='snacks.indexOf(n)' v-model="snacks" :timeout='n.timeout' :color='n.type' ) {{ n.text }}
			v-btn( @click="snacks.splice(snacks.indexOf(n)), 1" dark text) close
</template>

<script>

import Menu from './components/Menu.vue'
export default {
	name: "Home",
	components: {
		Menu
	},
	data() {
		return {
			snacks: [],
		};
	},
	computed: {
		loggedIn() {return this.$store.state.loggedIn},
		user() {return this.$store.state.user},
	},
	methods: {
		message(message) {
			this.snacks = (!this.snacks) ? [] : this.snacks
			this.snacks.push(message);
		},
		login() {
			this.message({
				type: "success",
				text: "logged in success",
				timeout: 3000
			});
		},
		logout() {
			this.$store.dispatch('clearData')
			this.message({
				type: "success",
				text: "logged out",
				timeout: 2000
			});
			this.$router.push("/");

		}
	}
};
</script> 
<style>

*{
	font: 'Roboto 18pt'

}
</style>