import { NextResponse, NextRequest } from "next/server";
const connection = require("../../../config/db");

export async function GET(request:NextRequest, context:{params:any}){
    const userId = context.params.id;

    let qryStr = `  
        select 
            groupId,
            name,
            introduction, 
            groupImg
        from groupName a
        join groupMem b
        on a.id = b.groupId
        where b.userId = ${userId}
    `;

    try{
        const res = await connection.query(qryStr);

        return NextResponse.json({status:200, success:true, data:res});

    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }

}

