import { NextRequest, NextResponse } from "next/server";

const connection = require('../../../config/db');

export async function GET(request:NextRequest,context:{params:any}){
    const userId = context.params.id;

    let qryStr = `
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

    try{
        const res = await connection.query(qryStr);

        return NextResponse.json({status:200, success:true, data:res});

    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}