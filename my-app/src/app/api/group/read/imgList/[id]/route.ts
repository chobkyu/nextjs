import { NextRequest, NextResponse } from "next/server";

const connection = require('../../../../config/db');

export async function GET(request:NextRequest, context:{params:any}){
    const groupBoardId = context.params.id;

    let qryStr = `
        select 
            id,
            imgUrl,
            groupBoardId as boardId 
        from groupBoardImg
        where groupBoardId = ${groupBoardId}
    `;

    try{
        const res = await connection.query(qryStr);

        return NextResponse.json({status:200,success:true,data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}