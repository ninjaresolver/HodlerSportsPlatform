import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Trophy.module.css';
import './Slider.css';

import WorldCup from '../../assets/images/worldcup.png';
import LeftArrow from '../../assets/images/arrow-left.png';
import RightArrow from '../../assets/images/arrow-right.png';

const trophies = [
  { label: 'World Cup Champion', image: WorldCup },
  { label: 'UEFA Champions', image: WorldCup },
  { label: 'COPA America', image: WorldCup },
]

const PrevArrow = ({ onClick }) => {
  return (
    <Box className={styles.prevButton} onClick={onClick}>
      <img src={LeftArrow} alt='' />
    </Box>
  )
}

const NextArrow = ({ onClick }) => {
  return (
    <Box className={styles.nextButton} onClick={onClick}>
      <img src={RightArrow} alt='' />
    </Box>
  )
}

const Trophies = () => {
  let cupRef = null;
  let labelRef = null;
  const [cupSlider, setCupSlider] = useState(null);
  const [labelSlider, setLabelSlider] = useState(null);

  useEffect(() => {
    setCupSlider(cupRef);
    setLabelSlider(labelRef);
  }, []);

  const settings = {
    arrows: false,
    infinite: true,
    centerMode: true,
    centerPadding: '10%',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>Trophies</Typography>

      <Slider
        asNavFor={labelSlider}
        ref={(el) => (cupRef = el)}
        {...settings}
      >
        {trophies.map((item, index) => (
          <Box px={1} key={index}>
            <Box className="itemContainer">
              <img src={item.image} alt='' />
            </Box>
          </Box>
        ))}
      </Slider>

      <Box mt={4}>
        <Slider
          asNavFor={cupSlider}
          ref={(el) => (labelRef = el)}
          {...settings}
          arrows={true}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          centerPadding={0}
        >
          {trophies.map((item, index) => (
            <Box px={2} key={index}>
              <Typography className={styles.currentName}>{item.label}</Typography>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  )
}

export default Trophies;