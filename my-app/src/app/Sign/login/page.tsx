"use client"

import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function Login() {
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = () => {
        console.log(userId);
        console.log(password);

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, password })
        }
        fetch(`http://localhost:3000/api/user/`,option)
            // .then((res) => res.json())
            // .then((res) => {console.log(res)});
    }
    return (
        <>
            <TextField id="outlined-basic" label="ID" variant="outlined" onChange={(e: any) => setUserId(e.target.value)} />
            <TextField id="filled-basic" label="PASSWORD" variant="outlined" onChange={(e: any) => setPassword(e.target.value)} />
            <button onClick={() => login()}>로그인</button>
        </>
    );
}