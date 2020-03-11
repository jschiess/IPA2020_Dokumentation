import axios from "@/api";
async function loadItemsClass() {
	try {
		var response = await axios().get('/teacher/itemsClass');
		return response.data;
	}
	catch (error) {
		throw new Error(error);
	}
}
export { loadItemsClass }