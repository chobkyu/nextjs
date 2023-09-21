"use client"

import { Button } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Home() {
  const router = useRouter();
  const { data : session, status } = useSession();
  const [cookies,setCookie, removeCookie] = useCookies(['userData']);

  useEffect(() => {
    console.log('log in?');
    // console.log(session);

    // if( session?.user){
    //   router.push('/myPage')
    // }

    let user = cookies.userData;
    console.log(user)
    if(user) {
      router.push(`/myPage/${user.id}`)
    }
  },[]);
  return (
   <main style={{marginLeft:'0.5rem',textAlign:'center', marginTop:'10rem'}}>
    <h2>Welcome page!</h2>
    
    <div style={{display:'inline-block'}}>
      {/* <button onClick={() =>router.push('/Sign/login')}
        style={{background:'black',color:'white', height:'10',display:'inline'}}>
        로그인
      </button>
      <button onClick={() =>router.push('/Sign/login')}
        style={{background:'black',color:'white', height:'10',display:'inline'}}>
        로그인
      </button> */}
      <p>
        <Button variant="contained" onClick={() => router.push('Sign/login')} style={{background:'black',width:'15.5rem',fontWeight:'bold'}} size='large'>Sign In</Button>
      </p>
      <p>
        <Button variant="contained" onClick={() =>router.push('/Sign/signUp')} style={{background:'black', width:'15.5rem',fontWeight:'bold'}} size='large'>Sign Up</Button>
      </p>
      <p>
        <Button variant="contained" style={{background:'black',fontWeight:'bold'}} size='large'>Is this your first time?</Button>
      </p>
    </div>
      

   </main>
  )
}
