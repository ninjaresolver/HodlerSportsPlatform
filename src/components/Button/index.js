import { Box, Typography } from '@mui/material';
import styles from './Button.module.css';

const CustomButton = ({ variant = 'primary', caption }) => {
  const isPrimary = variant === 'primary';

  return (
    <Box className={isPrimary ? styles.primaryContainer : styles.secondaryContainer}>
      <Typography className={styles.buttonText}>{caption}</Typography>
    </Box>
  )
}

export default CustomButton;
