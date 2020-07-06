const { objToArray } = require('./objToArray');

const InsertRecord = (tableName, fields, conditions) => {
	// console.log("data => ",data);
	let columns = "";
	let vals = "";
	let i = 1;
	let numFields = Object.keys(fields).length;
	let numConditions = 0;
	if (conditions)
		numConditions = Object.keys(conditions).length;
	for (field in fields) {
		let element = fields[field];
		// console.log(`${field}:${element}`);
		columns += `${field}`;
		vals += `$${i}`;
		if (i == numFields)
			break;
		columns += ", ";
		vals += ", ";
		i++;
	}
	i++;
	let logic = '';
	if (conditions) {
		for (condition in conditions) {
			let element = conditions[conditions];
			// console.log("conditions => ", `${condition} : ${element}`);
			logic += `WHERE ${condition} = $${i}`;
			if (i == numFields + numConditions)
				break;
			logic += " \n\tAND ";
			i++;
		}
	}
	let query = `INSERT INTO ${tableName} (${columns}) VALUES (${vals}) ${logic} RETURNING *;`;
	let data = objToArray({...fields,...conditions});
	if (data.error) {
		return { string: query, values: fields, errors: data.error };
	}
	return { string: query, values: data }
};

module.exports = { InsertRecord }