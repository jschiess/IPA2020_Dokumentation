<template lang='pug'>
	v-content
		v-container(fill-height)
			v-row( justify='center' wrap align='center')
				v-col( cols='12' md='12' sm='12' )
					v-card.elevation-3
						v-data-table( 
						:search="search"
						v-model='devicesSelected' 
						:items-per-page='999'
						item-key='classId'
						:loading='loading' 
						:items='filteredItems'
						:headers='headers'
						hide-default-footer
						)
							template( v-slot:item.actions='{ item }') 
								v-btn.elevation-0( @click="deleteReservation( item )" large tile color="red" dark ) delete
							template(v-slot:top)
								v-row(justify='center')
									v-col(md="7" lg="8" sm="4")
										v-text-field(v-model="search" solo label='Search' append-icon="mdi-layers-search-outline" )

</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			selectedItems: [],
			items: [
				{
					classId: 'id',
					type: 'monitor',
					manufacturer: 'samsung',
					location: 'loa93',
					description: 'lorem',
					itemId: '1',
					uuid: '1235',
					serialnumber: '123',
					createdAt: '20.02.2020',
					lentTo: 'holo',
			
						
					
				}
			],
			headers: [
				{ text: "itemId", value: "classId" },
				{ text: 'typ', value: 'type'},
				{ text: 'Hersteller', value: 'manufacturer'},
				{ text: 'Standort', value: 'location'},
				{ text: 'beschreibung', value: 'description'},
				{ text: "classId", value: "itemId" },
				{ text: "serialnumber", value: "serialnumber" },
				{ text: 'uuid', value: 'uuid'},
				
				{ text: '', value: 'actions'},
			],
			search: "",
			loading: true,
		};
	},
	computed: {
		loggedIn: function() {return this.$store.state.loggedIn},
		user: function() {return this.$store.state.user},
		filteredItems: function () {
			return this.items
		}
	},
	mounted() {
		// call the init function
		this.init()
	},
	methods: {
		// removes item from array and sends request to the API
		deleteReservation: function(item) {
			// asks for confirmation 
			if (confirm('Bist du sicher? ')) {

				// send request
				// axios().delete('/api/')

				// sets the index 
				var index = this.items.indexOf(item)
				// removes the entry from the array
				this.items.splice(index, 1)
			}
		},
		init: function() {
			// get Data from API
			// var response = axios.get()
			// this.itmes = response.data
			// when the data arrived loading is set to false
			this.loading = false
		},
		
	}
}
</script>
