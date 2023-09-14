import { NextResponse , NextRequest} from 'next/server'
import { queryPromise } from '../../config/queryFunc';


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