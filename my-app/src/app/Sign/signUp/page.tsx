"use client"

import { TextField } from "@mui/material";

export default function SignUp() {

    return (
        <>

            <form onSubmit={(e: any) => {
                e.preventDefault();

                console.log(e.target.value);

                const userId = e.target.userId.value;
                const userPw = e.target.userPw.value;
                const name = e.target.userName.value;
                const birth = e.target.userBirth.value;

                const option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId, userPw, name, birth })

                }
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signUp`, option)
                    .then(res => res.json())
                    .then((res) => {
                        console.log(res);
                    }
                );

            }}>
                <p>
                    <input id="outlined-basic" placeholder="ID" name="userId"  />
                </p>
                <p>
                    <input id="outlined-basic" placeholder="PASSWORD" name="userPW"  />
                </p>
                <p>
                    <input id="outlined-basic" placeholder="NAME" name="userName" />
                </p>
                <p>
                    <input id="outlined-basic" placeholder="BIRTH" name="userBirth"  />
                </p>
                <p>
                    <input type="submit" value='sign up' />
                </p>
            </form>
        </>
    )
}