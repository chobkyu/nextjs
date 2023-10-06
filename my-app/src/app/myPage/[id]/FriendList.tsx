"use client"

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';

interface friendList {
    user: number,
    userId: string,
    userName: string,
    friend: number,
    friendId: string,
    friendName: string,
    imgUrl:string
}

export function FriendList() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const [friendList, setFriendList] = useState<friendList[]>([]);
    const router = useRouter();

    const getList = async () => {
        const userId = cookies.userData.id;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getFriends/${userId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setFriendList(res.data);
            });
    }

    useEffect(() => {
        getList();
    }, []);

    const moveToFriend = (id:number) => {
        console.log(id)
        window.open(`/userPage/${id}`, "_blank", "noopener, noreferrer");

       
        // router.push(`/userPage/${id}`);
    }

    const frinedListComponent = (friend: friendList) => {
        return (
            <>
              <div style={{height:'3rem',marginTop:'0.5rem'}}>
                 <div style={{ width: '3rem', height: '3rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={friend?.imgUrl} />
                    
                </div>
                <div style={{marginLeft:'1rem',float:'left'}} onClick={()=>moveToFriend(friend?.friend)}>
                    <h3 style={{padding:'0.01rem',margin:'0.2rem'}}>{friend?.friendName}</h3>
                    <span style={{margin:'0.2rem'}}>{friend?.friendId}</span>
                </div>
                {/* <div style={{ float:'left' }}>
                    <Avatar alt="Remy Sharp"
                        src="https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5875129.png"
                        sx={{ width: 36, height: 36 }} />

                </div> */}
                {/* <div className='profile' style={{ float: 'left', marginLeft: '1rem', marginTop: '0.5rem', width: '10rem', padding: '0.01rem' }} >


                </div> */}
            </div>
            <Divider style={{marginTop:'1.2rem',width:'100%'}}/>
            </>
          

        )
      }

    return (
        <div>
            {friendList.map((friend) => (
                frinedListComponent(friend)
            ))}
        </div>
    );
}