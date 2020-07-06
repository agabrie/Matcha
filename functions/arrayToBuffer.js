arrayBufferToBase64 = (buffer)=> { 
	var binary = '';
	var bytes = new Uint8Array(buffer);
	for(let i = 0; i < bytes.byteLength; i++){
		binary += String.fromCharCode(bytes[i]);
	}
	var data = window.btoa(binary);
	return data;
}
module.exports = {arrayBufferToBase64}