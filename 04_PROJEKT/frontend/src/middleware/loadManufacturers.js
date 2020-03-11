import axios from "@/api";
async function loadManufacturers() {
	try {
		var response = await axios().get('/teacher/manufacturers');
		return response.data;
	}
	catch (error) {
		throw new Error(error);
	}
}

export { loadManufacturers }