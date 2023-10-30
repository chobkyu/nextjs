import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(request:Request){
    const body = await request.json();
    console.log(body)
    const { name, introduction, imgUrl, userId } = body;

   
    try{
      
  
        //transaction 필요
        await prisma.$queryRaw`insert into groupName(name,introduction, groupImg)
                            values (${name},${introduction},${imgUrl})`;

        
        const groupId = await getId(body);

        if(!groupId.success){
            return NextResponse.json({status:500,success:false,msg : res.err});
        }
        
        await prisma.$queryRaw`insert into groupMem(follow, userId, groupId)
                            values (true,${userId},${groupId.id})`;

   

        return NextResponse.json({status:201,success:true});
        
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}

const getId = async (obj:any) => {
    try{
        const res:any = await prisma.$queryRaw`
            select id
            from groupName
            where name = ${obj.name}
            and introduction = ${obj.introduction}
            and groupImg = ${obj.imgUrl}
            order by id desc;
        `;

        return {success:true, id : res[0].id}

    }catch(err){
        console.log(err);
        return {success:false,err};
    }
}