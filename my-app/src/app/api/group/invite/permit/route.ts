import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { Prisma } from "@prisma/client";


export async function POST(request:Request){
    const body = await request.json();

    const { userId, groupId } = body;
   
    try{
        const updInvite = prisma.$queryRaw`
            update groupInvite 
            set permit = true
            where userId = ${userId}
            and groupId = ${groupId}
        `;

        const insertMem = prisma.$queryRaw`
            insert into groupMem (follow,userId,groupId)
            values (true, ${userId},${groupId});
        `;
        
        const qryArr:any[] = [];
        
        qryArr.push(updInvite);
        qryArr.push(insertMem);

        await prisma.$transaction(qryArr);


        return NextResponse.json({status:201,success:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}