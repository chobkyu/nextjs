import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const urlQry = request.nextUrl.searchParams;

    const searchId = urlQry.get('searchId');
    const userId = urlQry.get('userId');
    
    let qryStr = `
       select 
            a.id as user,
            a.userId,
            a.userName,
            b.imgUrl
       from user a
       left join userImg b
       on a.id = b.userId
       where a.userId like '%${searchId}%'
       and not a.userId in ('${userId}')
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