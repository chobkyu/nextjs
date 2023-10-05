"use client"
import { checkCookie } from '@/app/Common/checkCookie';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, useRouter } from 'next/navigation';
import { MyList } from '@/app/myPage/[id]/MyList';

interface friendDto{
    id:number,
    userId:string,
    userName:string,
    userBirth:Date,
    myIntro : string
}

export default function UserPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const router = useRouter();
    const { id } = useParams();
    const [friend, setFriend] = useState<friendDto>();

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
                    window.history.go(-1);

                }
                
            }
        );
    }

    const getFriendPage = () => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board/getFriendOne/${id}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                if(res.status == 200) {
                    setFriend(res.data[0])
                }else{
                    alert('에러 발생');
                    window.history.go(-1);
                }
                
            }
        );
    }

    return (
        <>
             <header className='card_myPage' style={{ height: '13rem', padding: '1rem', }}>
                <div style={{ width: '7rem', height: '7rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://texttokbucket.s3.ap-northeast-2.amazonaws.com/5875129.png' />

                </div>
                <div className='profile' style={{ float: 'left', marginLeft: '2rem', width: '10rem' }} >
                    <h1>{friend?.userName}</h1>
                    <span>{friend?.userId}</span>
                </div>
                <div className='hamadi' style={{ display: 'inline-block', width: '100%', marginTop: '1.5rem' }}>
                    {friend?.myIntro}
                </div>
            </header>

            <div className='Tab' style={{  height: '3rem',textAlign:'center',marginTop:'0.7rem' }}>
                <MyList/>
            </div>
        </>
    )
}