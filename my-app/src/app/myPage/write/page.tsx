"use client"
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { Button } from '@mui/material';
import { getOption } from '../../Common/option'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
  const pathname = usePathname();

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
    //console.log(e.target);
    const { id, value } = e.target;
    setWrite({ ...write, [id]: value });
  }

  const submitWriteData = () => {
    const data = { write , urlArr }
    const option = getOption('POST', data);

    console.log(option);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board`, option)
      .then(res => res.json())
      .then((res) => {
        if (res.status == 201) {
          alert('등록 완료');
          setImgLoading(true);
          handleClose();
          window.history.go(-1);
        } else {
          alert('에러가 발생했습니다');
          return;
        }
      })
  }

  //https://songsong.dev/entry/S3%EC%97%90-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EB%8A%94-%EC%84%B8-%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95
  // file 데이터


  const [imageList, setImageList] = useState<any[]>([]);
  const [countImg, setCountImg] = useState<string>('첨부파일');
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  const urlArr: string[] =[];
  // 클라이언트에서 업로드 (aws-sdk getsignedurl 이용)

  // 화면 상단에 이미지 표시
  const uploadToClient = (e: any) => {
    if (e.target.files.length > 4) {
      alert('이미지는 4개까지 업로드 하실 수 있습니다');
      setImageList([]);
      return;
    }

    const imgArr = new Array();
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const img = e.target.files[i];
        if(!img.type.match("image/.*")){
          alert("이미지 파일만 업로드 가능합니다.")
          return;
        }
        imgArr.push(img);
      }
    }
    setCountImg(`${e.target.files.length}개의 파일`)
    setImageList(imgArr);
    // if (e.target.files && e.target.files[0]) {
    //   const i = e.target.files[0];
    //   setImage(i);

    // }

  };


  const uploadImgClient = async () => {
    // ...중략
    setImgLoading(false);

    if (imageList === null) return;
    const imgListArr = new Array();

    imageList.map((image) => {
      const body = {
        name:
          "client/" + Math.random().toString(36).substring(2, 11) + image.name,
        type: image.type,
      };

      imgListArr.push(body)
    });

    try {
      // 1단계 : signed url 가져오기
      const urlRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media/client`, {
        method: "POST",
        body: JSON.stringify(imgListArr),
      });
      const data = await urlRes.json();
      const signedUrl = data.url;

      console.log(signedUrl);

      // 2단계 : 가져온 url로 put 요청 보내기
      // 이미 파일 이름이나 경로 등은 url 받아올 때 지정을 다 해놨으므로,
      // image 파일 객체와 Content-type 정보만 넣어서 보냄
      
      for (var i = 0; i < signedUrl.length; i++) {
        try {
          const uploadRes = await fetch(signedUrl[i], {
            method: "PUT",
            body: imageList[i],
            headers: {
              "Content-type": imageList[i].type,
            },
          });

          console.log(uploadRes);
          urlArr.push(uploadRes.url.split('?')[0])
        } catch (err) {
          console.log(err);
          alert('이미지 업로드 중 에러발생');
          return;
        }

      }
      console.log(urlArr);
      //setImgUrlList([...urlArr]);
      //console.log(imgUrlList)
      const path = pathname.split('/',2)[1];

      // if(path==='')
      submitWriteData();

    } catch (err) {
      console.log(err);
    }
  };

  const noDoubleClick = () => {
    handleOpen();
    imgLoading ? uploadImgClient() : alert('등록중입니다')
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
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
        <input className="upload-name" value={countImg} placeholder="첨부파일" />
        <label htmlFor="file">파일찾기</label>
        <input type="file" id="file" multiple onChange={uploadToClient} />
      </div>

      <div style={{ marginLeft: '13%', marginTop: '1rem' }}>
        <Button variant="contained" onClick={noDoubleClick} style={{ background: '#3f3c3c', width: '7.5rem', fontWeight: 'bold' }} size='large'>Submit</Button>
        <Button variant="contained" onClick={() => window.history.go(-1)} style={{ background: '#3f3c3c', width: '7.5rem', fontWeight: 'bold', marginLeft: '0.5rem' }} size='large'>Cancel</Button>

      </div>

      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

    </div>
  )
}