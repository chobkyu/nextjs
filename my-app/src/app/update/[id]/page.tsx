"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
    const [title,setTitle] = useState<string>('');
    const [body,setBody] = useState<string>('');
    const router = useRouter();
    const params = useParams();

    const id = params.id;

    useEffect(() => {
        fetch(`http://localhost:9999/topics/${id}`)
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                setTitle(res.title);
                setBody(res.body);
            });

        fetch(`/api/items`).then(res => res.json()).then(res => console.log(res))
    },[]);
    return(
        <form onSubmit={(e:any)=>{
            e.preventDefault(); //onSubmit 기본 동작 방지
            const title = e.target.title.value;
            const body = e.target.body.value;

            const option = {
                method: 'PATCH',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({title,body})
            }
            fetch(`http://localhost:9999/topics/${id}`, option)
                .then((res) => res.json())
                .then(res => {
                    console.log(res);
                    const lastid = res.id;
                    router.push(`/read/${lastid}`);
                    router.refresh();
                });
        }}>
            <p>
                <input type='text' name='title' value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="title"/>
            </p>
            <p>
                <textarea name='body' value={body} onChange={(e)=>{setBody(e.target.value)}} placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="update"/>
            </p>
        </form>
    )
}

