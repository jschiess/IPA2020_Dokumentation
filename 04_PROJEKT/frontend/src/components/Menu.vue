<template lang='pug'>
	div
		v-navigation-drawer.text--white( v-model="drawer" dark color="primary" app clipped temporary)
			v-list(  )
				v-list-item(link @click="drawer = !drawer"  )
					v-list-item-action()
						v-icon(large ) mdi-menu
					v-list-item-content 
						v-list-item-title Eingelogged als {{user.username }}
				v-divider
				v-list-item(link to="/" )
					v-list-item-action()
						v-icon(large ) mdi-view-dashboard-outline
					v-list-item-content 
						v-list-item-title Startseite
				v-list-item(link to="/inventory" )
					v-list-item-action()
						v-icon( large ) mdi-warehouse
					v-list-item-content 
						v-list-item-title Inventar
				v-list-item(link to="/lendings" )
					v-list-item-action()
						v-icon(large ) mdi-bookshelf
					v-list-item-content 
						v-list-item-title Ausleihliste
				v-list-item(link to="/newMaterial" v-if='user.role ==="teacher"')
					v-list-item-action()
						v-icon(large ) mdi-tray-full
					v-list-item-content 
						v-list-item-title Material erfassen
			template(v-slot:append)
				v-divider
				v-list(color="primary darken-1" subheader align-baseline )
					v-list-item(  link @click="logout")
						v-list-item-action()
							v-icon( ) mdi-logout
						v-list-item-content
							v-list-item-title Logout
		v-app-bar(color="primary darken-2" dark app clipped-left)
			v-app-bar-nav-icon(@click="drawer = !drawer")
			span Logged in as {{ user.username }}
			v-spacer
			v-btn(@click="logout" text) logout
				v-icon(right) mdi-logout
</template>

<script>


export default {
	name: "MainMenu",
	data() {
		return {
			drawer: false
		}
	},
	computed: {
		loggedIn() {return this.$store.state.loggedIn},
		user() {return this.$store.state.user},
	},
	methods: {
		logout() {this.$emit('logout')},
	}
};
</script> 
