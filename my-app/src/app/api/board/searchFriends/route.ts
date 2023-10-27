import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(request:NextRequest){
    const urlQry = request.nextUrl.searchParams;

    const searchId = urlQry.get('searchId');
    const userId = urlQry.get('userId');

    console.log(searchId);
    console.log(userId);
    
    try {
        const res = await prisma.$queryRaw`
            select 
                a.id as user,
                a.userId,
                a.userName,
                c.imgUrl
            from user a
            left outer join (
                select 
                    friendId
                from friends
                where userId =${userId}
            ) b
            on a.id = b.friendId
            left join userImg c
            on a.id = c.userId
            where b.friendId IS NULL
            and not a.id in (${userId})
            and a.userId like %${searchId}%
            and c.useFlag = true
        `;

        console.log(res);

        return NextResponse.json({status:200, data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }
}