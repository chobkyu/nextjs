"use client"

import { getOption } from "@/app/Common/option"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


interface board {
    user: number,
    userId: string,
    userName: string,
    boardId: number,
    title: string,
    contents: string,
    isModified: boolean,
    dateTime: Date,
    thumbnail: string,
}

export function MyList() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const [board, setBoard] = useState<board[]>([]);

    const getList = async () => {
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
    }, []);

    return (
        <>
            <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
                {board.map((boardOne) => (
                    <ImageListItem key={boardOne.thumbnail}>
                        <img
                            srcSet={`${boardOne.thumbnail}`}
                            src={`${boardOne.thumbnail}`}
                            alt={boardOne.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )

}