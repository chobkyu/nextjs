import Link from 'next/link'
import './globals.css'
import type { Metadata } from 'next'
import { Control } from './Control'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Providers from './components/Provider';
//import MenuIcon from '@mui/icons-material/Menu';

export const metadata: Metadata = {
  title: 'PUDA',
  description: 'Private Your Diary App',
}


export default async function RootLayout({ children }: {
  children: React.ReactNode
}) {

  // const res = await fetch('http://localhost:9999/topics',{cache:'no-cache'});
  // const topics = await res.json();

  const res = await fetch(`https://nextjs-git-main-chobkyu.vercel.app/api/items`, { cache: 'no-cache' });
  //const res = await fetch(`http://localhost:3000/api/items`,{cache:'no-cache'});

  const topics = await res.json();

  const onclick = () => {
    console.log(res)
  }
  return (
    <html >
      <body>
        <header >
          <h1 style={{ marginLeft: '1rem' }}>Private App</h1>
        </header>

        <hr />
        {/* <ol>
          {topics.data.map((topic: any) => {
            return <p key={topic.id}>{topic.userId}</p>
          })}
        </ol> */}
        {/* {topics.map((topic:any)=>{
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>

          })} */}

        <Providers>{children}</Providers>
        {/* <Control /> */}
      </body>
    </html>
  )
}
