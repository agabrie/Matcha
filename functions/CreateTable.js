function createTable(proto) {
	let tableName = proto.tableName;
	let fields = proto.fields;
	console.log("table to create : ", tableName);
	let numFields = Object.keys(fields).length;
	let query = `CREATE TABLE IF NOT EXISTS\n${tableName}`;
	query += "\n(\n";
	let i = 0;
	console.log(numFields);
	for (field in fields) {
		let element = fields[field];
		query += `\t${field}`;
		if (element.type)
			query += ` ${element.type}`;
		if (element.length)
			query += `(${element.length})`;
		if (element.required)
			query += ` NOT NULL`;
		if (element.keyType) {
			if (element.keyType == "FOREIGN") {
				// so_id INTEGER REFERENCES so_headers(id)
				query += ` REFERENCES ${element.reference.table}(${element.reference.field})`;
			}
			else
				query += ` ${element.keyType} KEY`;
		}
		if (element.default) {
			if (element.type == "DATE")
				query += ` DEFAULT ${element.default}`;
			else
				query += ` DEFAULT '${element.default}'`;
		}
		if (element.unique)
			query += ` UNIQUE`;
		if (i == numFields - 1) {
			break;
		}
		query += ",\n ";
		i++;
	}
	query += "\n);";

	console.log("query => ", query);
	return query;
}

module.exports = { createTable }