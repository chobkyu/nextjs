import { NextResponse } from "next/server";
import { queryPromise } from "../config/queryFunc";
import prisma from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";
const connection = require('../config/db');

interface writeData {
    userId : number,
    title : string,
    contents: string,
    // imgUrl? : string,
}

export async function POST(request : Request) {
    const body = await request.json();

    const write = body.write;
    const imgList = body.urlArr;

    console.log(imgList);
    const setWriteData :writeData = { ...write };
    const thumbnail = imgList.length > 0 ? `'${imgList[0]}'` : null;
    //const date = new Date();
    let queryString = `
        insert into myBoard(
            title,contents,isDeleted,isModified,dateTime,userId,thumbnail
        ) values (
            '${setWriteData.title}','${setWriteData.contents}',false,false,'${new Date()}',${setWriteData.userId},${thumbnail}
        );
    `
    
    try{
        const res : any = await connection.query(queryString);

        console.log(res['insertId']);

        await uploadImgUrl(res['insertId'],imgList);

        return NextResponse.json({status:201,success:true});
    } catch(err) {
        console.log(err);
        return NextResponse.json({err});
    }
}


/**이미지 업로드 작성 */
async function uploadImgUrl(id : number, urlArr:Array<string>) {
    // const mysql = require('mysql2/promise');
    // const pool = await mysql.createPool({
    //     host: process.env.DB_HOST,  
    //     // host: '127.0.0.1', for MAC  
    //     user: process.env.DB_USER, 
    //     port: process.env.DB_PORT, 
    //     password: process.env.DB_PASSWORD,  
    //     database: process.env.DB 
    // });

    // const connection = await pool.getConnection();

    const qryArr: any[] = [];
    try{
        //await connection.beginTransaction()
        urlArr.forEach( async (url)=>{
            const qryStr =  await prisma.$queryRaw`insert into myBoardImg (imgUrl, boardId) values (${url},${id})`;
            //await connection.query(qryStr);
            qryArr.push(qryStr);
        });

        await prisma.$transaction(qryArr,
            {
              isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
            });
        // await connection.commit();

        return {success :true};

    }catch(err){
        console.log(err);
        // await connection.rollback();
        return {success:false};
    }
}