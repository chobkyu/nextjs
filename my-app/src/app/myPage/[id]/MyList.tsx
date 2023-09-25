"use client"

import { getOption } from "@/app/Common/option"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";


interface board {
    user:number,
    userId : string,
    userName:string,
    boardId: number,
    title: string,
    contents: string,
    isModified:boolean,
    dateTime:Date,
    thumbnail:string,
}

export function MyList() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const [board,setBoard] = useState<board[]>([]);
    
    const getList = async  () => {
        const userId = cookies.userData.id;
        const option = getOption('GET');

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getList/${userId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setBoard(res.datas);
            })
    }

    useEffect(() => {
        getList();
    },[]);
    
    return (
        <><button onClick={() => console.log(board)}>test</button></>
    )

}