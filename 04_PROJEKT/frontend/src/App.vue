<template lang='pug'>
	v-app
		MainMenu(v-on:logout='logout')
		v-content
			router-view( v-on:message="message")
		v-snackbar( top v-for="snack in snacks" :key='snacks.indexOf(snack)' v-model="snacks" :timeout='snack.timeout' :color='snack.type' ) {{ snack.text }}
			v-btn( @click="snacks.splice(snacks.indexOf(n)), 1" dark text) close
</template>

<script>

import MainMenu from './components/Menu.vue'

export default {
	name: "Home",
	components: {
		MainMenu
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
		logout() {
			this.$store.dispatch('clearData')
			this.message({
				type: "success",
				text: "logged out",
				timeout: 2000
			});
			this.$router.push("/login");

		}
	}
};
</script> 
<style>

*{
	font: 'Roboto 18pt'

}
</style>