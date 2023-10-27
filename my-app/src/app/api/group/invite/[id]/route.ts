import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(request:NextRequest,context:{params:any}){
    const userId = context.params.id;

    try{
        const res = await prisma.$queryRaw`
            select 
                a.name,
                a.introduction,
                a.groupImg,
                b.userId,
                b.groupId,
                b.permit
            from groupName a
            join groupInvite b
            on a.id = b.groupId
            where b.userId = ${userId}
            and b.permit = false
            order by b.id desc;
        `;    

        return NextResponse.json({status:200, success:true, data:res});

    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}