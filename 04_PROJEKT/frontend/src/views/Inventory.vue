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
						:expanded.sync="expanded" 
						show-expand 
						:loading='loading' 
						:items='filteredItems'
						:headers='headers'
						)
							
							template( v-slot:expanded-item="{ headers, item }" )
								td(  style="padding:5px 10px;" :colspan='headers.length' )
									v-data-table(
										dense 
										:search="search"
										show-select
										item-key='itemId'
										:items-per-page=1000
										class="elevation-0" 
										:items='item.items' 
										:headers='subheaders' 
										hide-default-footer
										v-model="selectedItems" 
										)
										template( v-slot:item.serialnumber="{ item }" )
											v-edit-dialog(@open) {{ item.serialnumber}}
												template(v-slot:input)
													v-text-field(counter label='edit' )
							template(v-slot:top)
								v-row()
									v-spacer()
									v-spacer
									v-col(md="6" lg="5" sm="4")
										v-text-field(v-model="search" solo label='Search' append-icon="mdi-layers-search-outline" )
									v-spacer
									v-col( md="2" lg="2" sm="2"  )
										v-btn(dark color="success" v-if='user.role === "teacher"' link to="/newMaterial" ) new device
											v-icon( right ) mdi-plus
									v-col( md="2" lg="2" sm="2" )
										v-btn( @click="reserveItems" color="secondary lighten-1"  :disabled='!selectedItems.length' ) Ausleihen
											v-icon(right ) mdi-plus
											

</template>

<script>
import axios from "@/api";

export default {
	name: 'inventory',
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
				{ text: 'Standort', value: 'locationsName'},
				{ text: 'beschreibung', value: 'description'},
				{ text: "", value: "data-table-expand" }
			],
			subheaders: [
				{ text: "Id", value: "PK_itemsClass_ID" },
				{ text: "serialnumber", value: "serialnumber" },
				{ text: 'Ausgeliehen von', value: 'lentTo'},
			],
			search: "",
			loading: true,
		};
	},
	computed: {
		loggedIn: function() {return this.$store.state.loggedIn},
		user: function() {return this.$store.state.user},
		filteredItems: function () {return this.items}
	},
	async mounted() {
		try {
			var response = await axios().get("/student/inventory")

		} catch (error) {
			// send message to parent prop
			console.error(error);
			this.$emit("message", { type: "error", text: error.message, timeout: 0 });
		}
		// disable loading 
		this.loading = false
		//set itmes
		this.items = response.data;
	},
	methods: {
		reserveItems: async () => {
			
		},
	}
}
</script>
