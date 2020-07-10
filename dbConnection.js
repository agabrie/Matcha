const { Client } = require('pg');
require('dotenv').config();


let pghost = process.env.DBHost;
let pgdb = process.env.DBDatabase;
let pguser = process.env.DBUser;
let pgport = process.env.DBPort;
let pgpassword = process.env.DBPassword;
let pgurl = `postgres://${pguser}:${pgpassword}@${pghost}:${pgport}/${pgdb}`;
const client = new Client({
	connectionString: pgurl,
	// ssl: {
	// 	rejectUnauthorized: false
	// }
});
const connect = () => {
	client.connect();
}
const end = () => {
	client.end;
}

module.exports = {
	client: client,
	// connect:connect,
	// end:end
}



/*
function DB(){
	this.pghost = process.env.Host;
	this.pgdb = process.env.Database;
	this.pguser = process.env.User;
	this.pgport = process.env.Port;
	this.pgpassword = process.env.Password;
	this.pgurl = `postgres://${this.pguser}:${this.pgpassword}@${this.pghost}:${this.pgport}/${this.pgdb}`;
	this.client = new Client({
		connectionString: this.pgurl,
		// ssl: {
		// 	rejectUnauthorized: false
		// }
	});
}
// client.connect();
// client.end;
DB.prototype.connectToClient = ()=>{
	this.client.connect();
}
DB.prototype.endConnectionToClient = ()=>{
	this.client.end;
}
module.exports = DB;
*/