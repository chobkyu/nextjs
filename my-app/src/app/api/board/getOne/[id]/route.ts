import { queryPromise } from "@/app/api/config/queryFunc";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

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

    try{
        const res : getOne[] | any= await prisma.$queryRaw`
            select 
                a.id as user,
                a.userId,
                a.userName as name,
                b.id as boardId,
                b.title,
                b.contents,
                b.isModified,
                d.imgUrl as userImg
            from next.user a
            left join next.myBoard b
            on a.id = b.userId
            left join next.userImg d
            on a.id = d.userId
            where b.id = ${boardId}
            and b.isDeleted = false
            and d.useFlag = true
        `;

        console.log(res);
        
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
        console.log(one.imgUrl);
        imgUrlArr.push(one.imgUrl);    
    });

    console.log(imgUrlArr);

    return imgUrlArr;
}