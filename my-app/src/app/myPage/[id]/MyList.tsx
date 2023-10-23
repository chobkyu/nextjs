"use client"

import { getOption } from "@/app/Common/option"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useParams, useRouter, usePathname } from "next/navigation";

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

interface group{
    groupBoardId : number,
    title : string,
    contents : string,
    dateTime : Date,
    thumbnail : string
}

const colorArr = [
    '#9044f4',
    '$81F712',
    '#D0EE17',
    '#F52E7F',
    '#27D4B6',
    '#FF0081',
    '#FF9B00',
    '#FC00FF',
    '#00FFA0',
    '#95FF00',
    '#008FFF',
    '#5B5EFC',
    '#37D0FD',
    '#FFE699',
    '#90FFCA',
    '#FF7878',
]

export function MyList() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const [board, setBoard] = useState<board[]>([]);
    const [group,setGroup] = useState<group[]>([]);
    const router = useRouter();
    const { id } = useParams();
    const pathname = usePathname();

    const getList = async () => {
        const userId = cookies.userData.id;
        const option = getOption('GET');

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getList/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setBoard(res.datas);
            })
    }

    const getGroupList =async () => {
        const userId = cookies.userData.id;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/read?userId=${userId}&groupId=${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setBoard(res.datas);
            })    
    }

    useEffect(() => {
        const path = pathname.split('/',2)[1];

        if(path==='groupPage'){
            getGroupList();
        }else{
            getList();
        }
    }, []);

    const readBoard = (id: number) => {
        router.push(`/myPage/read/${id}`);
    }

    const getColor = () => {
        const idx = Math.floor(Math.random()*16);
        //console.log(idx);
        return colorArr[idx];
    }
    const ImageListComponent = (boardOne: board) => {
        
        if (boardOne.thumbnail != null) {
            return (
                <ImageListItem key={boardOne.thumbnail} onClick={() => readBoard(boardOne.boardId)}>
                    <img
                        srcSet={`${boardOne.thumbnail}`}
                        src={`${boardOne.thumbnail}`}
                        alt={boardOne.title}
                        loading="lazy"
                    />
                </ImageListItem>)
        } else {
            const width = getWidth();
            return (
                <div style={{ display: 'inline-block', height: '10.25rem',width:`${width}`, background:getColor()}} onClick={() => readBoard(boardOne.boardId)}>
                    <h4 style={{ marginTop: '1rem' }}>{boardOne.title}</h4>
                </div>
            )
        }
    }

    const ImageGroupListComponent = (boardOne: group) => {
        
        if (boardOne.thumbnail != null) {
            return (
                <ImageListItem key={boardOne.thumbnail} onClick={() => readBoard(boardOne.groupBoardId)}>
                    <img
                        srcSet={`${boardOne.thumbnail}`}
                        src={`${boardOne.thumbnail}`}
                        alt={boardOne.title}
                        loading="lazy"
                    />
                </ImageListItem>)
        } else {
            const width = getWidth();
            return (
                <div style={{ display: 'inline-block', height: '10.25rem',width:`${width}`, background:getColor()}} onClick={() => readBoard(boardOne.groupBoardId)}>
                    <h4 style={{ marginTop: '1rem' }}>{boardOne.title}</h4>
                </div>
            )
        }
    }

    const getWidth = () => {
        console.log(pathname.split('/',2)[1]);  
        const path = pathname.split('/',2)[1];

        if(path==='myPage') {
            return '6.6rem';
        }else{
            return '7.6rem';
        }

    }

    const boardListComponent = () => {
        const path = pathname.split('/',2)[1];

        if(path==='groupPage'){
            return (
                <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={164}>
                    {group.map((boardOne) => (
                        ImageGroupListComponent(boardOne)
                    ))}
                </ImageList>)
    
        }else{
            return (
                <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={164}>
                    {board.map((boardOne) => (
                        ImageListComponent(boardOne)
                    ))}
                </ImageList>)
    
        }

    }

    return (
        <>
            {board?.length > 0 ? boardListComponent() : <h3>아직 게시된 게시물이 없습니다</h3>}
        </>
    )

}