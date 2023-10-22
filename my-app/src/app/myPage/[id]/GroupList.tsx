"use client"

import { Divider } from "@mui/material";
import { group } from "console";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface group{
    groupId:number,
    name : string,
    introduction : string,
    groupImg:string,
}

export function GroupList(){
    const [groupList, setGroupList] = useState<group[]>([]);
    const { id } = useParams();
    
    const getGroupList = async () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/getList/${id}`,{ cache: 'no-cache' })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            if(res.status == 200) {
                if(res.success){
                    console.log('-----------')
                    setGroupList(res.data);
                }else{
                    alert('에러 발생')
                    window.history.go(-1);
                }  
            }else{
                alert('에러 발생');
                window.history.go(-1);

            }
            
        });
    }

    useEffect(()=> {
        getGroupList();
    },[]);

    const groupListComponent = (group:group) => {
        return (
            <>
                <div style={{ height: '3rem', marginTop: '0.5rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={group?.groupImg} />

                    </div>
                    <div style={{ marginLeft: '1rem', float: 'left' }} >
                        <h3 style={{ padding: '0.01rem', margin: '0.2rem' }}>{group?.name}</h3>
                        <span style={{ margin: '0.2rem' }}>{group?.introduction}</span>
                    </div>
                    {/* <div style={{ float:'left' }}>
                    <Avatar alt="Remy Sharp"
                        src="https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5875129.png"
                        sx={{ width: 36, height: 36 }} />

                </div> */}
                    {/* <div className='profile' style={{ float: 'left', marginLeft: '1rem', marginTop: '0.5rem', width: '10rem', padding: '0.01rem' }} >


                </div> */}
                </div>
                <Divider style={{ marginTop: '1.2rem', width: '100%' }} />
            </>


        )
    }
    

    return(
        <div>
{/*             
            {groupList.map((group)=>{
                groupListComponent(group)
            })} */}
            
          
        </div>
    )
}