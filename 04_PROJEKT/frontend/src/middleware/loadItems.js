import axios from "@/api";

async function loadItems() {
	try {
		let response = await axios().post('graphql', {
			query: `
				query {
					itemsClasses {
						itemsClassName
						PK_itemsClass_ID
						description
						types {
							typesName
						}
						manufacturers{
							manufacturersName
						}
						items(uuidIsNull:false) {
							PK_items_ID
							uuid
							serialnumber
							lentTo
							location {
								locationsName
							}
							user{
								fullname
							}
						}
					}
				}`
		})
		return response.data.data
	}
	catch (error) {
		throw new Error(error);
	}
}
export { loadItems }