"use client"

import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();

    return(
        <form onSubmit={(e:any)=>{
            e.preventDefault(); //onSubmit 기본 동작 방지
            const title = e.target.title.value;
            const body = e.target.body.value;

            const option = {
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({title,body})
            }
            // fetch(`http://localhost:9999/topics`, option)
            //     .then((res) => res.json())
            //     .then(res => {
            //         console.log(res);
            //         const lastid = res.id;
            //         router.push(`/read/${lastid}`);
            //         router.refresh();
            //     });
        }}>
            <p>
                <input type='text' name='title' placeholder="title"/>
            </p>
            <p>
                <textarea name='body' placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create"/>
            </p>
        </form>
    )
}

