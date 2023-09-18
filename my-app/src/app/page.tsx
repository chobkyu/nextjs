"use client"
import { Button } from '@mui/material';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

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
        <Button variant="contained" onClick={() =>router.push('/Sign/login')} style={{background:'black',width:'15.5rem',fontWeight:'bold'}} size='large'>Sign In</Button>
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
