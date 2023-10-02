import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, context:{params:any}){
    const userId = context.params.id;

    let qryStr = `
        select *
        from user
        where userId = ${userId}
    `;

    try {
        const res = await queryPromise(qryStr);

        console.log(res);

        return NextResponse.json({status:200, data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }
}