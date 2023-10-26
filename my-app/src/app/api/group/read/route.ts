import { NextRequest, NextResponse } from "next/server";

const connection = require('../../config/db');
//그룹 게시글 리스트
export async function GET(request:NextRequest){
    const qryString = request.nextUrl.searchParams;

    const userId = qryString.get('userId');
    const groupId = qryString.get('groupId');

    if(userId === null || groupId===null){
        return {success:false, status:404,msg:'잘못된 요청입니다.'}
    }

    const check = await checkUser(parseInt(userId),parseInt(groupId))
    if(!check.success) {
        console.log(check.success)

        return NextResponse.json({status:500,success:false, msg:check.msg});
    }

    const qryStr = `
        select 
            b.id as groupBoardId,
            title,
            contents,
            dateTime,
            thumbnail,
            a.id as groupId
        from next.groupName a
        join next.groupBoard b
        on a.id = b.groupId
        where groupId = ${groupId}
        and isDeleted = false;
    `;

    try{
        const res = await connection.query(qryStr);
        console.log(res);
        return NextResponse.json({status:200,success:true,data:res})
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }
}


async function checkUser(id:number, group:number) {
    const userId = id;
    const groupId = group
    const qryStr = `
        select 
            id
        from groupMem
        where
        userId = ${userId}
        and 
        groupId = ${groupId}
        and follow = true
    `

    try{
        const res = await connection.query(qryStr);
        if(res.length>0){
            return {success:true};
        }else{
            return {success:false,msg:'등록 되지 않은 유저입니다'};
        }

    }catch(err){
        console.log(err);
        return {success:false};
    }
}

