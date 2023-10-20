const connection = require('./db');

export function queryPromise(queryString:string) {
    const res = new Promise((resolve, reject) => {  
		connection.query(queryString, (error:any, results:any) => {  
			
			if (error) {  
				return reject(error);  
			}  
			resolve(results);  
		});  
		
	});  

	return res;
}