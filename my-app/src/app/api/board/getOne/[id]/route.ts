import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

interface getOne {
    user : number,
    userId : string,
    userName : string,
    boardId : string,
    title : string,
    contents : string,
    isModified : boolean,
    dateTime : Date,
    imgUrl : string
}

export async function GET(request:NextRequestWithAuth, context:{params:any}){
    const boardId = context.params.id;
    console.log('-------------------');
    console.log(boardId);

    let queryString = `
        select 
            a.id as user,
            a.userId,
            a.userName as name,
            b.id as boardId,
            b.title,
            b.contents,
            b.isModified,
            b.dateTime,
            c.imgUrl
        from next.user a
        left join next.myBoard b
        on a.id = b.userId
        left join next.myBoardImg c
        on b.id = c.boardId
        where a.id = 10
        and b.id = ${boardId}
        and b.isDeleted = false
    `;

    try{
        const res : getOne[] | any= await queryPromise(queryString);
        
        const imgList = getListObject(res);

        const getOneData = {...res[0],imgUrl:imgList};

        console.log(getOneData)

        return NextResponse.json({status:200, data:getOneData});
        
    }catch(err){
        console.log(err);
        return NextResponse.json(err);
    }

}

const getListObject = (res:getOne[]) => {
    let imgUrlArr = new Array<string>();
    
    res.forEach(one => {
        imgUrlArr.push(one.imgUrl);    
    });

    return imgUrlArr;
}