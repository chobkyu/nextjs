import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";

export async function GET(request:NextRequest, context:{params:any}){
    const groupBoardId = context.params.id;

    try{
        const res = await prisma.$queryRaw`
            select 
                id,
                imgUrl,
                groupBoardId as boardId 
            from groupBoardImg
            where groupBoardId = ${groupBoardId}
        `;

        return NextResponse.json({status:200,success:true,data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}