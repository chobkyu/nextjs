"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReadOne(props:any) {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getOne/${props.params.id}`,{cache:'no-store'});
    // const topic = await res.json();
    const [board, setBoard ] = useState<any>();
    const router = useRouter();
    const { id } = useParams();
    const getList = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getOne/${id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => res.json())
            .then((res) => {
                console.log(res)
                setBoard(res.data);
            });
            
        }catch(err){
            console.log(alert);
            alert('error');
            window.history.go(-1)
        }
    }

    useEffect(()=>{
        console.log(id);
        getList();
    },[]);
    
    return(
        <>
            <button onClick={()=>console.log(board)}>?</button>
            hi
        </>
    )
}