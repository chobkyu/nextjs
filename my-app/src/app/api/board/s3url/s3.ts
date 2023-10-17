// s3 접근하기 위해 불러옴
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
  } from "@aws-sdk/client-s3";
  // presigned url 이용하기 위해 불러옴
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  
  // .env에서 aws 정보 읽어오기
  const awsAccessKey:any = process.env.S3_UPLOAD_KEY;
  const awsSecretKey:any = process.env.S3_UPLOAD_SECRET;
  const awsS3Bucket = process.env.S3_UPLOAD_BUCKET ;
  const awsS3BucketRegion = process.env.S3_UPLOAD_REGION;
  
  // s3 클라이언트 연결
  const s3 = new S3Client({
    credentials: {
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretKey,
    },
    region: awsS3BucketRegion,
  });
  
  // file signedUrl 가져오기
  export async function getSignedFileUrl(data:any) {
    const params = {
      Bucket: awsS3Bucket,
      Key: data.name,
    };
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });
    return url;
  }
  
  // 파일 업로드
  export async function uploadFile(fileBuffer:any, fileName:any, mimetype:any) {
    const uploadParams = {
      Bucket: awsS3Bucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimetype,
    };
  
    const res = await s3.send(new PutObjectCommand(uploadParams));
    return res.$metadata.httpStatusCode;
  }