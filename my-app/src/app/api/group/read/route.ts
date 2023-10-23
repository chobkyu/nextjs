import { checkUser } from "@/app/Common/checkGroupMem";
import { NextRequest, NextResponse } from "next/server";

//그룹 게시글 리스트
export async function GET(request:NextRequest){
    const qryString = request.nextUrl.searchParams;

    const userId = qryString.get('userId');
    const groupId = qryString.get('groupId');

    if(userId === null || groupId===null){
        return {success:false, status:404,msg:'잘못된 요청입니다.'}
    }

    const check = await checkUser(parseInt(userId),parseInt(groupId))

    if(!check.success) return {status:500, msg:check.msg};

    const qryStr = `
        select 
        a.id as groupBoardId,
        title,
        contents,
        dateTime,
        thumbnail,
        b.id as groupId
        from next.groupName a
        join next.groupBoard b
        on a.id = b.groupId
        where b.id = ${groupId}
        and isDeleted = false;
    `;

    try{
        const res = await connection.query(qryStr);

        return res;
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }
}

