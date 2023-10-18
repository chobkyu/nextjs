import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const body = await request.json();
    console.log(body);
    const { exImgId, newImgUrl,userId } = body;

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
        await connection.beginTransaction();

        const updateExImg = `update userImg set useFlag=false where id=${exImgId}`;
        const insertNewImg = `insert into userImg(imgUrl,useFlag,userId) values ('${newImgUrl}',true,${userId})`;

        await connection.query(updateExImg);
        await connection.query(insertNewImg);

        await connection.commit();

        return NextResponse.json({status:201,success:true});

    }catch(err){
        console.log(err);
        await connection.rollback();
        return NextResponse.json({err,success:false})
    }finally{
        connection.release();
    }
}

