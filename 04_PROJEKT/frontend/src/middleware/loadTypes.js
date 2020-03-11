import axios from "@/api";
async function loadTypes() {
	try {
		var response = await axios().get('/teacher/types');
		return response.data;
	}
	catch (error) {
		throw new Error(error);
	}
}

export { loadTypes }