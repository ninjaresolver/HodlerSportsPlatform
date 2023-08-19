import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './League.module.css';

import Hodler from '../../assets/images/holder.png';
import Juventinos from '../../assets/images/juventinos.png';
import Devil from '../../assets/images/devil.png';
import Coolest from '../../assets/images/coolest.png';
import Wildcats from '../../assets/images/wildcats.png';
import LeftArrow from '../../assets/images/arrow-black-left.png';
import RightArrow from '../../assets/images/arrow-black-right.png';

const standings = [
  { standing: 1, icon: Hodler, name: 'Holder Miami FC' },
  { standing: 2, icon: Juventinos, name: 'Juventinos FC' },
  { standing: 3, icon: Devil, name: 'Devils FC' },
  { standing: 4, icon: Coolest, name: 'Coolest Football' },
  { standing: 5, icon: Wildcats, name: 'Wildcats Wynwood' }
]

const leagues = ['Kendall 2022', 'Kendall 2023', 'UEFA League']

const League = () => {
  let carouselRef = null;
  const [page, setPage] = useState(0);

  const onPrevClicked = () => {
    if (page < 1) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
    carouselRef.previous();
  }

  const onNextClicked = () => {
    if (page > leagues.length - 2) {
      setPage(leagues.length - 1);
    } else {
      setPage(page + 1);
    }
    carouselRef.next();
  }

  return (
    <Box className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <Typography className={styles.title}>League Standings</Typography>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={3}>
            <Box className={styles.button} onClick={onPrevClicked}>
              <img src={LeftArrow} alt='' />
            </Box>
            <Typography className={styles.currentName}>{leagues[page]}</Typography>
            <Box className={styles.button} onClick={onNextClicked}>
              <img src={RightArrow} alt='' className={styles.button} />
            </Box>
          </Stack>
        </div>
        <div className={styles.contentBody}>
          <Carousel
            ref={(el) => (carouselRef = el)}
            arrows={false}
            beforeChange={(nextSlide) => {setPage(nextSlide)}}
            responsive={{
              mobile: {
                breakpoint: { max: 3000, min: 0 },
                items: 1,
              }
            }}>
            <Box className={styles.tableContainer}>
              {standings.map((item) => (
                <Box className={styles.itemWrapper} key={item.standing}>
                  <Typography className={styles.standing}>{item.standing}</Typography>
                  <img src={item.icon} alt='' />
                  <Typography className={styles.club}>{item.name}</Typography>
                </Box>
              ))}
            </Box>
            <Box className={styles.tableContainer}>
              {standings.map((item) => (
                <Box className={styles.itemWrapper} key={item.standing}>
                  <Typography className={styles.standing}>{item.standing}</Typography>
                  <img src={item.icon} alt='' />
                  <Typography className={styles.club}>{item.name}</Typography>
                </Box>
              ))}
            </Box>
            <Box className={styles.tableContainer}>
              {standings.map((item) => (
                <Box className={styles.itemWrapper} key={item.standing}>
                  <Typography className={styles.standing}>{item.standing}</Typography>
                  <img src={item.icon} alt='' />
                  <Typography className={styles.club}>{item.name}</Typography>
                </Box>
              ))}
            </Box>
          </Carousel>
        </div>
      </div>
    </Box>
  )
}

export default League;