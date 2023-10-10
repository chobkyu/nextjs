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
            c.imgUrl
       from user a
       left outer join friends b
       on a.id = b.userId
       left join userImg c
       on a.id = c.userId
       where b.userId is NULL 
       and a.userId like '%${searchId}%'
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