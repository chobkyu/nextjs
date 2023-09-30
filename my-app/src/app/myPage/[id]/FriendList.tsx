"use client"

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface friendList{
    user:number,
    userId: string,
    userName:string,
    friend:number,
    friendId:string,
    friendName:string,
}

export function FriendList () {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const [friendList,setFriendList] = useState<friendList[]>([]);

    const getList = async () => {
        const userId = cookies.userData.id;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getFriends/${userId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setFriendList(res.data);
            });
    }

    useEffect(()=>{
        getList();
    },[]);

    const frinedListComponent = () => {
        
    }

    return (
        <div>

        </div>
    );
}