"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import { grey } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { MyList } from './MyList';
import { FriendList } from './FriendList';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import LogoutIcon from '@mui/icons-material/Logout';
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
import { blue } from '@mui/material/colors';
import { getOption } from '@/app/Common/option';
import { Button } from '@mui/material';

interface userData {
    userId: string,
    myIntro: string,
    id: number,
    userName: string,
    userBirth: Date,
    imgUrl: string,
    imgId : number
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function MyPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const [user, setUser] = useState<userData>();
    const router = useRouter();
    const { id } = useParams();


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        let userData = cookies.userData;
        if (!userData) {
            alert('로그인이 필요한 서비스입니다');
            router.push('/Sign/login');
        } else {
            getMyData();
        }
    }, []);

    const getMyData = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getFriendOne/${id}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setUser(res.data[0])
                } else {
                    alert('에러 발생');
                    window.history.go(-1);
                }

            }
            );
    }

    const speedDialButton = () => {
        if (value == 0) {
            return (
                <Box>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        onClick={() => { router.push('/myPage/write') }}
                        sx={{ position: 'fixed', top: '80%', right: '16px', color: grey[900] }}
                        icon={<EditIcon fontSize='small' sx={{ color: grey }} />}
                        style={{ color: 'black' }}
                    >
                    </SpeedDial>
                </Box>
            )
        } else if (value == 1) {
            return (
                <Box>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        onClick={() => { router.push('/searchId') }}
                        sx={{ position: 'fixed', top: '80%', right: '16px', color: grey[900] }}
                        icon={<SpeedDialIcon sx={{ color: grey }} />}
                        style={{ color: 'black' }}
                    >
                    </SpeedDial>
                </Box>
            );
        }
    }

    const logOut = () => {
        const ok = confirm("Are you sure you want to log out?");

        if (ok) {

            removeCookie('userData', { path: '/' });
            router.push('/');
        }

    }

    const [open, setOpen] = React.useState(false);
    //   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        // setSelectedValue(value);
    };
    function SimpleDialog(props: SimpleDialogProps) {
        const { onClose, selectedValue, open } = props;

        const handleClose = () => {
            onClose(selectedValue);
        };

        const handleListItemClick = (value: string) => {
            onClose(value);
        };

        return (
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{selectedValue}</DialogTitle>
                <div className="filebox" style={{ marginTop: '1rem' }}>
                    <input className="upload-name" placeholder="첨부파일" />
                    <label htmlFor="file">파일찾기</label>
                    <input type="file" id="file" multiple onChange={uploadToClient} />
                </div>
                <Button onClick={uploadImgClient} style={{background:'black',fontWeight:'bold',marginTop:'0.5rem',color:'white'}}>upload</Button>
            </Dialog>
        );
    }

    const [image,setImage] = useState<any>();

    const uploadToClient = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setImage(img);
        }
       
    };

    const uploadImgClient = async () => {
     
        const body = {
          name:
            "client/" + Math.random().toString(36).substring(2, 11) + image.name,
          type: image.type,
        };

        const imgArr = new Array();

        imgArr.push(body)
    
        try {
          const urlRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/client`, {
            method: "POST",
            body: JSON.stringify(imgArr),
          });
          const data = await urlRes.json();
          const signedUrl = data.url;
    
          
          
          const uploadRes = await fetch(signedUrl[0], {
            method: "PUT",
            body: image,
            headers: {
              "Content-type": image.type,
            },
          });
    
          console.log(uploadRes);

          profileImgUpload(uploadRes.url.split('?')[0]);
        } catch (err) {
          console.log(err);
        }
    };

    const profileImgUpload = async (imgUrl:string) => {
        try{
            const body = {
                exImgId : user?.imgId, 
                newImgUrl:imgUrl,
                userId:user?.id 
            }

            const option = getOption("POST",body)
            const res:any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/uploadImg`, option);
            console.log(res);

            if(res.status===200){
                setOpen(false);
                alert('등록 완료');
                getMyData();
            }else{
                alert('에러 발생');
                return;
            }
        }catch(err){
            console.log(err);
            alert('에러 발생');
            return;
        }
    }
    return (
        <>
            <header className='card_myPage' style={{ height: '13rem', padding: '1rem', }}>
                <div style={{ width: '7rem', height: '7rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                    <img onClick={handleClickOpen} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={user?.imgUrl} />

                </div>
                <div className='profile' style={{ float: 'left', marginLeft: '2rem', width: '10rem' }} >
                    <h1>{user?.userName}</h1>
                    <span>{user?.userId}</span>
                </div>
                <div style={{ float: 'left', marginTop: '2rem' }}><LogoutIcon onClick={logOut} /></div>
                <div className='hamadi' style={{ display: 'inline-block', width: '100%', marginTop: '1.5rem' }}>
                    {user?.myIntro}
                </div>
            </header>

            <div className='Tab' style={{ height: '3rem', textAlign: 'center', marginTop: '0.7rem' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered variant="fullWidth" >
                            <Tab label="My list" {...a11yProps(0)} />
                            <Tab label="Friends" {...a11yProps(1)} />
                            <Tab label="Groups" {...a11yProps(2)} />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={value} index={0}>
                        <MyList />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <FriendList />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>
            </div>

            {/* <div style={{ background: 'green' }}>
                board
                <button onClick={() => console.log(cookies)}>test</button>
            </div> */}

            {/* <Box>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    onClick={() => { router.push('/myPage/write') }}
                    sx={{ position: 'fixed', top: '80%', right: '16px', color: grey[900] }}
                    icon={<EditIcon fontSize='small' sx={{ color: grey }} />}
                    style={{ color: 'black' }}
                >
                </SpeedDial>
            </Box> */}
            {speedDialButton()}

            <SimpleDialog
                selectedValue={'User profile image upload'}
                open={open}
                onClose={handleClose}
            />
        </>
    )
}
