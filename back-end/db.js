const mysql = require('promise-mysql')
const config = require('./config').config

module.exports.DB = mysql.createConnection(config.db).then(pool => {
    console.log(`Connect to ${config.db.database} (${config.db.host}) database`);
    return pool;
})