<template lang='pug'>
	v-app 
		v-form(lazy-validation v-model='valid' ref='form')
			v-layout( row )
				v-row( justify='center')
					v-col(md='8')
						v-card(tile)
							v-card-title Neues Material erfassen
							v-divider
							v-card-text
								v-row(justify='center'  dense wrap)
									v-col(md='3')
										v-switch(label='Neue Klasse?' v-model="isNewClass" color="secondary" )
										v-autocomplete(v-if='!isNewClass' :rules='[v => !!v || "Fehlende Angaben"]' outlined  v-model="form.itemsClassId" :items="itemsClass" item-value='itemsClassId' item-text='itemsClassName' label="Material klasse" )
								v-divider
								div(v-if="isNewClass")
									v-row()
									v-row(justify='center'  dense wrap)
										v-col(md='3')
											v-text-field(:rules='[v => !!v || "Fehlende Angaben"]' color="primary"  outlined v-model="form.itemsClassName" label='Klassen Name' append-icon="mdi-devices"  )
										
									v-row( justify='center' )
										v-col(md='3')
											v-autocomplete(
												:rules='[v => !!v || "Fehlende Angaben"]' 
												outlined  
												v-model="form.manufacturersId" 
												:items="manufacturers" 
												item-value='manufacturersId' 
												item-text='manufacturersName' 
												label="Hersteller" )
										v-col(md='3')
											v-autocomplete(:rules='[v => !!v || "Fehlende Angaben"]' outlined  v-model="form.typesId" :items="types" item-value='typesId' item-text='typesName' label="Typ" )
									v-row( justify='center' )
										v-col(md='8') 
											v-text-field(:rules='[v => !!v || "Fehlende Angaben"]' outlined v-model="form.description"  label="Beschreibung" append-icon="mdi-card-text-outline") 
									v-row( justify='center' )
										v-col(md='8')
											v-row()
												v-spacer
												v-btn( color="error" @click.stop='cancel()' tile) Abbrechen
												v-btn( :disabled="!valid"  tile color="success" @click.stop='submitNewClass()' ) Erfassen
								v-divider
								div(v-if="!isNewClass" )
									v-row( justify='center' )
										v-col(md='3') 
											v-text-field(:rules='[v => !!v || "Fehlende Angaben"]' outlined v-model="form.serialNumber"  label="Seriennummer" append-icon="mdi-card-text-outline") 
										v-col(md='3')
											v-autocomplete(:rules='[v => !!v || "Fehlende Angaben"]' color="primary"  outlined  v-model="form.locationsId" :items="locations" item-value='locationsId' item-text='locationsName' label="Standort" )
									v-row(justify='center')
										v-col(md='3')
											v-row()
												v-spacer
												v-btn( color="error" @click.stop='cancel()' tile) Abbrechen
												v-btn( :disabled="!valid"  tile color="success" @click.stop='submitNewItem()' ) Erfassen


</template>
<script>
// import axios from api file
import axios from "@/api";

// Vue
export default {
	name: "NewMaterial",
	data() {
		return {
			isNewClass: false,
			classes: [],
			item: {},
			form: {
				itemsClassId: '',


				locationsId: '',
				itemsClassName: '',
				description: '',
				manufacturersId: '',
				typesId: ''
			},
			items: [],
			locations: [],
			valid: false,
			manufacturers: [],
			types: [],
			itemsClass: [],
			
		};
	},
	methods: {
		// loads the locations from the api
		async loadLocations() {
			try {
				var response = await axios().get('/teacher/locations');
				this.locations = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		// loads the Manufacturers from the api
		async loadManufacturers() {
			try {
				var response = await axios().get('/teacher/manufacturers');
				this.manufacturers = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		// loads the types from the api
		async loadTypes() {
			try {
				var response = await axios().get('/teacher/types');
				this.types = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		// loads the item classes from the api
		async loadItemsClass() {
			try {
				var response = await axios().get('/teacher/itemsClass');
				this.itemsClass = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		// clears the form
		cancel() {
			this.form = {};
			this.valid = false;
		},
		// submits a new class to the api
		async submitNewClass() {
			if(this.$refs.form.validate()) {
				var data = {
					itemsClassName: this.form.itemsClassName,
					description: this.form.description,
					FK_manufacturers_ID: this.form.manufacturersId,
					FK_types_ID: this.form.typesId,
				}
				try {
					await axios().post('/teacher/itemsClass/', data)
					this.loadItemsClass()
					this.$emit("message", { type: "success", text: 'material erfolgreich erfasst', timeout: 1000 });
				} catch (error) {
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}
			}
		},
		// submits a new item to the api
		async submitNewItem() {
			if(this.$refs.form.validate()) {
				try {
					// define request data
					var data = {
						serialNumber: this.form.serialNumber,
						FK_locations_ID: this.form.locationsId,
						FK_itemsClass_ID: this.form.itemsClassId
					}
					// send request
					await axios().post('/teacher/items', data)
					// success  message
					this.$emit("message", { 
						type: "success", 
						text: 'Eintrag erstellt', 
						timeout: 1000
					});
					// reset form
					this.form.serialNumber = '';
					this.$refs.form.reset()
					// if error
				} catch (error) {
					// submit error
					console.error(error);
					this.$emit("message", {
						type: "error",
						text: error.message,
						timeout: 0 });
				}
			}
		}
	},
	// method is run as soon as html is loaded
	async mounted() {

		// retrieves locations and mounts them in vue
		this.loadLocations()

		// retrieves manufacturers and mounts them in vue
		this.loadManufacturers()

		// retrieves types and mounts them in vue
		this.loadTypes()

		// retrieves itmesclasses and mounts them in vue
		this.loadItemsClass()
	},
};
</script> 

