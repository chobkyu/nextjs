"use client"

import { Button } from "@mui/material";
import { useState } from "react";
import InsertGroup from "./insertGroup";

export default function Group() {
    const [insertGroup,setInsertGroup] = useState<boolean>(false);
    return (
        <>
            {/* 그룹 만들기,  초대받은거 보기 */}
            <div style={{textAlign:'center'}}>
                <Button onClick={()=>setInsertGroup(!insertGroup)} style={{background:'black',width:'15.5rem',fontWeight:'bold',color:'white'}} size='large'>{insertGroup ? 'close':'New Group'}</Button>
            </div>
            <div style={{marginTop:'2rem'}}>
                {insertGroup ? <InsertGroup/>: null}
            </div>
        </>
    )
}