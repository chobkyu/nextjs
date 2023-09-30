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
            b.userName as friendName
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
        where a.user = ${userId}
    `;

    try{
        const res = await queryPromise(qryStr);

        return NextResponse.json({status:200, data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }
    
}