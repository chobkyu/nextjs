import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, context:{params:any}){
    const friendId = context.params.id;

    let qryStr = `
        select id,userId,userName,userBirth,myIntro
        from user
        where id = ${friendId}
    `;

    try{
        const res = await queryPromise(qryStr);

        console.log(res);

        return NextResponse.json({status:200,success:true,data:res});
    }catch(err){
        console.log(err);

        return NextResponse.json({err});
    }
}