"use client"

import { getOption } from "@/app/Common/option";
import { Button, Divider, Input } from "@mui/material"
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";

interface searchFriendList {
    user: number,
    userId: string,
    userName: string,
    imgUrl: string
}

export default function InviteGroup() {
    const [inviteList, setInviteList] = useState<searchFriendList[]>([]);
    const [friendId, setFriendId] = useState<string>('');
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const { id } = useParams();

    const searchUser = () => {
        let user = cookies.userData;
        const userId = user.id;
        console.log(friendId);
        if (friendId == '') {
            alert('검색어를 입력해주세요');
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/searchId?userId=${friendId}&groupId=${id}&id=${user.id}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setInviteList(res.data);
                }
            }
            );
    }

    const inviteFriend = (friendId:number) => {
        const obj = {
            groupId : id,
            userId : friendId
        }

        const option = getOption("POST",obj);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/invite`,option)
            .then((res)=> res.json())
            .then((res)=> {
                if(res.status ==201){
                    alert('초대가 완료 되었습니다.');
                    return;
                }else{
                    alert('에러 발생');
                    return;
                }
            })
    }

    const frinedListComponent = (friend: searchFriendList) => {
        return (
            <div>
                <div style={{ height: '3rem', marginTop: '0.5rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={friend?.imgUrl} />

                    </div>
                    <div style={{ marginLeft: '1rem', float: 'left', width: "60%" }} >
                        <h3 style={{ padding: '0.01rem', margin: '0.2rem' }}>{friend?.userName}</h3>
                        <span style={{ margin: '0.2rem' }}>{friend?.userId}</span>
                    </div>
                    <div style={{ float: 'left', marginTop: '4%' }}>
                        <Button variant="contained" style={{ background: '#3f3c3c', fontWeight: 'bold', }} onClick={()=>inviteFriend(friend.user)} size='small' >Add</Button>
                    </div>
                 
                </div>
                <Divider style={{ marginTop: '1.2rem', width: '100%' }} />
            </div>


        )
    }

    return (
        <>
            <header style={{ textAlign: 'center' }}>

                <Input placeholder="Type your friend's id" style={{ marginTop: '1.5rem' }} onChange={(e: any) => setFriendId(e.target.value)} />

                <Button variant="contained" style={{ background: 'black', fontWeight: 'bold', display: 'block', marginLeft: '35%', marginTop: '0.5rem' }} size='large' onClick={searchUser}>search</Button>
            </header>
            <Divider style={{ marginTop: '0.5rem' }} />
            <div>
                {inviteList.map((friend) => (
                    frinedListComponent(friend)
                ))}
            </div>
        </>
    )
}