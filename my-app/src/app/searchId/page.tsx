"use client"

import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import { useEffect, useState } from 'react';
import { checkCookie } from '../Common/checkCookie';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';
import { getOption } from '../Common/option';


const ariaLabel = { 'aria-label': 'description' };

interface searchFriendList {
    user: number,
    userId: string,
    userName: string,
    imgUrl: string
}
 
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}




export default function SearchId() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const router = useRouter();
    const [friendId, setFriendId] = useState<string>('');
    const [friendList, setFriendList] = useState<searchFriendList[]>([]);

    useEffect(() => {
        const check = checkCookie(cookies.userData);
        if (!check) {
            alert('로그인이 필요한 서비스입니다.');
            router.push('/login');
        }
    }, []);

    const searchUser = () => {
        let user = cookies.userData;
        const userId = user.id;
        console.log(friendId);
        if (friendId == '') {
            alert('검색어를 입력해주세요');
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/searchFriends?searchId=${friendId}&userId=${userId}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setFriendList(res.data);
                }
            }
            );
    }

    const moveToFriend = (id: number) => {
        console.log(id)
        //handleOpen();
        //window.open(`/userPage/${id}`, "_blank", "noopener, noreferrer");


        //router.push(`/userPage/${id}`);
    }

    const addFriend = (id: number) => {
        const friendId = id;
        const userId = cookies.userData.id;

        const obj = { userId, friendId };

        const option = getOption('POST', obj);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/askFriend`, option)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.success) {
                    alert('친구 신청 완료');
                    return;
                } else {
                    console.log(res.err);
                    alert(res.msg);
                    return;
                }
            }
            );


    }

    const frinedListComponent = (friend: searchFriendList) => {
        return (
            <div>
                <div style={{ height: '3rem', marginTop: '0.5rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={friend?.imgUrl} />

                    </div>
                    <div style={{ marginLeft: '1rem', float: 'left', width: "60%" }} onClick={() => moveToFriend(friend?.user)}>
                        <h3 style={{ padding: '0.01rem', margin: '0.2rem' }}>{friend?.userName}</h3>
                        <span style={{ margin: '0.2rem' }}>{friend?.userId}</span>
                    </div>
                    <div style={{ float: 'left', marginTop: '4%' }}>
                        <Button variant="contained" style={{ background: '#3f3c3c', fontWeight: 'bold', }} size='small' onClick={() => addFriend(friend?.user)}>Add</Button>
                    </div>
                 
                </div>
                <Divider style={{ marginTop: '1.2rem', width: '100%' }} />
            </div>


        )
    }

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };



    return (
        <>
            <header style={{ textAlign: 'center' }}>
                
                <Input placeholder="Type your friend's id" style={{ marginTop: '1.5rem' }} inputProps={ariaLabel} onChange={(e: any) => setFriendId(e.target.value)} />
               
                <Button variant="contained" style={{ background: 'black', fontWeight: 'bold',display:'block',marginLeft:'35%',marginTop:'0.5rem' }} size='large' onClick={searchUser}>search</Button>
            </header>
            <Divider style={{ marginTop: '0.5rem' }} />
            <div>
                {friendList.map((friend) => (
                    frinedListComponent(friend)
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <Button variant="contained" style={{ background: 'black', fontWeight: 'bold', }} size='large' onClick={handleClickOpen}>frined someone </Button>
            </div>
        
        </>
    )
}