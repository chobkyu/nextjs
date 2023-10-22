"use client"

import { Divider } from "@mui/material";
import { group } from "console";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface group{
    groupId:number,
    name : string,
    introduction : string,
    groupImg:string,
}

export function GroupList(){
    const [groups, setGroups] = useState<group[]>([]);
    const { id } = useParams();
    
    const getGroupList = async () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/getList/${id}`,{ cache: 'no-cache' })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            // if(res.status == 200) {
            //     if(res.success){
            //         console.log('-----------')
            //         setGroupList(res.data);
            //     }else{
            //         alert('에러 발생')
            //         window.history.go(-1);
            //     }  
            // }else{
            //     alert('에러 발생');
            //     window.history.go(-1);

            // }
            setGroups(res.data);
        });
    }

    useEffect(()=> {
        getGroupList();
    },[]);

    const groupListComponent = (group:group) => {
        return (
            <>{group.name}</>
        )
    }
    

    return(
        <div>
            
            {groups.map((group)=>
                groupListComponent(group)
            )}
            
          
        </div>
    )
}