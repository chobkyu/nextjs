"use client";

import { getOption } from '@/app/Common/option';
import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
const ariaLabel = { 'aria-label': 'description' };

interface insertData{
    name:string;
    introduction:string;
    imgUrl:string;
    userId:any;
}

export default function InsertGroup(){
    const emptyObj :insertData = {
        name:'',
        introduction:'',
        imgUrl:'',
        userId:'',
    }

    const [image,setImage] = useState<any>();
    const [imgLoading, setImgLoading] = useState<boolean>(true);
    const [imgCount, setImgCount] = useState<string>('첨부파일');
    const [saveGroup, setSaveGroup] = useState<insertData>(emptyObj);
    const {id} = useParams();
 
    const [cookies,setCookie,removeCookie] = useCookies();

    const onchange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const{ name, value } = e.target;
        setSaveGroup({...saveGroup,[name]:value});
    }
    
    const uploadToClient = (e: any) => {
        console.log(e.target.files[0].type);
        if (!e.target.files[0].type.match("image/.*")) {
            alert('이미지 파일만 업로드가 가능합니다.');
            return;
          }

        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setImage(img);
            setImgCount('파일 첨부됨');
        }
       
    };

    const uploadImgClient = async () => {
        console.log(image)
        if(image===undefined){
            alert('모든 사항을 입력해주세요');
            setImgLoading(true);
            return;
        }

        setImgLoading(false);
        const body = {
          name:
            "client/" + Math.random().toString(36).substring(2, 11) + image.name,
          type: image.type,
        };

        const imgArr = new Array();

        imgArr.push(body)
    
        try {
          const urlRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/client`, {
            method: "POST",
            body: JSON.stringify(imgArr),
          });
          const data = await urlRes.json();
          const signedUrl = data.url;
    
          
          
          const uploadRes = await fetch(signedUrl[0], {
            method: "PUT",
            body: image,
            headers: {
              "Content-type": image.type,
            },
          });
    
          console.log(uploadRes);
          insertGroupData(uploadRes.url.split('?')[0]);
          //profileImgUpload(uploadRes.url.split('?')[0]);
        } catch (err) {
          console.log(err);
          setImgLoading(true);
        }
    };

    const noDoubleClick = () => {
        imgLoading ? uploadImgClient() : alert('업로드 중입니다');
    }


    const insertGroupData = async (imgUrl:string) => {
        console.log(id)

        setSaveGroup({...saveGroup,imgUrl:imgUrl,userId:id});
        console.log(saveGroup)
        if(saveGroup.name==''||saveGroup.introduction==''){
            alert('모든 사항을 입력해주세요');
            setImgLoading(true);
            return;
        }

        const option = getOption('POST',saveGroup);

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/insert`, option)
                    .then((res)=>res.json())
                    .then((res)=> {
                        console.log(res);
                        if(res.status==201){
                            alert('등록 완료');
                            setImgLoading(true);
                            setSaveGroup(emptyObj);
                            return;
                        }else{
                            alert(res.msg);
                            setImgLoading(true);
                            return;
                        }
                    })
        ;
    }

    return (
        <>
            <div style={{textAlign:'center', border:'0.01px solid', padding:'10px 10px', borderRadius:'1rem'}}>
                <Input placeholder='Group Name' name='name' onChange={onchange} style={{marginTop:'1rem',width:'60%'}} inputProps={ariaLabel} />
                <Input placeholder='Group Introduction' name= 'introduction' onChange={onchange} multiline style={{marginTop:'2rem',width:'60%'}} inputProps={ariaLabel} />

                <div className="filebox" style={{ marginTop: '2rem' }}>
                    <input className="upload-name" placeholder={imgCount} />
                    <label htmlFor="file">파일찾기</label>
                    <input type="file" id="file" multiple onChange={uploadToClient} />
                </div>
                <Button variant="contained" onClick={noDoubleClick} style={{background:'black',fontWeight:'bold',display:'block',marginLeft:'38%',marginTop:'2rem'}} size='large'>Save</Button>

            </div>
        </>
    )
}