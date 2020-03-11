import axios from "@/api";
/**
 *
 *
 * @param {*} object
 */
async function submitNewItem(data) {
	try {
		await axios().post('/teacher/items/', data);
	}
	catch (error) {
		throw new Error(error);
	}
}

export { submitNewItem }