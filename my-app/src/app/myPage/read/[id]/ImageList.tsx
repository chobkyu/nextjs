"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

interface imgListOne {
    id: number;
    imgUrl: string;
    boardId: number;
}

export default function ImgList() {
    const { id } = useParams();
    const [loading,setLoading] = useState<boolean>(false);
    const [imgList, setImgList] = useState<imgListOne[]>([]);

    const getImgList = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getImgList/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json())
            .then((res) => {
                console.log(res)
                setImgList(res.data);
                setLoading(true);
            });
    }

    useEffect(() => {
        getImgList();
    }, []);

    return (
        <>
            {imgList.length>0 && loading? 
            <ImageList sx={{ width: '100%', height: 'auto' }} cols={1} rowHeight={'auto'}>
                {imgList.map((item) => (
                    <ImageListItem key={item?.id}>
                        <img
                            srcSet={item?.imgUrl}
                            src={`${item.imgUrl}?w=164&h=164&fit=crop&auto=format`}
                            //   alt={item.title}
                            style={{width:'100%',height:'auto'}}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList> : null}
            
        </>

    )
}