import { NextResponse } from "next/server";


export async function POST(request:Request){
    const body = await request.json();

    const { userId, groupId } = body;

    let updInvite = `
        update groupInvite 
        set permit = true
        where userId = ${userId}
        and groupId = ${groupId}
    `;

    let insertMem = `
        insert into groupMem (follow,userId,groupId)
        values (true, ${userId},${groupId});
    `;
    
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

        await connection.query(updInvite);
        await connection.query(insertMem);

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