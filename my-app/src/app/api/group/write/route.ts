import { NextResponse } from "next/server";

interface writeData{
    userId : number,
    groupId : string,
    title : string,
    contents : string,
}

const connection = require('../../config/db');

export async function POST(request:Request){
    const body = await request.json();

    const write = body.write;
    const imgList = body.urlArr;

    console.log(body)

    const setWriteData :writeData = { ...write };
    const thumbnail = imgList.length > 0 ? `'${imgList[0]}'` : null;

    let qryStr = `
        insert into next.groupBoard (
            title,contents,isDeleted,isModified,dateTime,userId,thumbnail,groupId)
        values (
            '${setWriteData.title}','${setWriteData.contents}',false,false,'${new Date()}',${setWriteData.userId},${thumbnail},${parseInt(setWriteData.groupId)}
        )
    `;

    //유저 체크

    try{
        const res : any = await connection.query(qryStr);

        await uploadImgUrl(res['insertId'],imgList);
        
        return NextResponse.json({status:201,success:true});

    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}

//이미지 작성 함수
async function uploadImgUrl(id : number, urlArr:Array<string>) {
    const mysql = require('mysql2/promise');
    const pool = await mysql.createPool({
        host: process.env.DB_HOST,  
        // host: '127.0.0.1', for MAC  
        user: process.env.DB_USER, 
        port: process.env.DB_PORT, 
        password: process.env.DB_PASSWORD,  
        database: process.env.DB 
    });

    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction()
        urlArr.forEach( async (url)=>{
            const qryStr =  `insert into groupBoardImg (imgUrl, groupBoarddId) values ('${url}',${id})`;
            await connection.query(qryStr);
        });

        await connection.commit();

        return {success :true};

    }catch(err){
        console.log(err);
        await connection.rollback();
        return {success:false};
    }finally{
        connection.release();
    }
}