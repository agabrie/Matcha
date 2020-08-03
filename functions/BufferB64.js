const B64_2_Buff = (base64) => {
	let binary = new Buffer(base64, "base64");
	return binary;
};

const Buff_2_B64 = (buffer) => {
	let res = Buffer.from(buffer, "binary").toString("base64");
	return res;
};
const All_Buff_2_B64 = (images) => {
	images.forEach((image) => {
		// console.log(image.data);
		image.data = Buff_2_B64(image.data);
	});
	return images;
};
const All_B64_2Buff = (images) => {
	images.forEach((image) => {
		// console.log(image.data);
		image.data = B64_2_Buff(image.data);
	});
	return images;
};
const BufferB64 = {
	Single: {
		Buff:B64_2_Buff,
		B64:Buff_2_B64,
	},
	All: {
		Buff:All_B64_2Buff,
		B64:All_Buff_2_B64,
	},
};
module.exports = {
	BufferB64
}