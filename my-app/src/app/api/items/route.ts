import { NextResponse } from 'next/server'

const connection = require('../config/db');
// const mysql = require('mysql2');  
// // const mysql = require('mysql2'); for MAC  
  
// const connection = mysql.createConnection({  
// 	host: process.env.DB_HOST,  
// 	// host: '127.0.0.1', for MAC  
// 	user: process.env.DB_USER,  
// 	password: process.env.DB_PASSWORD,  
// 	database: process.env.DB  
// });


function queryPromise(queryString:string) {  
	return new Promise((resolve, reject) => {  
		connection.query(queryString, (error:any, results:any) => {  
			if (error) {  
				return reject(error);  
			}  
			resolve(results);  
		});  
	});  
}  

export async function GET() {
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   })
//   const data = await res.json()
  
  let queryString = 'select * from user';

  console.log('?????')
  try {  
		const rows = await queryPromise(queryString);  
    console.log(rows)
		return NextResponse.json({data:rows , status:200});  
	} catch (error) {  
		console.error(error);  
		return NextResponse.json('Internal Server Error');  
	}  
  // const data = {test:'test'}
  // return NextResponse.json({ data })
}