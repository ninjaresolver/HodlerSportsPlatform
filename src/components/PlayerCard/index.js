import { Box, Stack, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './PlayerCard.module.css';

import Arrow from '../../assets/images/arrow.png';
import LeftArrow from '../../assets/images/arrow-left.png';
import RightArrow from '../../assets/images/arrow-right.png';

import Hodler from '../../assets/images/hodler-big.png';
import PFL from '../../assets/images/pfl.png';
import UPSL from '../../assets/images/upsl.png';
import Cross from '../../assets/images/cross.png';
import Line from '../../assets/images/Line.png';

const cards = [
  { icon: PFL, background: Line, title: 'Hodler Miami FC PFL', year: 2023 },
  { icon: UPSL, background: Cross, title: 'Hodler miami FC', year: 2023 },
  { icon: null, background: null, title: 'Hodler miami FF', year: 2021 }
];
const PlayerCard = () => {
  let carouselRef = null;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      partialVisibilityGutter: 50
    },
    tablet: {
      breakpoint: { max: 1024, min: 480 },
      items: 2,
      partialVisibilityGutter: 40
    },
    mobile:  {
      breakpoint: { max: 480, min: 0 },
      items: 1,
      partialVisibilityGutter: 80
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.topBar}>
        <Stack direction='row' spacing={2}>
          <Typography className={styles.title}>My Player Cards</Typography>
          <img src={Arrow} alt='' className={styles.arrow} />
        </Stack>
        <Stack direction='row' spacing={1} className={styles.arrowContainer}>
          <Box className={styles.button} onClick={() => carouselRef.previous()}>
            <img src={LeftArrow} alt='' />
          </Box>
          <Box className={styles.button} onClick={() => carouselRef.next()}>
            <img src={RightArrow} alt='' />
          </Box>
        </Stack>
      </Box>
      <Box my={2}>
        <Carousel
          ref={(el) => (carouselRef = el)}
          responsive={responsive}
          partialVisible={true}
          arrows={false}
        >
          {cards.map((card, index) => (
            <Box p={1.5} key={index}>
              <Box className={styles.cardWrapper}>
                <img src={card.background} alt='' className={styles.cardBackground} />
                <img src={card.icon} alt='' className={styles.cardIcon} />
                <img src={Hodler} alt='' className={styles.cardMark} />
                <Typography className={styles.cardTitle}>{card.title}<br/>{card.year}</Typography>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}

export default PlayerCard;