"use client"

import { TextField } from "@mui/material";
import { useState } from "react";

export interface userDto {
    userId: string,
    userPw: string,
    userName: string,
    birth: string;
}

export default function SignUp() {

    const [user, setUser] = useState<userDto>({
        userId:'',
        userPw:'',
        userName:'',
        birth:""
    });

    const signUpToServer = () => {
        console.log(user);
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( user )

        }

        console.log(option)

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signUp`, option)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
            }
        );
    }

    const onchange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({...user,[name]:value});
    }
    return (
        <>


            <p>
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
            </p>
            <p>
                <button onClick={() => signUpToServer()}>sign up</button>
            </p>

        </>
    )
}