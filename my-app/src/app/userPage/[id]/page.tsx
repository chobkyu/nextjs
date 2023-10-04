"use client"
import { checkCookie } from '@/app/Common/checkCookie';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, useRouter } from 'next/navigation';

export default function UserPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {

        //리팩티ㅗ링 필요
        const loginFlag = checkCookie(cookies.userData);
        if(!loginFlag) {
            alert('로그인이 필요한 서비스입니다');
            router.push('/Sign/login');
        }else{
            checkUser();
        }
    },[]);

    const checkUser = async () => {
        const userId = cookies.userData.id;
        const friendId = id;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/checkUser?userId=${userId}&friendId=${friendId}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                if(res.status == 200) {
                    if(res.success){
                        getFriendPage();
                    }else{
                        alert('친구 관계를 맺어야 게시물을 열람할 수 있습니다.')
                        window.history.go(-1);
                    }  
                }else{
                    alert('에러 발생');
                }
                
            }
        );
    }

    const getFriendPage = () => {

    }

    return (
        <></>
    )
}