import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import GroupButton from '../GroupButton';
import Balances from '../Balances';
import styles from './Navigation.module.css';

import Logo from '../../assets/images/logo-white.png';
import TeamIcon from '../../assets/images/team.png';
import CardIcon from '../../assets/images/card.png';
import WalletIcon from '../../assets/images/wallet.png';
import TrophyIcon from '../../assets/images/trophy.png';
import POAP from '../../assets/images/poap.png';
import SettingIcon from '../../assets/images/setting.png';


const navItems = [
  { label: 'MY TEAMS', icon: TeamIcon },
  { label: 'PLAYER CARDS', icon: CardIcon },
  { label: 'WALLET', icon: WalletIcon },
  { label: 'TROPHIES', icon: TrophyIcon },
  { label: 'POAPs', icon: POAP },
  { label: 'SETTINGS', icon: SettingIcon },
];

const topNavs = ['My Stats', 'Standings', 'Player Cards', 'Leaderboards', 'Trophies'];

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack className={styles.container}>
      <Box className={styles.logoContainer}>
        <img src={Logo} alt='' />
      </Box>
      {isMobile ? (
        <GroupButton captions={topNavs} transparent={true} />
      ) : (
        <>
          <Box className={styles.navContainer}>
            {navItems.map((item, index) => (
              <Box className={styles.navItemWrapper} key={index}>
                <Typography className={styles.navItemTitle}>{item.label}</Typography>
                <Button>
                  <img src={item.icon} alt='' />
                </Button>
              </Box>
            ))}
          </Box>
          <Balances />
        </>
      )}
    </Stack>
  )
}

export default Navigation;