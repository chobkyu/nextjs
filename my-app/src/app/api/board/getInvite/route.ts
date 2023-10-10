import { NextRequest, NextResponse } from "next/server";
import { queryPromise } from "../../config/queryFunc";


export async function GET(request:NextRequest,context:{params:any}){
    const userId = context.params.id;

    let qryStr = `
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

    try{
        const res = await queryPromise(qryStr);

        return NextResponse.json({status:200, data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}