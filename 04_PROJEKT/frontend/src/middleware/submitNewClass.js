import axios from "@/api";
async function submitNewClass(data) {
	try {
		await axios().post('/teacher/itemsClass/', data);

	}
	catch (error) {
		throw new Error(error);
	}
}

export { submitNewClass }