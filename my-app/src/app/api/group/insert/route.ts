import { NextResponse } from "next/server";

export async function POST(request:Request){
    const body = await request.json();
    console.log(body)
    const { name, introduction, imgUrl, userId } = body;

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

        const insertGroup = `insert into groupName(name,introduction, groupImg)
                            values ('${name}','${introduction}','${imgUrl}')`;

        const res = await connection.query(insertGroup);
        
        const groupId = res[0].insertId;
        
        const insertFisrtMem = `insert into groupMem(follow, userId, groupId)
                               values (true,${userId},${groupId})`;

        await connection.query(insertFisrtMem);
        await connection.commit();

        return NextResponse.json({status:201,success:true});
        
    }catch(err){
        console.log(err);
        await connection.rollback();
        return NextResponse.json({err});
    }finally{
        connection.release();
    }
}