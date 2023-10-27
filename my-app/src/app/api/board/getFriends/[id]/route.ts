import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(request:NextRequest,context:{params:any}) {
    console.log('get friend list');
    const userId = context.params.id;
    console.log(typeof userId)
    try{
        const res = await prisma.$queryRaw`
            select 
                a.user,
                a.userId,
                a.userName,
                a.friendId as friend,
                b.userId as friendId,
                b.userName as friendName,
                c.imgUrl
            from (
                select 
                    a.id as user,
                    a.userId,
                    a.userName,
                    b.friendId
                from next.user a
                join next.friends b
                on a.id = b.userId
            ) a
            join next.user b
            on a.friendId = b.id
            left join userImg c
            on a.friendId = c.userId
            where a.user = ${userId}
            and c.useFlag = true
        `;

        console.log(res);
        return NextResponse.json({status:200, data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }
    
}