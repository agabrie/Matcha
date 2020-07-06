const objToArray = (data)=>{
	if(data.error)
		return ({data:data,error:data.error});
	console.log(data);
	let arr = []
	for(elem in data)
	{
		arr.push(data[elem])
	}
	console.log(arr);
	return arr;
}
module.exports = {objToArray}