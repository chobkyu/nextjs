import { NextResponse } from "next/server";
import { queryPromise } from "../../config/queryFunc";
import prisma from "../../../../../lib/prisma";

export async function POST (request:Request) {
    const body = await request.json();

    const { id, selfIntro } = body;

    try{
        await prisma.$queryRaw `
            update user set myIntro = '${selfIntro}' where id = ${id}
        `;

        return NextResponse.json({status:201, success:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({err,success:false})
    }
}