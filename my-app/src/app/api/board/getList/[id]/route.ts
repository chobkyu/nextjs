import { NextRequest, NextResponse } from "next/server";
import { queryPromise } from "../../../config/queryFunc";
import { NextApiRequest } from "next";

interface getListDto{
    userId:number;
}

export async function GET(request:NextRequest,context:{params: any}) {
    console.log(context)
    const userId = context.params.id

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
        where a.id = ${userId}
        and b.isDeleted = false
        order by boardId desc
    `;

    try{
        const res = await queryPromise(queryString);

        return NextResponse.json({status:201, datas: res});
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }

}