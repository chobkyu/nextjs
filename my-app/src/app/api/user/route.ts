import { NextResponse , NextRequest} from 'next/server'

const connection = require('../config/db');

interface userData {
    userId:string,
    userPw:string,
    userBirth:Date,
    id:number,
    userName:string
}

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
        const row : userData | any = await queryPromise(queryString);
        if(row){
            const { userPw, ...result } = row[0]; 
            return NextResponse.json({status:201,success:true,data:result});
        }
        console.log(row)

    } catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
    

    return NextResponse.json({msg:body})
}