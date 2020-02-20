<template lang='pug'>
	v-app
		v-content
			v-container( fluid class="fill-height"  )
				v-row( justify='center' wrap align='center')
					v-col( cols='12' md='4' sm='6' )
						v-card( class="elevation-12"  )
							v-form( ref="form")
								v-toolbar( color="primary" dark  )
									v-toolbar-title Login
								v-card-text 	
									v-text-field( v-model="data.username"  label='Username' type="name" )
									v-text-field( v-model="data.password"  label='Password' type="password" )
								v-card-actions
									v-spacer
									v-btn( @click="login" color="success" dark ) login
										v-icon( right ) mdi-login
</template>
<script>
import axios from "@/api"

export default {
	name: "home",
	props: ["loggedIn"],
	data() {
		return {
			data: {
				password: '',
				username: ''
			}
		};
	},
	methods: {
		login: async function() {
			// if the form has valid data
			if (this.$refs.form.validate()) {
				this.$emit('login')

				// send request to /login
				var response = await axios().post("/login", this.data);

				// get token from response.data
				var token = response.data.auth.split(" ")[1];
				var userData = response.data.tokenData
				// var user = response.data.user;

				// save token in vuex store 
				this.$store.dispatch('login', {token, userData})

				// emit to parent element to display message
				
				// send user to path home
				this.$router.push("/home");
				this.$emit('login')
			}
		}
	}
};
</script> 
