import { NextResponse , NextRequest} from 'next/server'
import { queryPromise } from '../../config/queryFunc';
import prisma from '../../../../../lib/prisma';
const connection = require('../../config/db');
//import { Prisma } from "@prisma/client";


export async function POST(request:Request){
    const body = await request.json();

    console.log(body);
    const userId = body.userId;
    const userPassword = body.userPw;
    const name = body.userName;
    const birth = body.birth;

    const check = await checkUser(userId,userPassword);

    if(!check.success){
        return NextResponse.json({status:500, msg:'중복 ID'});
    }
    
    try{
        //const res : any = await connection.query(queryString);
        const res = await prisma.$queryRaw`insert into user (userId, userPw, userName, userBirth)
            values (${userId},${userPassword},${name},${birth}); `;
        
        const { userPw, ...result } = body

        console.log(res);
        const getId = await getUserId(userId,userPw,birth,name)
        insertDefaultImg(getId.id);

        return NextResponse.json({status:201,success:true,data:result});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});

    }
}


//트랜잭션 적용 예정
const insertDefaultImg = async (userId:any) => {
    const defaultImg = 'https://alcoholcocktail.s3.ap-northeast-2.amazonaws.com/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png';

    try{
        const res = await prisma.$queryRaw `insert into userImg ( imgUrl, useFlag, userId ) values (${defaultImg},true,${userId})`

        return NextResponse.json({success:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}


const checkUser = async (userId:string, userPw:string) => {

    try{
        let row: string | any | unknown[]  = [];
        row = await prisma.$queryRaw`select * from user where userId = ${userId}`
        console.log(row);
        
        if(row.length>0){
            return {success:false};
        }else{
            return {success:true};
        }
    }catch(err){
        console.log(err);
        return {success: false, msg:err}
    }
}

const getUserId = async (userId:string,userPw:string,userBirth:string,userName:string) => {
    try{
        //const res : any = await connection.query(queryString);
        const res = await prisma.$queryRaw`select id from user where userId=${userId} and userPw=${userPw} and userName=${userName}`;
        

        console.log(res[0].id);
        return {success:true, id:res[0].id}
    }catch(err){
        console.log(err);
        return {success: false, msg:err}

    }
}