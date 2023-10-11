"use client"

import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import { useEffect, useState } from 'react';
import { checkCookie } from '../Common/checkCookie';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import Divider from '@mui/material/Divider';
import { getOption } from '../Common/option';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

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

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const [inviteList, setInviteList] = useState<searchFriendList[]>([]);

    const getInviteList = async () => {
        const userId = cookies.userData.id;


        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getInvite/${userId}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.success) {
                    setInviteList(res.data);
                } else {
                    if (!res.success) {
                        alert(res.msg);
                        return;
                    }
                }
            }
            );
    }

    useEffect(() => {
        getInviteList();
    }, []);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>The one who asked you to be a friend.</DialogTitle>
            <List sx={{ pt: 0 }}>
                {inviteList.map((friend) => (
                    <div key={friend.user} style={{ height: '3rem', marginTop: '0.5rem',marginLeft:'0.5rem' }}>
                        <div style={{ width: '3rem', height: '3rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                            <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={friend?.imgUrl} />

                        </div>
                        <div style={{ marginLeft: '1rem', float: 'left', width: "50%" }}>
                            <h3 style={{ padding: '0.01rem', margin: '0.2rem' }}>{friend?.userName}</h3>
                            <span style={{ margin: '0.2rem' }}>{friend?.userId}</span>
                        </div>
                        <div style={{ float: 'left', marginTop: '4%' }}>
                            <Button variant="contained" style={{ background: '#3f3c3c', fontWeight: 'bold', }} size='small'>Add</Button>
                        </div>
                        {/* <div style={{ float:'left' }}>
            <Avatar alt="Remy Sharp"
                src="https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5875129.png"
                sx={{ width: 36, height: 36 }} />

        </div> */}
                        {/* <div className='profile' style={{ float: 'left', marginLeft: '1rem', marginTop: '0.5rem', width: '10rem', padding: '0.01rem' }} >


        </div> */}
                    </div>
                ))}

            </List>
        </Dialog>
    );
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
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                key={selectedValue}
            />
        </>
    )
}