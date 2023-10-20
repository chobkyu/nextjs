const mysql = require('mysql2');  
// const mysql = require('mysql2'); for MAC  
const util = require('util')

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
connection.getConnection((err:any, connection:any) => {
	if (err) {
	  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
		console.error('Database connection was closed.')
	  }
	  if (err.code === 'ER_CON_COUNT_ERROR') {
		console.error('Database has too many connections.')
	  }
	  if (err.code === 'ECONNREFUSED') {
		console.error('Database connection was refused.')
	  }
	}
  
	if (connection) connection.release()
  
	return
  });

  // Promisify for Node.js async/await.
connection.query = util.promisify(connection.query)
module.exports = connection;