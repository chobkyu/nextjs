import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";


export async function GET(request:NextRequest,context:{params: any}) {
    const userId = context.params.id;
    console.log(userId);

    try{
        console.log(typeof userId);

        const res = await prisma.$queryRaw`
            select 
                a.id as user,
                a.userId,
                a.userName,
                b.id as boardId,
                b.title,
                b.contents,
                b.isModified,
                b.thumbnail
            from user a
            join myBoard b
            on a.id = b.userId
            where a.id = ${userId}
            and b.isDeleted = false
            order by b.id desc
    `;
        
        return NextResponse.json({status:201, datas: res});
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }

}