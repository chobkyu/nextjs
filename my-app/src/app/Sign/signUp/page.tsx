"use client"

import { TextField } from "@mui/material";
import { useState } from "react";
import Input from '@mui/material/Input';
import { Button } from '@mui/material';

export interface userDto {
    userId: string,
    userPw: string,
    userName: string,
    birth: string;
}

const ariaLabel = { 'aria-label': 'description' };

export default function SignUp() {

    const [user, setUser] = useState<userDto>({
        userId: '',
        userPw: '',
        userName: '',
        birth: ""
    });

    const signUpToServer = () => {
        console.log(user);
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        }

        console.log(option)

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signUp`, option)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
            }
            ); 
    }

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    return (
        <div style={{ textAlign: 'center', marginTop: '10rem' }}>

            <h2>Sign Up!</h2>
            <p>
                <Input placeholder='ID' name='userId' inputProps={ariaLabel} onChange={onchange}/>
            </p>
            <p>
                <Input placeholder='PASSWORD' type='password' name='userPw' inputProps={ariaLabel} onChange={onchange}/>
            </p>
            <p>
                <Input placeholder='NAME' name='userName' inputProps={ariaLabel} onChange={onchange}/>
            </p>
            <p>
                <Input placeholder='BIRTH' name='birth' type='date' style={{width:'12.5rem'}} inputProps={ariaLabel} onChange={onchange}/>
            </p>
            <p>
                <Button onClick={() => signUpToServer()} style={{background:'black',fontWeight:'bold',color:'white'}} size='large'>sign up</Button>
            </p>
            {/* <p>
                <input id="outlined-basic" placeholder="ID" name="userId" onChange={onchange}/>
            </p>
            <p>
                <input id="outlined-basic" placeholder="PASSWORD" name="userPw" onChange={onchange}/>
            </p>
            <p>
                <input id="outlined-basic" placeholder="NAME" name="userName" onChange={onchange}/>
            </p>
            <p>
                <input id="outlined-basic" placeholder="BIRTH" name="userBirth" onChange={onchange}/>
            </p> */}


        </div>
    )
}