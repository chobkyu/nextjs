import { NextResponse , NextRequest} from 'next/server'
import { queryPromise } from '../../config/queryFunc';

export async function POST(request:Request) {
    const body = await request.json();
    
    const userId = parseInt(body.userId);
    const friendId = parseInt(body.friendId);

    let qryStr = `insert into invite(fromId,toId,yesFlag,noFlag)
                values (${userId},${friendId},0,0);`
    
    const check :any = checkAdd(userId,friendId);

    if(!check.success) return NextResponse.json({status:201,success:false,msg:check.msg});

    try{
        await queryPromise(qryStr);

        return NextResponse.json({status:201,success:true});
        
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}

const checkAdd = async (userId:number, friendId:number) => {
    try{
        let qryStr = `select * from invite where fromId = ${userId} and toId = ${friendId}`

        const res = await queryPromise(qryStr);

        if(!res) return {success:false, msg:'이미 신청한 친구입니다.'};
        else return {success:true};
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}