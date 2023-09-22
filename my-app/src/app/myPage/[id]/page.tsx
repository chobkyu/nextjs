"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

interface userData {
    userId:string,
    myIntro:string,
    id:number,
    userName:string,
    userBirth:Date
}

export default function MyPage()  {
    const [cookies,setCookie, removeCookie] = useCookies(['userData']);
    const [user,setUser] = useState<userData>();
    const router = useRouter();

    useEffect(() => {
        let userData = cookies.userData;
        if( !userData ){
            alert('로그인이 필요한 서비스입니다');
            router.push('/Sign/login');
        }else{
            setUser(userData);
        }
    },[]);
    return (
        <>
            <header style={{background:'#BDBDBD' , height:'13rem',padding:'1rem'}}>
                <div style={{width:'7rem',height:'7rem',borderRadius:'70%',overflow:'hidden',float:'left'}}>
                    <img style={{width:'100%',height:'100%', objectFit:'cover'}} src='https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5875129.png'/>

                </div>
                <div className='profile' style={{float:'left',marginLeft:'2rem',width:'10rem'}} >
                    <h1>{user?.userName}</h1>
                    <span>{user?.userId}</span>
                </div>
                <div className='hamadi' style={{display:'inline-block',width:'100%', marginTop:'1.5rem'}}>
                    {user?.myIntro}
                </div>
            </header>

            <div className='Tab' style={{background:'yellow', height:'3rem'}}>
                내 글, 친구 목록, 그룹 목록 탭
            </div>

            <div style={{background:'green'}}>
                board
                <button onClick={() => console.log(cookies)}>test</button>
            </div>
        </>
    )
}
