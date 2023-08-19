import { useState, useEffect } from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  Button,
  useMediaQuery, Grid
} from '@mui/material';
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useWeb3React } from '@web3-react/core';

import { setUser, setToken } from '../../slices/auth';
import { injected } from '../../configs/connectors';
import { checkWallet } from '../../services/auth/auth-service';

import League from '../../components/League';
import CustomButton from '../../components/Button';
import Footer from '../../components/Footer';
import styles from './Home.module.css';

import Logo from '../../assets/images/logo.png';
import ArrowWhite from '../../assets/images/arrow-white-top.png';
import Planet from '../../assets/images/planet.png';
import PlayerCard from '../../assets/images/player-card.png';
import Sticker from '../../assets/images/sticker.png';
import Arrow3 from '../../assets/images/arrow3.png';

import IconBar from '../../assets/images/icon-bar.png'
import IconInbox from '../../assets/images/icon-inbox.png';
import IconInboxWhite from '../../assets/images/icon-inbox-white.png';
import IconUser from '../../assets/images/icon-user.png';
import ImgChart from '../../assets/images/graph-bar.png'
import ImgPerformance from '../../assets/images/graph-area.png'
import ImgEarth from '../../assets/images/planet.png'
import ImgTrackArrow from '../../assets/images/arrow2.png'

const AnimVertical = "https://gateway.pinata.cloud/ipfs/QmTtf2rvaQqoxCxWovRKC7GLyqXsrwKTm2FB3Ki2rs9tbT";
const AnimHorizontal = "https://gateway.pinata.cloud/ipfs/QmYNWmb5uypZgDi6QEqjG66cM5cLVTNWqMgm5BQi2FSie7";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setLoading] = useState(true);

  const [ isConnecting, setIsConnecting ] = useState(false);

  const { activate, account } = useWeb3React();

  setTimeout(() => {
    setLoading(false)
  }, 2000);

  useEffect(() => {
    const checkWalletExist = async () => {
      if(account) {
        setIsConnecting(true);
        let response = await checkWallet(account);
        setIsConnecting(false);

        if(!response)
          navigate("/signup");
        else {
          console.log("response", response);
          dispatch(setToken(response.data.token));
          dispatch(setUser(response.data.user));
          navigate("/dashboard");
        }
      }
    };
    checkWalletExist();
  }, [account]);

  const activateInjected = async () => {
    return new Promise(resolve => {
      resolve(activate(injected))
    })
  }

  const connectMetamask = async () => {
    setIsConnecting(true);
    if (window.ethereum) {
      if (window.ethereum.networkVersion !== "31337" && window.ethereum.networkVersion !== "1" && window.ethereum.networkVersion !== "97") {
        Swal.fire({
          icon: 'warning',
          title: 'You are on the wrong network.',
          text: `Please connect to Ethereum network!`
        })
      } else {
        await activateInjected();
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No Wallet Detected',
        text: `Please Please install Metamask!`
      })
      setIsConnecting(false);
      return false;

    }
    setIsConnecting(false);

  }

  // const disconnect = () => {
  //     deactivate();
  // }

  return (
    <Box className={styles.container}>
      {
        isLoading ? (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Box>
            <section className={styles.discoverContainer}>
              <div className={styles.inputBoxContainer}>
                <div className={styles.inputBox}>
                  <img src={Logo} alt="logo"/>
                  <button className={styles.toggleMenuBtn}>
                    <img src={ IconBar } alt="icon-bar"/>
                  </button>
                  <button className={styles.btnConnectWallet}>
                    <img src={ IconInbox } alt="icon-inbox"/> Connect Wallet <img src={ IconUser } alt="icon-user"/>
                  </button>
                </div>
              </div>
              <div className={styles.discoverLeftContainer}>
                <div className={ styles.discoverTitle }>
                  Discover the new experience of sports
                </div>
                <div className={styles.discoverDescription}>
                  We transform you game into data and collectables
                </div>
                <div className={styles.discoverBtnContainer }>
                  <button className={styles.btnSignup}>Signup</button>
                  <button className={styles.btnWallect}>
                    <img src={ IconInboxWhite } alt="icon-inbox"/>
                    Connect Wallet
                  </button>
                </div>
              </div>
            </section>

            <section className={styles.trackContainer}>
              <img src={ImgEarth} className={styles.imagePlanet} alt="image-earth"/>
              <div className={styles.trackContentContainer}>
                <div className={styles.leftContent}>
                  <div className={styles.trackTitle}>
                    Keep track of your performance and get rewards
                  </div>
                  <div className={styles.bottomContainer}>
                    <img src={ImgTrackArrow} className={styles.trackArrow} alt="track arrow"/>
                    <div className={styles.description}>
                      We transform complex data into actionable insights that drive player and club performance. Delivering the outcomes you need.
                    </div>
                    <div>
                      <button className={styles.btnSignup} style={{ marginTop: '20px' }}>Signup</button>
                    </div>
                  </div>
                </div>
                <div className={styles.rightContent}>
                  <div className={styles.cardContainer}>
                    <div className={styles.cardGamPlayed}>
                      <div className={styles.cardTitle}>Games played</div>
                      <div className={styles.cardNum}>6</div>
                    </div>
                    <div className={styles.cardFantasy}>
                      <div className={styles.cardTitle}>Fantasy points</div>
                      <div className={styles.cardNum}>77</div>
                    </div>
                  </div>
                  <div className={styles.cardContainer}>
                    <div className={styles.cardGamPlayed}>
                      <div className={styles.cardTitle}>Minutes played</div>
                      <div className={styles.cardNum}>320</div>
                    </div>
                    <div className={styles.cardDistance}>
                      <div className={styles.cardTitle}>Distance</div>
                      <img src={ImgChart} alt="image-chart" className={styles.imageChart}/>
                    </div>
                  </div>
                  <div className={styles.cardContainer}>
                    <div className={styles.cardPerformance}>
                      <div className={styles.cardTitle}>Performance</div>
                      <img src={ImgPerformance} alt="image-performance" className={styles.imagePerformance}/>
                    </div>
                    <div className={styles.cardGamPlayed}>
                      <div className={styles.cardTitle}>Minutes played</div>
                      <div className={styles.cardNum}>320</div>
                    </div>
                  </div>
                </div>
              </div>

            </section>

            <section className={styles.videoWrapper}>
              
              <Box>
                <video autoPlay={true} muted={true} loop={true} className={styles.videoContent}>
                  <source src={isMobile ? AnimVertical: AnimHorizontal} type="video/mp4" />
                </video>
              </Box>
              {/* <Box className={styles.bannerWrapper}>
                { isMobile && <img src={Logo} alt='' style={{ maxWidth: '90%' }} /> }
                <Typography className={styles.title}>
                  Enter The New Era of Sports
                </Typography>
                {
                  isMobile ? (
                    <Button className={styles.connectButton} onClick={connectMetamask} disabled={isConnecting}>
                      <Typography className={styles.connectButtonText}>Connect Wallet</Typography>
                      <img src={ArrowWhite} alt='' />
                    </Button>
                  ) : (
                    <Button className={styles.accountButton} onClick={connectMetamask} disabled={isConnecting}>
                      <Typography className={styles.accountButtonText}>Connect Wallet</Typography>
                      <img src={ArrowWhite} alt='' />
                    </Button>)
                }

                {
                  isConnecting && <Typography className={styles.loadingText}>Connecting...</Typography>
                }

              </Box> */}
              <div className={styles.videoContentContainer}>
                <div className={styles.videoContentTitle}>35 leagues are coming to hodlersports every year </div>
                <div className={styles.videoContentDescription}>
                  We transform complex data into actionable insights that drive player and club performance. Delivering the outcomes you need.
                </div>
              </div> 
            </section>
            <section></section>
            <section className={styles.leagueContainer}>
              <img src={Planet} alt='planet' className={styles.planet} />
              <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                  <Box className={styles.leagueWrapper}>
                    <League />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} className={styles.leagueContent}>
                  <Typography className={styles.leagueSectionTitle}>
                    <span>Be updated about the whole league and compare</span>
                  </Typography>
                  <img src={Arrow3} alt='player' className={styles.leagueArrow} />
                  <Typography className={styles.leagueSectionText}>
                    We transform complex data into actionable insights that drive player and club performance. Delivering the outcomes you need.
                  </Typography>
                </Grid>
              </Grid>
            </section>
            <section style={{borderRadius: "15px", background: "#OF0F0F"}}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Box className={styles.cardSplash} />
                </Grid>
                <Grid item xs={12} md={6} className={styles.cardSectionContent}>
                  <Typography className={styles.cardSectionTitle}>
                    <span>Get your own NFTs just by playing</span>
                    <img src={Sticker} alt='sticker' className={styles.sticker} />
                  </Typography>
                  <Typography className={styles.cardSectionText}>
                    Improve your player cards based on your performances and points,
                    <br/>
                    Improve your player cards based on your performances and points
                  </Typography>
                  <img src={PlayerCard} alt='player' className={styles.playerCard} />
                </Grid>
              </Grid>
            </section>
            <section className={styles.connectSection}>
              <Box className={styles.connectOverlay}>
                <Typography className={styles.connectTitle}>Let's connect</Typography>
                <Typography className={styles.connectDescription}>We transform complex data into actionable insights that drive player and club performance. Delivering the outcomes you need.</Typography>
                <CustomButton caption='Connect' />
              </Box>
            </section>
            <Footer />
          </Box>
        )
      }
    </Box>
  );
};

export default Home;
