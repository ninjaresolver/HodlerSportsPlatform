import React, { useState, useEffect } from 'react'
import { 
    Box, 
    Grid, 
    TextField, 
    Typography, 
    Button, 
    Stack, 
    Avatar, 
    IconButton,
    useMediaQuery,
} from "@mui/material";
import Webcam from 'react-webcam'
import UploadIcon from '@mui/icons-material/Upload';
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { register } from '../../services/auth/auth-service';
import { setUser, setToken } from '../../slices/auth';

import styles from './Signup.module.css';
import Logo from '../../assets/images/logo.png';
import Background from '../../assets/images/signup.png';
import TopBanner from '../../assets/images/signup-mobile.png';
import { useWeb3React } from '@web3-react/core';

const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: 'user',
}

const Signup = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const webcamRef = React.useRef(null)

    const { account } = useWeb3React();

    const [ file, setFile ] = useState(null);

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ photo, setPhoto ] = useState(null);
    const [ picture, setPicture ] = useState('');
    const [ isRegistering, setIsRegistering ] = useState(false);
    
    const [ useCamera, setUseCamera ] = useState(false);

    useEffect(() => {
        if(!account) {
            navigate("/");
        }
    }, [account]);

    const capture = React.useCallback(async () => {
        const pictureSrc = webcamRef.current.getScreenshot();
        setPicture(pictureSrc);
        setPhoto(pictureSrc);
    });

    const handleUseCamera = (isUseCamera) => {
        setUseCamera(isUseCamera);
    }

    const handleRegister = async () => {
        setIsRegistering(true);
        let registerInfo = await register(account, firstName, lastName, email, phoneNumber, photo);
        if(registerInfo.success) {
            dispatch(setToken(registerInfo.data.token));
            dispatch(setUser(registerInfo.data.user));
            setIsRegistering(false);
            navigate("/dashboard");
        }
    }

    const handleImageChange = async (e) => {
        if(e.target.files.length > 0) {
            let fileData = e.target.files[0];
            console.log("file data : ", fileData.size);

            if(fileData.size <= 140000) {
                setFile(URL.createObjectURL(fileData));
                setPhoto(await convertBase64(fileData));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Image size is too big!',
                    text: `Image size should be less than 256px * 256px.`
                })
            }
        }
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    return (
        <Box className={styles.container}>
            <Grid
                container
                direction={isMobile ? 'column-reverse' : 'row'}
            >
                <Grid item sm={12} lg={6} className={styles.leftPanel}>
                    <div className={styles.wrapper}>
                        <Box gap={1.5} display={'grid'}>
                            <img src={Logo} alt='logo' className={styles.logo} />
                            <Typography className={styles.text}>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut l,
                            </Typography>
                        </Box>
                        {
                            !useCamera && <>
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    <IconButton className={styles.uploadButton} aria-label="upload picture" component="label">
                                        <input
                                            hidden 
                                            accept="image/*" 
                                            type="file"
                                            onChange={handleImageChange}
                                        />
                                        {!file ? <UploadIcon className={styles.avatar}/> : <Avatar src={file} className={styles.avatar}/>}

                                    </IconButton>
                                </Stack>
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    <Button className={styles.captionButton} onClick={() => handleUseCamera(true)}>
                                        <Typography className={styles.captionButtonText}>
                                            Use Camera
                                        </Typography>
                                    </Button>
                                </Stack>
                            </>
                        }

                        {
                            useCamera && <>
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    {
                                        picture === '' ? (
                                        <Webcam
                                            audio={false}
                                            height={200}
                                            ref={webcamRef}
                                            width={200}
                                            className={styles.webcamAvatar}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={videoConstraints}
                                        />
                                        ) : (
                                            <Avatar src={picture} className={styles.avatar}/>
                                        )
                                    }
                                </Stack>
                                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                                {
                                    picture !== '' ? (

                                        <Button 
                                            className={styles.captionButton} 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPicture('');
                                            }}
                                        >
                                            <Typography className={styles.captionButtonText}>
                                                Retake
                                            </Typography>
                                        </Button>
                                        
                                        ) : (

                                        <Button 
                                            className={styles.captionButton} 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                capture();
                                            }}
                                        >
                                            <Typography className={styles.captionButtonText}>
                                                Capture
                                            </Typography>
                                        </Button>
                                    )}
                                    {
                                        picture === '' && 
                                        <Button className={styles.captionButton} onClick={() => handleUseCamera(false)}>
                                            <Typography className={styles.captionButtonText}>
                                                Upload
                                            </Typography>
                                        </Button>
                                    }
                                </Stack>
                            </>
                        }

                        <Stack direction='row' justifyContent="space-between" spacing={1}>
                            <Box className={styles.formField}>
                                <Typography className={styles.label}>First name*</Typography>
                                <TextField
                                    variant="outlined"
                                    className={styles.inputText}
                                    placeholder='Peter'
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Box>

                            <Box className={styles.formField}>
                                <Typography className={styles.label}>Last Name*</Typography>
                                <TextField
                                    variant="outlined"
                                    className={styles.inputText}
                                    placeholder='Parker'
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Box>
                        </Stack>
                        <Box className={styles.formField}>
                            <Typography className={styles.label}>Email*</Typography>
                            <TextField
                                variant="outlined"
                                className={styles.inputText}
                                placeholder='spiderman@gmail.com'
                                onChange={(e) => setEmail(e.target.value)}

                            />
                        </Box>

                        <Box className={styles.formField}>
                            <Typography className={styles.label}>Phone Number*</Typography>
                            <TextField
                                variant="outlined"
                                className={styles.inputText}
                                placeholder='Your phone number'
                                onChange={(e) => setPhoneNumber(e.target.value)}

                            />
                        </Box>

                        <Button className={styles.button} onClick={handleRegister}>
                            <Typography className={styles.buttonText}>
                                Create Account
                            </Typography>
                        </Button>

                        {
                            isRegistering && 
                            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                                <Typography className={styles.loadingText}>Register...</Typography>
                            </Stack>
                        }

                    </div>
                </Grid>

                <Grid item sm={12} lg={6} className={styles.rightPanel}>
                    <div className={styles.bannerWrapper}>
                        <img src={isMobile ? TopBanner : Background} alt='' className={styles.backImage} />
                        {
                            !isMobile && (
                            <Box className={styles.overlay}>
                                <Typography className={styles.overlayTitle}>
                                    The New Era <br/> of Sports
                                </Typography>
                                <Typography className={styles.overlayContent}>
                                    Lorem ipsum dolor sit amet, <br/> consectetuer adipiscing elit, sed diam
                                </Typography>
                                <Typography className={styles.learnMore}>
                                    Learn More
                                </Typography>
                            </Box>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Signup;
