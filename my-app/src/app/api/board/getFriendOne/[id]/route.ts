import { NextRequest, NextResponse } from "next/server";
const connection = require('../../../config/db');

export async function GET(request:NextRequest, context:{params:any}){
    const friendId = context.params.id;

    let qryStr = `
        select a.id,a.userId,a.userName,a.userBirth,a.myIntro,b.imgUrl,b.id as imgId
        from user a
        left join userImg b
        on a.id = b.userId
        where a.id = ${friendId}
        and b.useFlag = true
    `;

    try{
        const res = await connection.query(qryStr);
        console.log(res);

        return NextResponse.json({status:200,success:true,data:res});
    }catch(err){
        console.log(err);

        return NextResponse.json({err});
    }
}