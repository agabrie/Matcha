const { objToArray } = require('./objToArray');

const UpdateRecord = (tableName, fields, conditions) => {
	let i = 1;
	let numFields = Object.keys(fields).length;
	let numConditions = 0;
	if (conditions)
		numConditions = Object.keys(conditions).length;

	let vals = "";
	for (field in fields) {
		let element = fields[field];
		// console.log(`${field}:${element}`);
		vals += `${field} = $${i}`;
		if (i == numFields)
			break;
		vals += ", ";
		i++;
	}
	i++;
	let logic = '';
	if (conditions) {
		for (condition in conditions) {
			let element = conditions[conditions];
			// console.log("conditions => ",`${condition} : ${element}`);
			logic += `WHERE ${condition} = $${i}`;
			if (i == numFields + numConditions)
				break;
			logic += " \n\tAND ";
			i++;
		}
	}
	// if(conditions)
	// 	logic = `WHERE ${c[0]}=${c[1]}`;
	let query = `UPDATE ${tableName} SET ${vals} ${logic} RETURNING *;`;
	let data = objToArray({ ...fields, ...conditions });
	// console.log("data => ",data)
	if (data.error) {
		return { string: query, values: fields, errors: data.error };
	}
	return { string: query, values: data }
}

module.exports = { UpdateRecord }
