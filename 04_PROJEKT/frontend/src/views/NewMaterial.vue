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
										v-autocomplete(v-if='!isNewClass' :rules='[v => !!v || "Fehlende Angaben"]' outlined  v-model="form.itemsClassId" :items="itemsClass" item-value='itemsClassId' item-text='itemsClassName' label="Material klasse" append-icon="mdi-file-swap-outline")
								v-divider
								div(v-if="isNewClass")
									v-row()
									v-row(justify='center'  dense wrap)
										v-col(md='3')
											v-text-field(:rules='[v => !!v || "Fehlende Angaben"]' color="primary"  outlined v-model="form.itemsClassName" label='Klassen Name' append-icon="mdi-devices"  )
										v-col(md='3')
											v-autocomplete(:rules='[v => !!v || "Fehlende Angaben"]' color="primary"  outlined  v-model="form.locationsId" :items="locations" item-value='locationsId' item-text='locationsName' label="Standort" append-icon="mdi-office-building")
									v-row( justify='center' )
										v-col(md='3')
											v-autocomplete(:rules='[v => !!v || "Fehlende Angaben"]' outlined  v-model="form.manufacturersId" :items="manufacturers" item-value='manufacturersId' item-text='manufacturersName' label="Hersteller" append-icon="mdi-office-building")
										v-col(md='3')
											v-autocomplete(:rules='[v => !!v || "Fehlende Angaben"]' outlined  v-model="form.typesId" :items="types" item-value='typesId' item-text='typesName' label="Typ" append-icon="mdi-office-building")
									v-row( justify='center' )
										v-col(md='9') 
											v-text-field(:rules='[v => !!v || "Fehlende Angaben"]' outlined v-model="form.description"  label="Beschreibung" append-icon="mdi-card-text-outline") 
									v-row( justify='center' )
										v-col(md='6')
											v-row()
												v-spacer
												v-col(md='2')
													v-btn( color="error" @click.stop='cancel()' tile) cancel
														v-icon(right) mdi-cancel
												v-col(md='3')
													v-btn( :disabled="!valid" :dark='valid' tile color="success" @click.stop='submitNewClass()' ) submit
														v-icon( right ) mdi-email-send-outline
								v-divider
								div(v-if="!isNewClass" )
									v-row( justify='center' )
										v-col(md='3') 
											v-text-field(:rules='[v => !!v || "Fehlende Angaben"]' outlined v-model="form.serialNumber"  label="Seriennummer" append-icon="mdi-card-text-outline") 
									v-row(justify='center')
										v-col(md='6')
											v-row()
												v-spacer
												v-col(md='2')
													v-btn( color="error" @click.stop='cancel()' tile) cancel
														v-icon(right) mdi-cancel
												v-col(md='3')
													v-btn( :disabled="!valid" dark tile color="success" @click.stop='submitNewItem()' ) submit
														v-icon( right ) mdi-email-send-outline


</template>
<script>
import axios from "@/api";
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
		async loadLocations() {
			try {
				var response = await axios().get('/teacher/locations');
				this.locations = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		async loadManufacturers() {
			try {
				var response = await axios().get('/teacher/manufacturers');
				this.manufacturers = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		async loadTypes() {
			try {
				var response = await axios().get('/teacher/types');
				this.types = response.data;
			} catch (error) {
				this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				console.error(error);
			}
		},
		async loadItemsClass() {
			try {
				var response = await axios().get('/teacher/itemsClass');
				this.itemsClass = response.data;
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
				var data = {
					itemsClassName: this.form.itemsClassName,
					description: this.form.description,
					FK_locations_ID: this.form.locationsId,
					FK_manufacturers_ID: this.form.manufacturersId,
					FK_types_ID: this.form.typesId,
				}
				try {
					await axios().post('/teacher/itemsClass/', data)
					this.loadItemsClass()
					this.$emit("message", { type: "success", text: 'new entry created', timeout: 2000 });
				} catch (error) {
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}
			}
		},
		async submitNewItem() {
			if(this.$refs.form.validate()) {
				var data = {
					serialNumber: this.form.serialNumber,
					FK_itemsClass_ID: this.form.itemsClassId
				}

				try {
					// console.log(data);
					await axios().post('/teacher/items', data)

					// success  message
					this.$emit("message", { type: "success", text: 'Eintrag erstellt', timeout: 1000 });
					this.form.serialNumber = '';
					this.$refs.form.reset()

					// if error
				} catch (error) {
					// submit message
					console.error(error);
					this.$emit("message", { type: "error", text: error.message, timeout: 0 });
				}
			}
		}
	},
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

