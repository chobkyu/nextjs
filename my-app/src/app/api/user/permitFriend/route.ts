import { NextRequest, NextResponse } from "next/server";
import { queryPromise } from "../../config/queryFunc";
import prisma from "../../../../../lib/prisma";

export async function GET(request:NextRequest){
    const urlQry = request.nextUrl.searchParams;

    const userId = urlQry.get('userId');
    const friendId = urlQry.get('friendId');

    try{
        //check friend
        const check = await checkFriend(userId, friendId);
        
        if(!check.success) return NextResponse.json({status:201,success:false,msg:'이미 친구인 사이입니다.'});


        const insQry1 = prisma.$queryRaw`insert into friends(userId, friendId) values (${userId},${friendId})`;
        const insQry2 = prisma.$queryRaw`insert into friends(userId, friendId) values (${friendId},${userId})`;
        const insQry3 = prisma.$queryRaw`update invite set yesFlag=true where fromId = ${friendId} and toId=${userId}`;

        const qryArr : any[] = [insQry1,insQry2,insQry3];
        
        await prisma.$transaction(qryArr);

        return NextResponse.json({status:201,success:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({err})
    }
}


const checkFriend = async (userId:any, friendId:any) => {
    try{
        const res:any = await prisma.$queryRaw`select * from friends where userId = ${userId} and friendId = ${friendId}`;

        if(res.length>0) return {success:false};
        else return {success:true};
    }catch(err){
        console.log(err);
        return {success:false};
    }
}