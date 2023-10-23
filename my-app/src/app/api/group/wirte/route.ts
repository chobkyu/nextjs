import { NextResponse } from "next/server";

interface writeData{
    userId : number,
    groupId : number,
    title : string,
    contents : string,
}

export async function POST(request:Request){
    const body = await request.json();

    const write = body.write;
    const imgList = body.urlArr;

    const setWriteData :writeData = { ...write };
    const thumbnail = imgList.length > 0 ? `'${imgList[0]}'` : null;

    let qryStr = `
        insert into groupBoard (
            title,contents,isDeleted,isModified,dateTiem,userId,thumbnail,groupId
        ) values (
            '${setWriteData.title}','${setWriteData.contents}',false,false,'${new Date()}',${setWriteData.userId},'${thumbnail}',${setWriteData.groupId})
        )
    `;

    try{
        const res : any = await connection.query(qryStr);

        return NextResponse.json({status:201,success:true});

    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}

//이미지 작성 함수