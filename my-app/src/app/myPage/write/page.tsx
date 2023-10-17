"use client"
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { Button } from '@mui/material';
import { getOption } from '../../Common/option'
import { useS3Upload } from "next-s3-upload";

interface writeData {
  userId: number,
  title: string,
  contents: string,
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
  const [cookies, setCookie, removeCookie] = useCookies(['userData']);

  const [write, setWrite] = useState<writeData>({
    userId: 0,
    title: '',
    contents: ""
  });

  useEffect(() => {

    let userData = cookies.userData;
    if (!userData) {
      alert('로그인이 필요한 서비스입니다');
      router.push('/Sign/login');
    } else {
      setWrite({ ...write, 'userId': userData.id })
    }
  }, []);


  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    const { id, value } = e.target;
    setWrite({ ...write, [id]: value });
  }

  const submitWriteData = () => {
    console.log(write);

    const option = getOption('POST', write);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board`, option)
      .then(res => res.json())
      .then((res) => {
        if (res.status == 201) {
          alert('등록 완료');
          window.history.go(-1);
        } else {
          alert('에러가 발생했습니다');
          return;
        }
      })
  }


  // file 데이터
  const [image, setImage] = useState<any>(null);
  // 화면 표시를 위한 임시 url
  const [createObjectURL, setCreateObjectURL] = useState(null);
  // 클라이언트에서 업로드 (aws-sdk getsignedurl 이용)

  // 화면 상단에 이미지 표시
  const uploadToClient = (e: any) => {
    // ...중략
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setImage(i);
  
      /*
      화면 상단에 현재 input에 추가한 파일 표시
      실제 S3 업로드X, 클라이언트에서만 처리하는 것으로
      URL.createObjectURL : file객체를 이용하여 임시 url 생성하여 이미지 표시한다
      mdn : https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL
      */
      //setCreateObjectURL(URL.createObjectURL(i));
    }
  };


  const uploadImgClient = async () => {
    // ...중략
    if(image === null) return;
    const body = {
      name:
        "client/" + Math.random().toString(36).substring(2, 11) + image.name,
      type: image.type,
    };

    try {
      // 1단계 : signed url 가져오기
      const urlRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/client`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await urlRes.json();
      const signedUrl = data.url;

      console.log(signedUrl);

      // 2단계 : 가져온 url로 put 요청 보내기
      // 이미 파일 이름이나 경로 등은 url 받아올 때 지정을 다 해놨으므로,
      // image 파일 객체와 Content-type 정보만 넣어서 보냄
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        body: image,
        headers: {
          "Content-type": image.type,
        },
      });

      console.log(uploadRes);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ marginLeft: '1rem', marginTop: '2rem' }}>
      <ThemeProvider theme={customTheme(outerTheme)}>

        <TextField id="title" label="Title" variant="outlined" style={{ width: '90%' }} onChange={onchange} />

        <div style={{ marginTop: '2rem' }}>
          <TextField
            id="contents"
            label="Write your feeling"
            multiline
            rows={13}
            className='contents'
            // defaultValue="Write your feeling"
            style={{ width: '90%' }}
            onChange={onchange}
          />
        </div>
      </ThemeProvider>

      <div className="filebox" style={{ marginTop: '1rem' }}>
        <input className="upload-name" value="첨부파일" placeholder="첨부파일" />
        <label htmlFor="file">파일찾기</label>
        <input type="file" id="file" />
      </div>

      <div style={{ marginLeft: '13%', marginTop: '1rem' }}>
        <Button variant="contained" onClick={submitWriteData} style={{ background: '#3f3c3c', width: '7.5rem', fontWeight: 'bold' }} size='large'>Submit</Button>
        <Button variant="contained" onClick={() => window.history.go(-1)} style={{ background: '#3f3c3c', width: '7.5rem', fontWeight: 'bold', marginLeft: '0.5rem' }} size='large'>Cancel</Button>

      </div>

      <div>
        <input name="myImage" type="file" onChange={uploadToClient} />
        <button type="submit" onClick={uploadImgClient}>
          클라이언트에서 바로 업로드
        </button>
      </div>

    </div>
  )
}