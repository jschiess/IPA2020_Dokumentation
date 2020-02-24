<template lang='pug'>
	v-content
		v-container(fill-height) 
			v-row( justify='center' wrap align='center')
				v-col( cols='12' md='12' sm='12' )
					v-card.elevation-3
						v-data-table( 
							:search="search"
							:items-per-page='999'
							item-key='classId'
							:loading='loading' 
							:items='filteredItems'
							:headers='headers'
						)
							template( v-slot:item.actions='{ item }') 
								v-btn.elevation-0( @click="deleteLending( item )" large tile color="red" dark ) delete
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
				{ text: "itemId", value: "itemId" },
				{ text: 'typ', value: 'typesName'},
				{ text: 'Hersteller', value: 'manufacturersName'},
				{ text: 'Standort', value: 'locationsName'},
				{ text: 'beschreibung', value: 'description'},
				{ text: "classId", value: "itemId" },
				{ text: "serialnumber", value: "serialNumber" },
				{ text: "lentTo", value: 'username'},
				{ text: '', value: 'actions'},
			],
			search: "",
			loading: true,
		};
	},
	// dynamic data
	computed: {
		loggedIn: function() {return this.$store.state.loggedIn},
		user: function() {return this.$store.state.user},
		filteredItems: function () {
			if(this.showAllItems) {
				return this.items
			} else {
				return this.itmes.filter(item => {
					item.username === this.user.username
				})
			}
		}
	},
	// once the html is mounted this function is called
	mounted() {
		// call the init function
		// this.$emit("message", { type: "error", text: "ficj", timeout: 1110 });

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
					
					await axios().delete('/teacher/lendings/'+ item.itemId);
					this.init()
					

					// removes the item from the lokal storage
					this.$emit("message", { type: "success", text: 'Ausleihung aufgelöst', timeout: 0 });
				
				} catch (error) {
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
	
				}

			}
		},
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
					response = axios().get('/student/lendings')
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
