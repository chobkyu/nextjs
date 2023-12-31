import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(request:Request,context:{params:any}){
    const userId = context.params.id;

    try{
        const res :any= await prisma.$queryRaw`
            select 
                a.id as user,
                a.userId,
                a.userName,
                c.imgUrl
            from user a
            left join (
                select 
                    id,
                    fromId
                from invite
                where yesFlag = false
                and noFlag = false
                and toId = ${userId}
            ) b
            on a.id = b.fromId
            left join userImg c
            on a.id = c.userId
            where b.id is NOT NULL
            and c.useFlag = true
        `;

        if(res.length==0) return NextResponse.json({status:200,success:false,msg:'요청이 없습니다'})

        return NextResponse.json({status:200, success:true, data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}