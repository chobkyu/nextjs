"use client"

import { useTheme } from "@emotion/react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import { Button } from "@mui/material";
import ImgList from "@/app/myPage/read/[id]/ImageList";

interface groupBoardRead {
    id :number,
    title : string,
    contents:string,
    dateTime : Date,
    groupId:number,
    userId : string,
    userName:string,
    imgUrl : string,

}
export default function GroupRead() {
    const [board, setBoard] = useState<groupBoardRead>();
    const router = useRouter();
    const { id } = useParams();
    const outerTheme = useTheme();


    const getList = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/read/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    setBoard(res.data[0]);
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


    return (
        <div style={{ marginLeft: '1rem', marginTop: '2rem' }}>
            <header>
                <div>
                    <h1>{board?.title}</h1>

                </div>
                <div style={{ float: 'left' }}>
                    <Avatar alt="Remy Sharp"
                        src={board?.imgUrl}
                        sx={{ width: 36, height: 36 }} />

                </div>
                <div className='profile' style={{ float: 'left', marginLeft: '1rem', marginTop: '0.5rem', width: '10rem', padding: '0.01rem' }} >
                    <span>{board?.userName}</span>

                </div>
            </header>
            <div className="card_myPage" style={{ width: '86%', height: 'auto', marginTop: '2rem', padding: '1rem', overflow: "auto" }}>
                {/* {board?.imgUrl != null ? <>
                    <img src={board.imgUrl[0]}></img>
                </>: null} */}

                <ImgList />
                <pre>{board?.contents}</pre>
            </div>
            <div style={{ marginLeft: '17%', marginTop: '2rem', }}>
                {/* <Button variant="contained" onClick={()=>{}} style={{background:'#3f3c3c',width:'7.5rem',fontWeight:'bold'}} size='large'>Submit</Button> */}
                <Button variant="contained" onClick={() => window.history.go(-1)} style={{ background: '#3f3c3c', width: '13rem', fontWeight: 'bold', marginLeft: '0.5rem' }} size='large'>Back</Button>

            </div>

        </div>
    )
}