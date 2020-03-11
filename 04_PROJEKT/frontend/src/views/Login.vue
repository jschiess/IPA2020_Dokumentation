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
									v-text-field( v-model="form.username"  label='Username' type="name" )
									v-text-field( v-model="form.password"  label='Password' type="password" )
								v-card-actions
									v-spacer
									v-btn( @click="login" color="success" dark ) login
										v-icon( right ) mdi-login
</template>
<script>
export default {
	name: "login",
	data() {
		return {
			form: {
				username: '',
				password: '',
			}
		};
	},
	methods: {
		login: async function() {
			if (this.$refs.form.validate()) {
				
				try {
					this.$emit("message", { type: "success", text: 'erfolgreich eingeloggt', timeout: 1000 });

					this.$store.dispatch('login', this.form).then(() => {
						
						this.$router.push("/");
					})

				} catch (error) {
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				
				}


			}
		}
	}
};
</script> 
