"use client"

import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import { useEffect, useState } from 'react';
import { checkCookie } from '../Common/checkCookie';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const ariaLabel = { 'aria-label': 'description' };

export default function SearchId() {
    const [cookies,setCookie, removeCookie] = useCookies(['userData']);
    const router = useRouter();
    const [friendId, setFriendId] = useState<string>('');

    useEffect(()=> {
        const check = checkCookie(cookies.userData);
        if(!check){
            alert('로그인이 필요한 서비스입니다.');
            router.push('/login');
        }
    },[]);

    const searchUser = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/searchFriends/${friendId}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            }
        );
    }

    return (
        <>
            <header style={{textAlign:'center'}}>
                <p>
                    <Input placeholder="Type your friend's id" style={{marginTop:'1.5rem'}} inputProps={ariaLabel} onChange={(e:any) => setFriendId(e.target.value) }/>
                </p>
                <Button variant="contained"  style={{background:'black',fontWeight:'bold',}} size='large' onClick={searchUser}>search</Button>
            </header>
            <div>
                
            </div>
        </>
    )
}