import { NextResponse } from "next/server";

const connection = require('../../../config/db');

export async function GET(request:Request, context:{params:any}){
    const id = context.params.id;

    let qryStr = `
        select *
        from groupName
        where id = ${id}
    `;

    try{
        const res = await connection.query(qryStr);
        return NextResponse.json({status:200,success:true,data:res});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}