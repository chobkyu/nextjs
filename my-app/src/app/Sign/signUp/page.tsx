"use client"

import { Backdrop, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export interface userDto {
    userId: string,
    userPw: string,
    userName: string,
    birth: string;
}

const ariaLabel = { 'aria-label': 'description' };

export default function SignUp() {
    const router = useRouter();

    const [user, setUser] = useState<userDto>({
        userId: '',
        userPw: '',
        userName: '',
        birth: ""
    });

    const signUpToServer = () => {
        handleOpen();
        console.log(user);
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signUp`, option)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                if (res.status == 500) {
                    if (res.msg == '중복 ID') {
                        alert('사용 불가한 아이디입니다.');
                        handleClose();
                        return;
                    }
                } else if (res.status == 201) {
                    alert('로그인 해주세요')
                    handleClose();
                    router.push('/');

                } else {
                    return;
                }
            }
            );
    }

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <div style={{ textAlign: 'center', marginTop: '10rem' }}>

            <h2>Sign Up!</h2>
            <p>
                <Input placeholder='ID' name='userId' inputProps={ariaLabel} onChange={onchange} />
            </p>
            <p>
                <Input placeholder='PASSWORD' type='password' name='userPw' inputProps={ariaLabel} onChange={onchange} />
            </p>
            <p>
                <Input placeholder='NAME' name='userName' inputProps={ariaLabel} onChange={onchange} />
            </p>
            <p>
                <Input placeholder='BIRTH' name='birth' type='date' style={{ width: '12.5rem' }} inputProps={ariaLabel} onChange={onchange} />
            </p>
            <p>
                <Button onClick={() => signUpToServer()} style={{ background: 'black', fontWeight: 'bold', color: 'white' }} size='large'>sign up</Button>
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

            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    )
}