import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

interface invite{
    userId:number,
    groupId : number,
}
export async function POST(request:Request){
    const body = await request.json();

    const { userId, groupId } = body;

    try{
        await prisma.$queryRaw`insert into groupInvite(userId, groupId)
                            values (${userId}, ${groupId})`;

        return NextResponse.json({status:201,success:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}