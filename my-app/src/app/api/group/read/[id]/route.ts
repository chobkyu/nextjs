import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, context:{params:any}){
    const groupBoardId = context.params.id;

    let qry = `
        select 
            id,
            title,
            contents,
            dateTime,
            userId,
            groupId
        from next.group
        where id = ${groupBoardId}
        and isDeleted = false 
    `

    try{
        const res = await connection.query(qry);

        return NextResponse.json({status:200,success:true,data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}