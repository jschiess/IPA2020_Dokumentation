<template lang='pug'>
	//- basic layout
	v-content
		v-container(fill-height)
			v-row( justify='center' wrap align='center')
				v-col( cols='12' md='12' sm='12' )
					v-card.elevation-3
						//-  parent data table
						v-data-table( 
						:search="search"
						:items-per-page='999'
						item-key='PK_itemsClass_ID'
						:expanded.sync="expanded" 
						show-expand 
						:loading='loading' 
						:items='items'
						:headers='headers'
						)
							template( v-slot:expanded-item="{ headers, item }" )
								td(  style="padding:5px 10px;" :colspan='headers.length' )
									v-data-table(
										dense 
										:search="search"
										show-select
										item-key='PK_items_ID'
										:items-per-page=1000
										class="elevation-0" 
										:items='item.items' 
										:headers='subheaders' 
										hide-default-footers
										v-model="selectedItems" 
										) 
										//- custom changes to defualt template
										template(v-slot:header.data-table-select='item')
										template(v-slot:item.action='{ item }' v-if='user.role === "teacher"') 
											v-btn.elevation-0( @click="deleteItem( item )" small tile color="red" dark ) x
										template(v-slot:item.data-table-select='{  isSelected, select, item }') 
											v-simple-checkbox( :disabled='!!item.lentTo' :value="isSelected" @input="select($event)")
										template( v-slot:item.serialnumber="{ item }" )
											v-edit-dialog(@save='changeItem(item)') {{ item.serialnumber}}
												template(v-slot:input)
													v-text-field(counter label='edit' v-model='item.serialnumber') 
							template(v-slot:top)
								v-row()
									v-spacer()
									v-spacer
									v-col(md="6" lg="5" sm="4")
										v-text-field(v-model="search" solo label='Search' append-icon="mdi-layers-search-outline" )
									v-spacer
									v-col( md="2" lg="2" sm="2"  )
										v-btn(dark color="success" v-if='user.role === "teacher"' link to="/newMaterial" ) new device
									v-col( md="2" lg="2" sm="2" )
										v-btn( @click="lendItems" color="secondary lighten-1"  :disabled='!selectedItems.length' ) Ausleihen
											

</template>

<script>
// packgae imports
import axios from "@/api";

export default {
	name: 'Inventory',
	// Data 
	data() {
		return {
			expanded: [],
			selectedItems: [],
			items: [],
			headers: [
				
				{ text: "ID", value: "PK_itemsClass_ID" },
				{ text: "name", value: "itemsClassName" },
				{ text: 'typ', value: 'typesName'},
				{ text: 'Hersteller', value: 'manufacturersName'},
				{ text: 'beschreibung', value: 'description'},
				{ text: "", value: "data-table-expand" }
			],
			subheaders: [
				{ text: "Id", value: "PK_items_ID" },
				{ text: "serialnumber", value: "serialnumber" },
				{ text: "Ablageort", value: "locationsName" },
				{ text: 'Ausgeliehen von', value: 'username'},
				{ text: 'aktion', value: 'action'},
				
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
	},

	async mounted() {
		this.loadItems()
		// disable loading 
		this.loading = false
	},
	methods: {
		async loadItems() {
			try {
				var response = await axios().get("/student/inventory")
			} catch (error) {
				// send message to parent prop
				console.error(error);
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
			}
			//set itmes
			this.items = response.data;	
		},
		// deletes the item form the lendings
		async deleteItem(item){
			// asks for confirmation
			if(confirm('sind sie sicher?')) {
				try {
					// delete entry
					await axios().delete('/teacher/inventory/'+ item.PK_items_ID);
					// removes the item from the lokal storage
					this.loadItems();
					this.selectedItems = '';
				
				} catch (error) {
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });

				}
			}
		},
		// alters item 
		async changeItem(item) {
			// asks for confirmation
			if(confirm('sind sie sicher?')) {
				// delete entry
				
				try {
					// axios request
					await axios().put('/teacher/inventory/'+ item.PK_items_ID, item)
				

				} catch (error) {
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}

				// removes the item from the lokal storage
				this.loadItems()
			}
			
		},
		// lends an item
		async lendItems() {
			/** forms the data to:
			 * [
			 * 	PK_items_ID,
			 * ]
			 */
			var idList = this.selectedItems.map(item => item['PK_items_ID']) 
			try {
				// html request
				await axios().post('/student/lendings/', idList )
				// send message
				this.$emit("message", { 
					type: "success", 
					text: 'Material ausgeliehen', 
					timeout: 1000 
				});
			} catch (error) {
				console.error(error);
				this.$emit("message", { 
					type: "error",
					text: error.message,
					timeout: 0 
				});
			}
			this.selectedItems = [];
			// redownload items
			this.loadItems()
		},
	}
}
</script>
