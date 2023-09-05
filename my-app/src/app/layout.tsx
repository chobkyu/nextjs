import Link from 'next/link'
import './globals.css'
import type { Metadata } from 'next'
import { Control } from './Control'


export const metadata: Metadata = {
  title: 'NextJS tutorial',
  description: 'Generated by create next app',
}


export default async function RootLayout({children}: {
  children: React.ReactNode
}) {

  const res = await fetch('http://localhost:9999/topics',{cache:'no-cache'});
  const topics = await res.json();

 
  return (
    <html >
      <body>
        <h1><Link href='/'>WEB</Link></h1>
        <ol>
          {topics.map((topic:any)=>{
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>

          })}
        </ol>
        {children}
        <Control/>
      </body>
    </html>
  )
}
