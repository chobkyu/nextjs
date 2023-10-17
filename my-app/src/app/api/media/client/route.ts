import { NextResponse } from "next/server";
import { getSignedFileUrl } from "../../board/s3url/s3";

export async function POST(request:Request){
    console.log('-------------------- img upload ------------------------------');
    const body = await request.json();
    console.log(body);

    try{
        let {name,type} = body;

        const fileParams = {
            name:name,
            type:type,
        };

        const signedUrl = await getSignedFileUrl(fileParams);

        console.log(signedUrl);

        return NextResponse.json({
            msg:"make url succeed",
            status:201,
            url:signedUrl
        })
    }catch(err){
        console.log(err);
        return NextResponse.json({err});
    }
}