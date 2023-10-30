import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
const connection = require('../../config/db');

export async function POST(request:Request) {
    const body = await request.json();
    console.log(body);
    const { exImgId, newImgUrl,userId } = body;

    
    try{
        const updateExImg = prisma.$queryRaw`update userImg set useFlag=false where id=${exImgId}`;
        const insertNewImg = prisma.$queryRaw`insert into userImg(imgUrl,useFlag,userId) values (${newImgUrl},true,${userId})`;

        const qryArr : any[] = [updateExImg,insertNewImg];
      
        await prisma.$transaction(qryArr);

        return NextResponse.json({status:201,success:true});

    }catch(err){
        console.log(err);
        return NextResponse.json({err,success:false})
    }
}

