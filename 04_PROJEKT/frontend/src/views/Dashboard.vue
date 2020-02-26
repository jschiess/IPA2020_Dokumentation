<template lang='pug'>
	v-content
		v-container(fill-height )
			v-row(justify='center' align='center')
				v-col(cols='12')
					v-row(md='12')
						v-card(md='12' flat )
							div.d-flex.flex-no-wrap.justify-space-between
								div
									v-avatar( class="ma-6" size="280" tile)
										v-img(contain height="auto"  :src="require('../assets/tflogo.jpg')")
								v-card-title(color="lighten-2" )
									h1.grey--text Hallo {{ user.username }}
					v-divider
					v-row 
						v-col
							v-card.white--text.py-12(link to='/inventory' color="purple darken-2" shaped hover)
								v-card-title 
									v-icon(left x-large dark) mdi-warehouse
									h1 Lager
								v-spacer
								v-card-subtitle.white--text(v-if='user.role === "teacher"') Einsicht auf alle Items. Materialen bearbeiten, löschen, Ausleihungen machen
								v-card-subtitle.white--text(v-else) Einsicht auf alle Items
						v-col(v-if='user.role == "teacher"')
							v-card.white--text.py-12( link to='/newMaterial' color="green darken-2" shaped hover )
								v-card-title 
									v-icon(left x-large dark) mdi-tray-full
									h1 Erfassen
								v-spacer
								v-card-text.white--text Material oder klassen erfassen
						v-col
							v-card.white--text.py-12(link to="/Lendings"  color="yellow darken-4 " shaped hover)
								v-card-title
									v-icon(left x-large dark) mdi-bookshelf
									h1 Ausleihliste
								v-spacer
								v-card-text.white--text Einsicht auf ausgeliehenes Material. Rückgaben machen
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {

		}
	},
	computed: {
		loggedIn() {return this.$store.state.loggedIn},
		user() {return this.$store.state.user},
	},
}
</script>
