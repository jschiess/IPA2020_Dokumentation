<template lang='pug'>
	//- basic layout 
	v-content
		v-container(fill-height)
			v-row( justify='center' wrap align='center')
				v-col( cols='12' md='12' sm='12' )
					v-card.elevation-3()
						//- main data table
						v-data-table( 
							:search="search"
							:items-per-page='999'
							item-key='classId'
							:loading='loading' 
							:items='filteredItems'
							:headers='headers'
							)
							//- Custom displays
							template( v-slot:item.actions='{ item }') 
								v-btn.elevation-0( @click="deleteLending( item )" name="Rückgabe"   icon  )
									v-icon() mdi-keyboard-tab
							template(v-slot:top)
								v-row(justify='center')
									v-col( md='5') 
										v-text-field(v-model="search" solo label='Search' append-icon="mdi-layers-search-outline" )
									v-col(md='2' v-if='user.role === "teacher"')
										v-switch(v-model="showAllItems" label='alle anzeigen')
			
					
</template>

<script>

// import statements
import axios from '@/api'

// main export
export default {
	name: 'Lendings',
	// data
	data() {
		return {
			showAllItems: true,
			selectedItems: [],
			items: [],
			headers: [
				{ text: "ID", value: "itemId" },
				{ text: 'Typ', value: 'typesName'},
				{ text: 'Hersteller', value: 'manufacturersName'},
				{ text: 'Ablageort', value: 'locationsName'},
				{ text: 'Beschreibung', value: 'description'},
				{ text: "Serialnummer", value: "serialNumber" },
				{ text: "Ausgeliehen von", value: 'username'},
				{ text: 'aktion', value: 'actions'},
			],
			search: "",
			loading: true,
		};
	},
	// dynamic data
	computed: {
		// checks if the user is logged in or not
		loggedIn: function() {return this.$store.state.loggedIn},
		// gets global user information username, role etc..
		user: function() {return this.$store.state.user},
		// filters the results based on showallitems boolean
		filteredItems: function () {
			if(this.showAllItems) {
				// no filtering
				return this.items
			} else {
				// filters list so only users with the users username are shown
				return this.items.filter(item => item.username === this.user.username)
			}
		}
	},
	// once the html is mounted this function is called
	mounted() {
		// init script
		this.init()
	},
	// methods
	methods: {
		// removes item from array and sends request to the API
		async deleteLending(item){
			// asks for confirmation
			if(confirm('sind sie sicher?')) {
				// delete entry
				try {
					var url = ((this.user.role === 'teacher')? '/teacher': '/student' ) +'/lendings/' + item.itemId 
					await axios().delete(url);
					this.init()
					

					// removes the item from the lokal storage
					this.$emit("message", { type: "success", text: 'Ausleihung aufgelöst', timeout: 1000 });
				
				} catch (error) {
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
	
				}


			}
		},
		// init methode
		async init() {
			
			// get Data from API
			var response;
			// check if teacher or student
			if(this.user.role === 'teacher') {
				try {
					// html request
					response = await axios().get('/teacher/lendings')
					// sets data
					this.items = response.data;
					this.loading = false
				} catch (error) {
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
					console.error(error);
				}
			} else {
				try {
					response = await axios().get('/student/lendings')
					// sets data
					this.items = response.data;
					// removes the loading bar
					this.loading = false
				} catch (error) {
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
					console.error(error);
				}
				// html request
				
			}

		},
		
	}
}
</script>
