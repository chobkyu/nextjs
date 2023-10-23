"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"

interface groupDto {
    id: number,
    name: string,
    introduction: string,
    groupImg: string,
}

export default function GroupPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['userDate']);
    const { id } = useParams();
    const router = useRouter();
    const [group, setGroup] = useState<groupDto>();

    const getGroupPage = async () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/getOne/${id}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    setGroup(res.data[0]);
                } else {
                    alert('에러 발생');
                    window.history.go(-1);
                }

            }
            );
    }

    useEffect(() => {
        getGroupPage();
    }, []);

    const moveToGroupPage = (id:number) => {
        //router.push(`/group/${}`)
    }

    return (
        <div>
            <header className='card_myPage' style={{ height: '13rem', padding: '1rem', }}>
                <div style={{ width: '7rem', height: '7rem', borderRadius: '70%', overflow: 'hidden', float: 'left' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={group?.groupImg} />

                </div>
                <div className='profile' style={{ float: 'left', marginLeft: '2rem', width: '10rem' }} >
                    <h1>{group?.name}</h1>
                    {/* <span>{friend?.userId}</span> */}
                </div>
                <div className='hamadi' style={{ display: 'inline-block', width: '100%', marginTop: '1.5rem' }}>
                    {group?.introduction}
                </div>
            </header>

            {/* <div className='Tab' style={{ height: 'auto', textAlign: 'center', marginTop: '0.7rem' }}>
                <MyList />
            </div> */}
        </div>
    )
}