<template lang='pug'>
	v-app 
		v-form(lazy-validation v-model='valid' ref='form')
			v-layout( row )
				v-row( justify='center')
					v-col(md='11')
						v-card(tile)
							v-card-title Neues Material erfassen
							v-divider

							v-card-text
								v-row(justify='center'  dense wrap)
									v-col(md='3')
										v-switch(label='Neue Klasse?' v-model="isNewClass" color="secondary" )
										v-autocomplete(v-if='!isNewClass' :rules='[v => !!v || "required field"]' outlined  v-model="form.classId" :items="classes" item-value='classId' item-text='className' label="Material klasse" append-icon="mdi-file-swap-outline")
										v-text-field(v-else :rules='[v => !!v || "required field"]' outlined  v-model="form.className" item-value='classId' item-text='className' label="Material klasse" append-icon="mdi-file-swap-outline")
								v-divider
								div(v-if="isNewClass")
									v-row()
									v-row(justify='center'  dense wrap)
										v-col(md='3')
											v-text-field(:rules='[v => !!v || "required field"]' color="primary"  outlined v-model="form.name" label='Name' append-icon="mdi-devices"  )
										v-col(md='3')
											v-autocomplete(:rules='[v => !!v || "required field"]' color="primary"  outlined  v-model="form.location" :items="locations" item-value='locationsId' item-text='locationsName' label="Standort" append-icon="mdi-office-building")
									v-row( justify='center' )
										v-col(md='3')
											v-autocomplete(:rules='[v => !!v || "required field"]' outlined  v-model="form.manufacturer" :items="manufacturers" item-value='manufacturerId' item-text='manufacturersName' label="Hersteller" append-icon="mdi-office-building")
										v-col(md='3')
											v-autocomplete(:rules='[v => !!v || "required field"]' outlined  v-model="form.type" :items="types" item-value='typeId' item-text='typesName' label="Typ" append-icon="mdi-office-building")
									v-row( justify='center' )
										v-col(md='9') 
											v-text-field(:rules='[v => !!v || "required field"]' outlined v-model="form.description"  label="Beschreibung" append-icon="mdi-card-text-outline") 
									v-row( justify='center' )
										v-col(md='6')
											v-row()
												v-spacer
												v-col(md='2')
													v-btn( color="error" @click.stop='cancel()' tile) cancel
														v-icon(right) mdi-cancel
												v-col(md='3')
													v-btn( :disabled="!valid" :dark='valid' tile color="success" @click.stop='submitClass()' ) submit
														v-icon( right ) mdi-email-send-outline
								v-divider
								div(v-if="!isNewClass" )
									v-row( justify='center' )
										v-col(md='3') 
											v-text-field(:rules='[v => !!v || "required field"]' outlined v-model="form.serialNumber"  label="Seriennummer" append-icon="mdi-card-text-outline") 
										v-col(md='3') 
											v-text-field(:rules='[v => !!v || "required field"]' outlined v-model="form.description"  label="kommentar" append-icon="mdi-card-text-outline") 
									v-row(justify='center')
										v-col(md='6')
											v-row()
												v-spacer
												v-col(md='2')
													v-btn( color="error" @click.stop='cancel()' tile) cancel
														v-icon(right) mdi-cancel
												v-col(md='3')
													v-btn( :disabled="!valid" :dark='valid' tile color="success" @click.stop='submitItem()' ) submit
														v-icon( right ) mdi-email-send-outline


</template>
<script>
import axios from "@/api";
export default {
	name: "home",
	data() {
		return {
			isNewClass: false,
			classes: [],
			item: {},
			form: {
				name: '',
				location: ''
			},
			items: [],
			headers: [
				{ text: "id", value: "id" },
				{ text: "uuid", value: "uuid" },
				{ text: "className", value: "className" },
				{ text: "itemsDescription", value: "itemsDescription", sortable: false },
				{ text: "classDescription", value: "classDescription" },
				{ text: "manufacturer", value: "manufacturer" },
				{ text: "typ", value: "typ" },
				// { text: "closet", value: "closet" },
				// { text: "room", value: "room" },
				{ text: 'location', value: 'location'},
			],
			locations: [],
			valid: false,
			manufacturers: [],
			types: []
			
		};
	},
	computed: {
		compoutedItems() {
			var computed = this.items.filter((item) => {
				return (!item.isReserved && !item.isInDevice)
			})
			return computed
		}
	},
	methods: {
		async loadLocations() {
			try {
				var response = await axios().get('/student/locations');
				this.locations = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		async loadManufacturers() {
			try {
				var response = await axios().get('/student/manufacturers');
				this.manufacturers = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		async loadTypes() {
			try {
				var response = await axios().get('/student/types');
				this.types = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},

		async loadItems() {
			try {
				var response = await axios().get("/student/inventory")
				this.items = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		cancel() {
			this.form = {};
			this.valid = false;
		},
		async submitNewClass() {
			if(this.$refs.form.validate()) {
				try {
					await axios().post('/admin/inventory/devices', this.form)
					this.$emit("message", { type: "success", text: 'new entry created', timeout: 2000 });
					
				} catch (error) {
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}
			}
		},
		async submitNewItem() {
		
		}
	},
	async mounted() {

		// retrieves locations and mounts them in vue
		this.loadLocations()

		// retrieves manufacturers and mounts them in vue
		this.loadManufacturers()

		// retrieves types and mounts them in vue
		this.loadTypes()

		// retrieves types and mounts them in vue
		this.loadItems()
	},
};
</script> 

