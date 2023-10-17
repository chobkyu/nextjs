import { NextResponse } from "next/server";
import { queryPromise } from "../config/queryFunc";

interface writeData {
    userId : number,
    title : string,
    contents: string,
    // imgUrl? : string,
}

export async function POST(request : Request) {
    const body = await request.json();

    const write = body.write;
    const imgList = body.urlArr

    console.log(imgList);
    const setWriteData :writeData = { ...write };
    //const date = new Date();
    let queryString = `
        insert into myBoard(
            title,contents,isDeleted,isModified,dateTime,userId,thumbnail
        ) values (
            '${setWriteData.title}','${setWriteData.contents}',false,false,'${new Date()}',${setWriteData.userId},null
        );
    `
    
    try{
        const res :any = await queryPromise(queryString);

        console.log(res['insertId']);

        return NextResponse.json({status:201,success:true});
    } catch(err) {
        console.log(err);
        return NextResponse.json({err});
    }
}


/**이미지 업로드 작성 */
function uploadImgUrl() {

}