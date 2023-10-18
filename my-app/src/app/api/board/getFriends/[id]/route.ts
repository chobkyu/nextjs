import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest,context:{params:any}) {
    const userId = context.params.id;

    let qryStr = `
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

    try{
        const res = await queryPromise(qryStr);
        console.log(res);
        return NextResponse.json({status:200, data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }
    
}