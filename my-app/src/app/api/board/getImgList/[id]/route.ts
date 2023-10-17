import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, context:{params:any}){
    const boardId = context.params.id;

    let qryStr = `
        select *
        from myBoardImg
        where boardId = ${boardId}
    `;

    try{
        const res = await queryPromise(qryStr);

        return NextResponse.json({status:200,success:true,data:res});
    }catch(err){
        console.log(err);

        return NextResponse.json({err});
    }
}