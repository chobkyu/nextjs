import { NextRequest, NextResponse } from "next/server";

const connection = require('../../config/db');

export async function GET(request:NextRequest){
    const urlQry = request.nextUrl.searchParams;

    const groupId = urlQry.get('groupId');
    const userId = urlQry.get('userId');
    const id = urlQry.get('id');

    console.log(groupId,userId,id)
    let qryStr = `
        select 
            a.id as user,
            a.userId,
            a.userName,
            c.imgUrl
        from user a
        left outer join (
            select 
                userId as friendId
            from groupMem
            where userId =${id}
            and groupId = ${groupId}
        ) b
        on a.id = b.friendId
        left join userImg c
        on a.id = c.userId
        where b.friendId IS NULL
        and a.userId like '%${userId}%'
        and c.useFlag = true 
    `;

    try{
        const res = await connection.query(qryStr);

        return NextResponse.json({status:200,data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}