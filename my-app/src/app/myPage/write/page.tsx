"use client"
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { Button } from '@mui/material';
import { getOption } from '../../Common/option'


interface writeData {
    userId:number,
    title:string,
    contents:string,
}

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&:before, &:after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });


export default function Write() {
    const outerTheme = useTheme();
    const router = useRouter();
    const [cookies,setCookie, removeCookie] = useCookies(['userData']);

    const [write,setWrite] = useState<writeData>({
        userId:0,
        title:'',
        contents:""
    });

    useEffect(() => {
        
        let userData = cookies.userData;
        if( !userData ){
            alert('로그인이 필요한 서비스입니다');
            router.push('/Sign/login');
        }else{
            setWrite({...write, 'userId':userData.id})
        }
    },[]);


    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
        const { id, value } = e.target;
        setWrite({ ...write, [id]: value });
    }

    const submitWriteData = () => {
        console.log(write);

        const option = getOption('POST',write);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board`,option)
            .then(res => res.json())
            .then((res) => {
                if(res.status==201){
                    alert('등록 완료');
                    window.history.go(-1);
                }else{
                    alert('에러가 발생했습니다');
                    return;
                }
            })
    }

    return (
        <div style={{ marginLeft: '1rem',marginTop:'2rem' }}>  
            <ThemeProvider theme={customTheme(outerTheme)}>

            <TextField id="title" label="Title" variant="outlined" style={{width:'90%'}} onChange={onchange}/>

            <div style={{marginTop:'2rem'}}>
                <TextField
                    id="contents"
                    label="Write your feeling"
                    multiline
                    rows={13}
                    className='contents'
                    // defaultValue="Write your feeling"
                    style={{width:'90%'}}
                    onChange={onchange}
                />
            </div>
           </ThemeProvider>

           <div className="filebox" style={{marginTop:'1rem'}}>
                <input className="upload-name" value="첨부파일" placeholder="첨부파일"/>
                <label htmlFor="file">파일찾기</label> 
                <input type="file" id="file"/>
            </div>

            <div style={{marginLeft:'13%',marginTop:'1rem'}}>
                <Button variant="contained" onClick={submitWriteData} style={{background:'#3f3c3c',width:'15.5rem',fontWeight:'bold'}} size='large'>Submit</Button>

            </div>

        </div>
    )
}