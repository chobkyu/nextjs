import { NextResponse , NextRequest} from 'next/server'
import { queryPromise } from '../../config/queryFunc';


export async function POST(request:Request){
    const body = await request.json();

    console.log(body);
    const userId = body.userId;
    const userPw = body.userPw;
    const name = body.userName;
    const birth = body.birth;

    const check = await checkUser(userId,userPw);

    if(!check.success){
        return NextResponse.json({status:500, msg:'중복 ID'});
    }

    

    let queryString = `insert into user (userId, userPw, userName, userBirth)
                     values ('${userId}','${userPw}','${name}','${birth}'); `;

    
    try{
        const res : any = await queryPromise(queryString);

        const { userPw, ...result } = body

        insertDefaultImg(res.insertId)

        return NextResponse.json({status:201,success:true,data:result});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});

    }
}

const insertDefaultImg = async (userId:any) => {
    const defaultImg = 'https://alcoholcocktail.s3.ap-northeast-2.amazonaws.com/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png';
    let queryString = `insert into userImg ( imgUrl, useFlag, userId ) values ('${defaultImg}',true,${userId})`;

    try{
        const res = await queryPromise(queryString);

        return NextResponse.json({success:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}


const checkUser = async (userId:string, userPw:string) => {
    let queryString = `select * from user where userId = '${userId}'`;

    try{
        let row: string | any | unknown[]  = [];
        row = await queryPromise(queryString);
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