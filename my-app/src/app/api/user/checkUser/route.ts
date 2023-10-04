import { NextRequestWithAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { queryPromise } from "../../config/queryFunc";

export async function GET(request:NextRequest){
    const qryString = request.nextUrl.searchParams;

    const userId = qryString.get('userId');
    const friendId = qryString.get('friendId');

    console.log(userId + ', '+friendId);

    let queryString = `
        select *
        from friends
        where
            userId = ${friendId} and
            friendId = ${userId}
    `;

    try{
        const res :any = await queryPromise(queryString);
        let success;

        if(res.length>0) {
            success = true;    
        }else{
            success = false;
        }

        return NextResponse.json({status:200, success});
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }


}