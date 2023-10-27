import { NextResponse , NextRequest} from 'next/server'
import prisma from '../../../../../lib/prisma';

export async function POST(request:Request) {
    const body = await request.json();
    
    const userId = parseInt(body.userId);
    const friendId = parseInt(body.friendId);
    
    const check :any = await checkAdd(userId,friendId);

    console.log(check);

    if(!check.success) return NextResponse.json({status:201,success:false,msg:'이미 신청한 친구입니다'});

    try{
        //await connection.query(qryStr);
        await prisma.$queryRaw`insert into invite(fromId,toId,yesFlag,noFlag)
                            values (${userId},${friendId},0,0)`
        return NextResponse.json({status:201,success:true});
        
    }catch(err){
        console.log(err);
        return NextResponse.json({err,msg:'에러 발생'});
    }
}

const checkAdd = async (userId:number, friendId:number) => {
    try{

        // const res:any = await connection.query(qryStr);
        const res:any = await prisma.$queryRaw `select * from invite where fromId = ${userId} and toId = ${friendId}`
        console.log(res.length);

        if(res.length>0) return {success:false};
        else return {success:true};
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}