<template lang='pug'>
	v-content
		v-container(fill-height )
			v-row(justify='center' align='center')
				v-col(cols='12')
					v-row(md='12')
						v-card(md='12' flat )
							div.d-flex.flex-no-wrap.justify-space-between
								div
									v-avatar( class="ma-12" size="280" tile)
										v-img(contain height="auto"  :src="require('../assets/tflogo.jpg')")
								v-card-title(color="lighten-2" )
									h1.grey--text Hallo {{ user.username }}
					v-row 
						v-col
							v-card.white--text.py-12(link to='/inventory' color="purple darken-2" shaped hover)
								v-card-title htLager
								v-spacer
								v-card-subtitle.white--text Einsicht auf alle Items
						v-col
							v-card.white--text(link to='/NewMaterial' color="green darken-2" shaped hover )
								v-card-title Erfassen
								v-spacer

								v-card-subtitle.white--text Material Erfassen
						v-col
							v-card.white--text(link to="/Lendings"  color="yellow darken-4 " shaped hover)
								v-card-title Ausleihungen
								v-spacer
								
								v-card-subtitle.white--text Einsicht auf ausgeliehenes Material
						
					
						
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
