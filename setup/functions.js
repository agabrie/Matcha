
const { create } = require('./createTables');
const { drop } = require('./dropTables');
const { clear } = require('./clearTables');
// const {client} = require('../dbConnection');

module.exports = {
	Setup: {
		create,
		drop,
		clear
	}
};