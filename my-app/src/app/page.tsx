"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
   <main style={{marginLeft:'0.5rem'}}>
    <h2>Welcome page!</h2>
      Hello WEB
      <button onClick={() =>router.push('/Sign/login')}>로그인</button>
   </main>
  )
}
