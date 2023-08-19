import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import styles from './Footer.module.css';
import Logo from '../../assets/images/logo-white.png';

const Footer = () => {
  return (
    <Box>
      <Box className={styles.linkContainer}>
        <img src={Logo} alt='' />
        <div spacing={3} className={styles.linksGroup}>
          <Typography className={styles.link}>About</Typography>
          <Typography className={styles.link}>Contact</Typography>
          <Typography className={styles.link}>Terms & Conditions</Typography>
          <Typography className={styles.link}>Privacy Policy</Typography>
        </div>
        <div className={styles.outLinksGroup}>
          <Typography className={styles.link}>LinkedIn</Typography>
          <Typography className={styles.link}>Twitter</Typography>
          <Typography className={styles.link}>Instagram</Typography>
        </div>
      </Box>

      <Box className={styles.copyrightContainer}>
        <Typography className={styles.copyright}>@Copyright HodlerSports. All rights reserved</Typography>
      </Box>
    </Box>

  )
}

export default Footer;
