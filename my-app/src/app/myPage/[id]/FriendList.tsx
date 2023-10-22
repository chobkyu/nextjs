"use client"

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useParams, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface friendList {
    user: number,
    userId: string,
    userName: string,
    friend: number,
    friendId: string,
    friendName: string,
    imgUrl: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height:'100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function FriendList() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const [friendList, setFriendList] = useState<friendList[]>([]);
    const router = useRouter();
    const { id } = useParams();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const getList = async () => {
        const userId = cookies.userData.id;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getFriends/${id}`,{ cache: 'no-cache' })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setFriendList(res.data);
            });
    }

    useEffect(() => {
        getList();
    }, []);

    const moveToFriend = (id: number) => {
        console.log(id)
        //handleOpen();
        //window.open(`/userPage/${id}`, "_blank", "noopener, noreferrer");


        router.push(`/userPage/${id}`);
    }

    const frinedListComponent = (friend: friendList) => {
        return (
            <>
                <div style={{ height: '3rem', marginTop: '0.5rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={friend?.imgUrl} />

                    </div>
                    <div style={{ marginLeft: '1rem', float: 'left' }} onClick={() => moveToFriend(friend?.friend)}>
                        <h3 style={{ padding: '0.01rem', margin: '0.2rem' }}>{friend?.friendName}</h3>
                        <span style={{ margin: '0.2rem' }}>{friend?.friendId}</span>
                    </div>
                    {/* <div style={{ float:'left' }}>
                    <Avatar alt="Remy Sharp"
                        src="https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5875129.png"
                        sx={{ width: 36, height: 36 }} />

                </div> */}
                    {/* <div className='profile' style={{ float: 'left', marginLeft: '1rem', marginTop: '0.5rem', width: '10rem', padding: '0.01rem' }} >


                </div>  */}
                </div>
                <Divider style={{ marginTop: '1.2rem', width: '100%' }} />
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