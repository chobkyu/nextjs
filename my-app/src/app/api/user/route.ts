import { NextResponse , NextRequest} from 'next/server'

const connection = require('../config/db');


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

//login
export async function POST(request: Request) {
    const body = await request.json();
    console.log(body)
    const userId = body.userId;
    const password = body.password;

    console.log(userId)
    console.log(password)
    let queryString = `select * from user where userId = '${userId}' and userPw = '${password}'`;

    try{
        const row = await queryPromise(queryString);
        if(row){
            return NextResponse.json({status:201,success:true});
        }
        console.log(row)

    } catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
    

    return NextResponse.json({msg:body})
}