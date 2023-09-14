const connection = require('./db');

export function queryPromise(queryString:string) {
    return new Promise((resolve, reject) => {  
		connection.query(queryString, (error:any, results:any) => {  
			if (error) {  
				return reject(error);  
			}  
			resolve(results);  
		});  
	});  
}