const mysql = require('mysql2');  
// const mysql = require('mysql2'); for MAC  
  
const connection = mysql.createPool({  
	host: process.env.DB_HOST,  
	// host: '127.0.0.1', for MAC  
	user: process.env.DB_USER, 
	port: process.env.DB_PORT, 
	password: process.env.DB_PASSWORD,  
	database: process.env.DB ,
	connectionLimit : 5 
});


//connection.connect();

module.exports = connection;