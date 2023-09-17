import React from 'react';
import { useState } from 'react';

export default function myPage()  {
    return (
        <>
            <header style={{background:'#BDBDBD' , height:'13rem',padding:'1rem'}}>
                <div style={{width:'7rem',height:'7rem',borderRadius:'70%',overflow:'hidden',float:'left'}}>
                    <img style={{width:'100%',height:'100%', objectFit:'cover'}} src='https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5875129.png'/>

                </div>
                <div className='profile' style={{float:'left',marginLeft:'2rem',width:'13rem'}} >
                    <h1>이름</h1>
                    <span>아이디</span>
                </div>
                <div className='hamadi' style={{display:'inline-block',width:'100%', marginTop:'1.5rem'}}>
                    적고 싶은 말 한마디
                </div>
            </header>

            <div className='Tab' style={{background:'yellow', height:'3rem'}}>
                내 글, 친구 목록, 그룹 목록 탭
            </div>

            <div style={{background:'green'}}>
                board
            </div>
        </>
    )
}
