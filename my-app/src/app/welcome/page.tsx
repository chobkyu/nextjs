"use client";

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
    {
        label: 'Welcome to the PUDA!!',
        description: 
    `
Private Your Diary App!!
말그대로 당신의 비밀스러운 일기장입니다.
당신만의 특별한 공간이 필요한가요?
기존 공유형 SNS에 지치셨나요? 
PUDA는 당신만의 일기이자 SNS입니다.
당신만의 감정, 일상 등을 기록하세요!!

    `,
        
        imgPath:
            'https://puda.s3.ap-northeast-2.amazonaws.com/client/KakaoTalk_20231103_140203341.jpg',
    },

    {
        label: 'How to use this?',
        description:
    `
마이페이지의 펜슬 버튼을 클릭해서 
당신의 일기장을 작성할 수 있습니다. 
당신의 감정을 메모하고 당신의 순간을 업로드하세요. 
당신의 포스팅은 아무도 볼 수 없습니다.
    `,
    imgPath:
    'https://puda.s3.ap-northeast-2.amazonaws.com/client/KakaoTalk_20231103_140411257.jpg',

    },

    {
        label: 'Do you wanna share?',
        description: 
    `
만약 당신의 감정과 순간을 공유하고 싶나요?
그렇다면 friend 탭으로 이동하여 친구를 찾으세요!! 
친구의 아이디를 검색하시고 친구 요청을 보내세요.
수락하면 서로의 다이어리를 공유할 수 있습니다.
친구와의 둘만의 비밀스런 포스팅을 만들어보세요!
`,
imgPath:
'https://puda.s3.ap-northeast-2.amazonaws.com/client/KakaoTalk_20231103_141454638.jpg',

    },

    {
        label: 'Do you have many friends?',
        description: 
    `
당신의 포스팅을 공유하고 싶은 친구가 많나요?
그렇다면 group 탭으로 이동하여 그룹을 만드세요 
친구의 아이디를 검색하시고 초대 요청을 보내세요.
그룹 구성원만 볼 수 있는 비밀스런 공간이 생깁니다.
그룹 페이지에서 그룹 포스팅을 작성해주세요!
`,
imgPath:
'https://puda.s3.ap-northeast-2.amazonaws.com/client/KakaoTalk_20231103_140915005.jpg',

    },

    {
        label: 'Express your feeling',
        description: 
    `
프로필 사진과 소개도 바꿀 수 있습니다. 
나만 보는 프로필일수도, 
친구가 보는 프로필일수도 있습니다. 
자유롭게 당신의 감정을 표현하세요. 
`,
imgPath:
'https://puda.s3.ap-northeast-2.amazonaws.com/client/KakaoTalk_20231103_141135035.jpg',

    },

    {
        label: 'Enjoy!!',
        description: 
    `
간단한 회원가입 후 PUDA를 즐겨보세요. 
당신만의 비밀스러운 일기장을 작성할 수 있습니다.
`,
    },
];


export default function Welcome() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const router = useRouter();

  
    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography><h2>{steps[activeStep].label}</h2></Typography>
            </Paper>
            <Box sx={{ height: 'auto', maxWidth: 380, width: '90%', p: 2, textAlign:'left' }}>
                <div style={{textAlign:'center'}}>
                    {activeStep==5 ?
                        <Button variant="contained" onClick={() => router.push('/Sign/signUp')} style={{background:'black',fontWeight:'bold'}} size='large'>Sign up & Enjoy Puda</Button>
                    : null}
                </div>
                
                <img style={{width:'98%',height:'auto',textAlign:'center'}} src={steps[activeStep].imgPath}></img>
                <pre>{steps[activeStep].description}</pre>
            </Box>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

