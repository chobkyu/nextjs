import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(request:NextRequest, context:{params:any}){
    const userId = context.params.id;

    try{
        const res = await prisma.$queryRaw`  
            select 
                groupId,
                name,
                introduction, 
                groupImg
            from groupName a
            join groupMem b
            on a.id = b.groupId
            where b.userId = ${userId}
            order by groupId desc
        `;

        return NextResponse.json({status:200, success:true, data:res});

    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }

}

