"use client"
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export function Control() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  return (
    <ul>
      <li><Link href='/create'>create</Link></li>
      {id ? 
      <>
        <li><Link href={`/update/${id}`}>update</Link></li>
        <li><button onClick={() => {
           const option = {method:'DELETE'}
           fetch(`http://localhost:9999/topics/${id}`, option)
           .then((res) => res.json())
           .then(res => {
               console.log(res);
               
               router.push(`/`);
               router.refresh();
           });
        }}>delete</button></li>
      </>:null}
     
    </ul>
  );
}
