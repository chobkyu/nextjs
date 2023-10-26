import { NextRequest, NextResponse } from "next/server";

const connection = require('../../../config/db');

export async function GET(request:NextRequest, context:{params:any}){
    const groupBoardId = context.params.id;

    let qry = `
        select 
            c.id,
            c.title,
            c.contents,
            c.dateTime,
            c.userId,
            c.groupId,
            a.userId,
            a.userName,
            b.imgUrl
        from user a
        join userImg b
        on a.id = b.userId
        join groupBoard c
        on a.id = c.userId
        where b.useFlag= true
        and c.id = ${groupBoardId}
        and c.isDeleted = false;
    `

    try{
        const res = await connection.query(qry);

        return NextResponse.json({status:200,success:true,data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}