import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(request:NextRequest, context:{params:any}){
    const userId = context.params.id;

    try {
        const res = await prisma.$queryRaw`
            select 
                a.id as user,
                a.userId,
                a.userName,
                b.imgUrl
            from user a
            left join userImg b
            on a.id = b.userId
            where a.userId like %${userId}%
        `;

        console.log(res);

        return NextResponse.json({status:200, data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }
}