import React, {useEffect} from 'react';
import { Box, Stack, Typography, Tooltip } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import styles from './Balances.module.css';

import Player from '../../assets/images/player-small.png';
import PolygonCoin from '../../assets/images/polygon.png';
import BNBCoin from '../../assets/images/bnb.png';
import EthereumCoin from '../../assets/images/ethereum.png';

const balances = [
    { name: 'MATIC', network: 'Polygon', icon: PolygonCoin, balance: 0.0051, value: '8.20' },
    { name: 'BNB', network: 'BNB Chain', icon: BNBCoin, balance: 0.0051, value: '8.20' },
    { name: 'ETH', network: 'Ethereum', icon: EthereumCoin, balance: 0.0051, value: '8.20' }
]

const Balances = () => {

    const { account } = useWeb3React();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if(!account) {
            navigate("/");
        }

    }, [account]);

    const reducedAddress = () => {
        if(account) {
            let address = account;
            console.log(typeof address);
            let firstPart = address.substring(0, 8);
            let lastPart = address.slice(-8);
            return firstPart + "..." + lastPart;
        } else {
            return "";
        }
    }
    return (
        <Box className={styles.balanceContainer}>
            <Stack direction='row' alignItems={"center"} spacing={1.5}>
                <Box className={styles.playerContainer}>
                    <img src={user ? user.photo : Player} alt='' width={'70px'} height={'70px'}/>
                </Box>
                <div>
                    <Typography className={styles.playerName}>{user && user.first_name + " " + user.last_name}</Typography>
                    <Tooltip title={account}>
                        <Typography className={styles.playerAddress}>{reducedAddress()}</Typography>
                    </Tooltip>
                </div>
            </Stack>
          
            <Box mt={2} textAlign='center'>
                <Typography className={styles.balanceLabel}>Total Balance</Typography>
                <Typography className={styles.balanceAmount}>350.95 USD</Typography>
            </Box>
            <Stack mt={2} spacing={1}>
                {balances.map((item, index) => (
                <Box className={styles.balanceItemWrapper} key={index}>
                    <img src={item.icon} alt='icon' />
                    <Box ml={1.5} flex={1}>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography className={styles.balanceText}>{item.name}</Typography>
                            <Typography className={styles.balanceText}>{item.balance}</Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' mt={0.25}>
                            <Typography className={styles.balanceSubtext}>{item.network}</Typography>
                            <Typography className={styles.balanceSubtext}>${item.value} USD</Typography>
                        </Stack>
                    </Box>
                </Box>
                ))}
            </Stack>
        </Box>
       
    )
}

export default Balances;