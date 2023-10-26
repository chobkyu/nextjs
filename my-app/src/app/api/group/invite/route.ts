import { NextResponse } from "next/server";

const connection = require('../../config/db');

interface invite{
    userId:number,
    groupId : number,
}
export async function POST(request:Request){
    const body = await request.json();

    const { userId, groupId } = body;

    let qryStr = `insert into groupInvite(userId, groupId)
                values (${userId}, ${groupId})`;

    try{
        await connection.query(qryStr);

        return NextResponse.json({status:201,success:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}