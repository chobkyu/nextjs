import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { Prisma } from "@prisma/client";

interface writeData{
    userId : number,
    groupId : string,
    title : string,
    contents : string,
}


export async function POST(request:Request){
    const body = await request.json();

    const write = body.write;
    const imgList = body.urlArr;

    console.log(body)

    const setWriteData :writeData = { ...write };
    const thumbnail = imgList.length > 0 ? `'${imgList[0]}'` : null;

    
    //유저 체크

    try{
        const res : any = await prisma.$queryRaw`
            insert into next.groupBoard (
                title,contents,isDeleted,isModified,dateTime,userId,thumbnail,groupId)
            values (
                ${setWriteData.title},${setWriteData.contents},false,false,${new Date()},${setWriteData.userId},${thumbnail},${parseInt(setWriteData.groupId)}
            )
        `;
        const idx = await getId(setWriteData);

        if(!idx.success) return NextResponse.json({status:500, success:false, msg:idx.err});

        await uploadImgUrl(idx.id,imgList);
        
        return NextResponse.json({status:201,success:true});

    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}

const getId =async (params:any) => {
    try{
        const res:any = await prisma.$queryRaw`
            select
                id
            from groupBoard
            where title = ${params.title}
            and contents = ${params.contents}
            and userId = ${params.userId}
            and groupId = ${params.groupId}
            order by id desc;
        `
        console.log(res);
        return {success:true, id : res[0].id}
    }catch(err){
        console.log(err);
        return {success:false,err}
    }
}

//이미지 작성 함수
async function uploadImgUrl(id : number, urlArr:Array<string>) {
    const qryArr: any[] = [];

    try{
        await connection.beginTransaction()
        urlArr.forEach( async (url)=>{
            const qryStr =  await prisma.$queryRaw`insert into groupBoardImg (imgUrl, groupBoardId) values (${url},${id})`;
            qryArr.push(qryStr);
        });

        await prisma.$transaction(qryArr,
            {
              isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
            });

        return {success :true};

    }catch(err){
        console.log(err);
        return {success:false};
    }
}