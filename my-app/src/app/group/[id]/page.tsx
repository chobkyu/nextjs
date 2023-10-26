"use client"

import { Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import InsertGroup from "./insertGroup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { getOption } from "@/app/Common/option";

interface invited{
    name:string,
    introduction:string,
    groupImg:string,
    userId:number,
    groupId:number
}

export default function Group() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const [invitedList, setInvitedList] = useState<invited[]>([]);
    const [insertGroup,setInsertGroup] = useState<boolean>(false);
    const router = useRouter();

    const getList = async (id:number) => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/invite/${id}`,{ cache: 'no-cache' })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setInvitedList(res.data);
            });
    }

    useEffect(()=>{
        let userData = cookies.userData;
        console.log(userData);
        if (!userData) {
            alert('로그인이 필요한 서비스입니다');
            router.push('/Sign/login');
        } else {
            getList(userData.id);
        }
    },[]);

    const permitGroup = (groupId:number) => {
        let userId = cookies.userData.id
        const obj = {
            groupId,userId
        }

        const option = getOption("POST",obj);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/invite/permit/`,option)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(res.success){
                    alert('요청을 수락하셨습니다')
                    router.push(`/groupPage/${groupId}`);
                }else{
                    alert('에러발생');
                    return;
                }
                
            });
    }
    
    const invitedListComponent = (friend: invited) => {
        return (
            <>
                <div style={{ height: '3rem', marginTop: '0.5rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={friend?.groupImg} />

                    </div>
                    <div style={{ marginLeft: '1rem', float: 'left',width: "60%" }} >
                        <h3 style={{ padding: '0.01rem', margin: '0.2rem' }}>{friend?.name}</h3>
                        <span style={{ margin: '0.2rem' }}>{friend?.introduction}</span>
                    </div>
                    <div style={{ float: 'left', marginTop: '4%' }}>
                        <Button variant="contained" style={{ background: '#3f3c3c', fontWeight: 'bold', }} size='small' onClick={() => permitGroup(friend?.groupId)}>Add</Button>
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
        <>
            {/* 그룹 만들기,  초대받은거 보기 */}
            <div style={{textAlign:'center'}}>
                <Button onClick={()=>setInsertGroup(!insertGroup)} style={{background:'black',width:'15.5rem',fontWeight:'bold',color:'white'}} size='large'>{insertGroup ? 'close':'New Group'}</Button>
            </div>
            <div style={{marginTop:'2rem'}}>
                {insertGroup ? <InsertGroup/>: null}
            </div>
            <div>
                {invitedList.map((friend) => (
                    invitedListComponent(friend)
                ))}
                
            </div>
        </>
    )
}