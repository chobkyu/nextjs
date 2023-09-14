import { NextResponse , NextRequest} from 'next/server'

const connection = require('../../config/db');

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
export async function POST(request:Request){
    const body = await request.json();

    console.log(body);
    const userId = body.userId;
    const userPw = body.userPw;
    const name = body.userName;
    const birth = body.birth;

    let queryString = `insert into user (userId, userPw, userName, userBirth)
                     values ('${userId}','${userPw}','${name}','${birth}')`;

    try{
        const res = await queryPromise(queryString);
        console.log(res);

        return NextResponse.json({status:201,success:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});

    }
}