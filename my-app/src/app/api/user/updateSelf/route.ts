import { NextResponse } from "next/server";
import { queryPromise } from "../../config/queryFunc";
const connection = require('../../config/db');

export async function POST (request:Request) {
    const body = await request.json();

    const { id, selfIntro } = body;

    const qryStr = `
        update user set myIntro = '${selfIntro}' where id = ${id}
    `;
    try{
        await connection.query(qryStr);

        return NextResponse.json({status:201, success:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({err,success:false})
    }
}