"use client"

import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';

const ariaLabel = { 'aria-label': 'description' };
export default function Login() {
    const router = useRouter();


    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = () => {
        console.log(userId);
        console.log(password);
        console.log(process.env.NEXT_PUBLIC_API_URL)
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, password })
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`, option)
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    router.push('/');
                } else {
                    alert('로그인 실패');
                    return;
                }
            }
            );
    }
    return (
        <div style={{textAlign:'center',marginTop:'12rem'}}>
            {/* <TextField id="outlined-basic" label="ID" variant="outlined" onChange={(e: any) => setUserId(e.target.value)} />
            <TextField id="filled-basic" label="PASSWORD" variant="outlined" onChange={(e: any) => setPassword(e.target.value)} />
             */}
            <h2>Sign In!</h2>


            <p>
                <Input placeholder='ID' inputProps={ariaLabel} onChange={(e: any) => setUserId(e.target.value)}/>
            </p>
            <p>
                <Input placeholder='PASSWORD' style={{marginTop:'1.5rem'}} inputProps={ariaLabel} onChange={(e: any) => setPassword(e.target.value)}/>
            </p>
            <Button variant="contained" onClick={() => login()} style={{background:'black',fontWeight:'bold'}} size='large'>Login</Button>

        </div>
    );
}