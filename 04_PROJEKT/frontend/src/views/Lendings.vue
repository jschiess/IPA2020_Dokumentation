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
import axios from '@/api'
export default {
	name: 'Lendings',
	// data
	data() {
		return {
			showAllItems: true,
			selectedItems: [],
			items: [],
			headers: [
				{ text: "ID", value: "PK_items_ID" },
				{ text: 'Typ', value: 'itemClass.types.typesName'},
				{ text: 'Hersteller', value: 'itemClass.manufacturers.manufacturersName'},
				{ text: 'Ablageort', value: 'location.locationsName'},
				{ text: 'Beschreibung', value: 'itemClass.description'},
				{ text: "Serialnummer", value: "serialnumber" },
				{ text: "Ausgeliehen von", value: 'user.fullname'},
				{ text: 'aktion', value: 'actions'},
			],
			search: "",
			loading: true,
		};
	},
	// dynamic data
	computed: {

		user: function() {return this.$store.state.user},
		isTeacher: function () {
			return this.$store.getters.isTeacher
		},
		filteredItems: function () {
			if(this.showAllItems) {
				return this.items
			} else {
				// filters list so only users with the users username are shown
				return this.items.filter(item => item.username === this.user.username)
			}
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		async deleteLending(item){
			if(confirm('sind sie sicher?')) {

				try {
					var url = ((this.isTeacher)? '/teacher': '/student' ) +'/lendings/' + item.PK_items_ID 
					await axios().delete(url);
					this.init()
					this.$emit("message", { type: "success", text: 'Ausleihung aufgelöst', timeout: 1000 });
				
				} catch (error) {
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}
			}
		},
		// init methode
		async init() {

			let response = await axios().post('graphql', {
				query: `
					query{
						items( lentToIsNull: false ){
							PK_items_ID
							location{
								locationsName
							}
							itemClass{
								description
								manufacturers{
									manufacturersName
								}
								types{
									typesName
								}
							}
							user{
								fullname
							}
							serialnumber
						}
					}`
			})
			let items = response.data.data.items;


			this.items = items;
			this.loading = false
			
			// try {
			// 	this.items = await lendings()
			// 	this.loading = false
			// } catch (error) {
			// 	this.$emit("message", { type: "error", text: error.message, timeout: 0 });
			// 	console.error(error);
			// }
			

		},
		
	}
}
</script>
