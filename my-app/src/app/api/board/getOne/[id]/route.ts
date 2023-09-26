import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function GET(request:NextRequestWithAuth, context:{params:any}){
    const boardId = context.params.id;

    let queryString = `
        select 
            a.id as user,
            a.userId,
            a.userName,
            b.id as boardId,
            b.title,
            b.contents,
            b.isModified,
            b.dateTime,
            b.thumbnail
        from user a
        join myBoard b
        on a.id = b.userId
        where b.id = ${boardId}
        and b.isDeleted = false
    `;

    try{
        const res = await queryPromise(queryString);

        return NextResponse.json({status:200, data:res});
        
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }

}