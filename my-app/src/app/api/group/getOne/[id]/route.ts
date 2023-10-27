import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(request:Request, context:{params:any}){
    const id = context.params.id;

    try{
        const res = await prisma.$queryRaw `
            select *
            from groupName
            where id = ${id}
        `;
        
        return NextResponse.json({status:200,success:true,data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}