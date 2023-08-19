import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from './GroupButton.module.css';
const GroupButton = ({ captions, transparent = false, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Box className={styles.container} sx={{ background: transparent ? transparent : '#252525'}}>
      {captions.map((caption, index) => (
        <Box
          key={index}
          className={currentIndex === index ? styles.activeButtonContainer : styles.buttonContainer}
          onClick={() => {
            setCurrentIndex(index);
            if (onIndexChange)
              onIndexChange(index);
          }}
        >
          <Typography className={styles.buttonText}>{caption}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default GroupButton;