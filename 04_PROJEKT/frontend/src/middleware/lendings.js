import axios from "@/api";

async function lendings() {
	try {
		let response = await axios().get('/student/lendings');
		return response.data;
	}
	catch (error) {
		throw new Error(error);
	}
}

export { lendings }
