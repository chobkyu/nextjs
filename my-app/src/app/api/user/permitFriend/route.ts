import { NextRequest, NextResponse } from "next/server";
import { queryPromise } from "../../config/queryFunc";

export async function GET(request:NextRequest){
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

    const urlQry = request.nextUrl.searchParams;

    const userId = urlQry.get('userId');
    const friendId = urlQry.get('friendId');

    try{
        //check friend
        const check = await checkFriend(userId, friendId);
        
        if(!check.success) return NextResponse.json({status:201,success:false,msg:'이미 친구인 사이입니다.'});

        await connection.beginTransaction()

        const insQry1 = `insert into friends(userId, friendId) values (${userId},${friendId})`;
        const insQry2 = `insert into friends(userId, friendId) values (${friendId},${userId})`;
        const insQry3 = `update invite set yesFlag=true where fromId = ${friendId} and toId=${userId}`;

        const qry1 = await connection.query(insQry1);
        const qry2 = await connection.query(insQry2);
        const qry3 = await connection.query(insQry3);

        await connection.commit();

        return NextResponse.json({status:201,success:true});
    }catch(err){
        console.log(err);
        await connection.rollback();
        return NextResponse.json({err})
    }finally{
        connection.release();
    }
}


const checkFriend = async (userId:any, friendId:any) => {
    try{
        let qryStr = `select * from friends where userId = ${userId} and friendId = ${friendId}`

        const res:any = await queryPromise(qryStr);

        if(res.length>0) return {success:false};
        else return {success:true};
    }catch(err){
        console.log(err);
        return {success:false};
    }
}