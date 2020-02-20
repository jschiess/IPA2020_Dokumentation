import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: "#00838f",
				secondary: "#ffa000",

				accent: "#9c27b0",
				error: "#f44336",
				warning: "#ff9800",
				info: "#ffc107",
				success: "#4caf50",
				kek: '#ffa31a',

			},
		}
	},
});
