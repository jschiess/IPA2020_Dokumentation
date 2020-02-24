var items = [{ "PK_items_ID": 1, "serialnumber": "12312353453463456567567823324", "createdAt": "2020-02-21T14:53:01.000Z", "FK_itemsClass_ID": 1, "lentTo": null, "PK_itemsClass_ID": 1, "itemsClassName": "Raspberry PI model 3s 16gb ram", "description": "micro computer", "FK_types_ID": 3, "FK_manufacturers_ID": 3, "FK_locations_ID": 2, "PK_types_ID": 3, "typesName": "Raspberry Pi", "PK_manufacturers_ID": 3, "manufacturersName": "Raspberry Pi", "PK_locations_ID": 2, "locationsName": "LOA04" }, { "PK_items_ID": 8, "serialnumber": "f4234", "createdAt": "2020-02-23T23:15:29.000Z", "FK_itemsClass_ID": 1, "lentTo": null, "PK_itemsClass_ID": 1, "itemsClassName": "Raspberry PI model 3s 16gb ram", "description": "micro computer", "FK_types_ID": 3, "FK_manufacturers_ID": 3, "FK_locations_ID": 2, "PK_types_ID": 3, "typesName": "Raspberry Pi", "PK_manufacturers_ID": 3, "manufacturersName": "Raspberry Pi", "PK_locations_ID": 2, "locationsName": "LOA04" }];




var kek = items.map(item => {
	return item.PK_items_ID
});

console.log(
	kek
);

