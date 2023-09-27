"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { useCookies } from 'react-cookie';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';




export default function ReadOne(props: any) {

    const [board, setBoard] = useState<any>();
    const router = useRouter();
    const { id } = useParams();
    const outerTheme = useTheme();


    const getList = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getOne/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    setBoard(res.data);
                });

        } catch (err) {
            console.log(alert);
            alert('error');
            window.history.go(-1)
        }
    }

    useEffect(() => {
        console.log(id);
        getList();
    }, []);

    const contents = () => {
        return (
            `${board?.contents}`

        )
    }

    return (
        <div style={{ marginLeft: '1rem', marginTop: '2rem' }}>
            <header>
                <div>
                    <h1>{board?.title}</h1>

                </div>
                <div style={{ float:'left' }}>
                    <Avatar alt="Remy Sharp"
                        src="https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5875129.png"
                        sx={{ width: 36, height: 36 }} />

                </div>
                <div className='profile' style={{ float: 'left', marginLeft: '1rem',marginTop:'0.5rem', width: '10rem',padding:'0.01rem' }} >
                    <span>{board?.name}</span>

                </div>
            </header>

            <div style={{ marginLeft: '17%', marginTop: '6rem', }}>
                {/* <Button variant="contained" onClick={()=>{}} style={{background:'#3f3c3c',width:'7.5rem',fontWeight:'bold'}} size='large'>Submit</Button> */}
                <Button variant="contained" onClick={() => window.history.go(-1)} style={{ background: '#3f3c3c', width: '13rem', fontWeight: 'bold', marginLeft: '0.5rem' }} size='large'>Back</Button>

            </div>

        </div>
    )
}