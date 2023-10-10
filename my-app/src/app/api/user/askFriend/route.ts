import { NextResponse , NextRequest} from 'next/server'
import { queryPromise } from '../../config/queryFunc';

export async function POST(request:Request) {
    const body = await request.json();
    
    const userId = parseInt(body.userId);
    const friendId = parseInt(body.friendId);

    let qryStr = `insert into invite(fromId,toId,yesFlag,noFlag)
                values (${userId},${friendId},0,0);`
    
    const check :any = await checkAdd(userId,friendId);

    console.log(check);

    if(!check.success) return NextResponse.json({status:201,success:false,msg:'이미 신청한 친구입니다'});

    try{
        await queryPromise(qryStr);

        return NextResponse.json({status:201,success:true});
        
    }catch(err){
        console.log(err);
        return NextResponse.json({err,msg:'에러 발생'});
    }
}

const checkAdd = async (userId:number, friendId:number) => {
    try{
        let qryStr = `select * from invite where fromId = ${userId} and toId = ${friendId}`

        const res:any = await queryPromise(qryStr);

        console.log(res.length);

        if(res.length>0) return {success:false};
        else return {success:true};
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}