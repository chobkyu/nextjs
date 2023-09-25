"use client"

import { getOption } from "@/app/Common/option"
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export function MyList() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);

    const getList = async  () => {
        const userId = cookies.userData.id;
        const option = getOption('GET');

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getList/${userId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    useEffect(() => {
        getList();
    },[]);
    
    return (
        <></>
    )

}