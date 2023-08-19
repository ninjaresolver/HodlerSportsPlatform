import { useState, useEffect } from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import GroupButton from '../GroupButton';
import RenderChart from '../Chart';
import styles from './Stat.module.css';

import Player from '../../assets/images/player-large.png';
import Country from '../../assets/images/country.png';
import RightArrow from '../../assets/images/arrow-right.png';

const options = ['Last Match', 'All Season'];

const records = [
    { label: 'Goals', value: [2, 3, 4, 3] },
    { label: 'Minutes Played', value: [80, 50, 75, 90] },
    { label: 'Penalties Won', value: [0, 1, 0, 1] },
    { label: 'Committed Penalties', value: [1, 2, 2, 3] },
    { label: 'Minute Played', value: [90, 80, 45, 90] },
    { label: 'Penalties Saved', value: [0, 0, 0, 2] },
    { label: 'Own Goals', value: [0, 0, 1, 0] },
]

const Stats = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const user = useSelector((state) => state.auth.user);

    const [currentRecord, setCurrentRecord] = useState('Goals');
    const [chartData, setChartData] = useState([]);
    const [chartValue, setChartValue] = useState(3);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        const record = records.find((o) => o.label === currentRecord );

        if (tab) { // All Season
            const value = record.value.reduce((total, value) => total + value, 0);
            const data = record.value.map((val, index) => ({ x: index + 1, y: val }));
            setChartData([
                { x: '', y: 0 },
                ...data,
            ])
            setChartValue(value);
        } else {
            setChartValue(record.value[3]);
            setChartData([
                { x: '', y: 0 },
                { x: 1, y: record.value[3]}
            ]);
        }
    }, [currentRecord, tab])

    return (
        <Box className={styles.container}>
            <Stack direction='row' justifyContent='space-between' mb={1.5}>
                <Box className={styles.playerContainer}>
                    <Box className={styles.avatarContainer}>
                        <img src={Player} alt='' className={styles.player}/>
                        <img src={Country} alt='' className={styles.country} />
                    </Box>
                    <Stack spacing={0.5}>
                        <Typography className={styles.label}>Stats</Typography>
                        <Typography className={styles.name}>{user && user.first_name + " " + user.last_name}</Typography>
                        <Typography className={styles.position}>Attacker</Typography>
                    </Stack>
                </Box>
                <Box className={styles.pointContainer}>
                    <Typography className={styles.pointLabel}>Fantasy Points</Typography>
                    <Typography className={styles.point}>77</Typography>
                </Box>
            </Stack>
            <GroupButton captions={options} onIndexChange={(index) => setTab(index)} />
            <Stack direction={isMobile ? 'column-reverse' : 'row'} spacing={2} mt={1.5}>
                <Box className={styles.tableContainer}>
                    {records.map((record, index) => {
                        const active = record.label === currentRecord;
                        const value = tab ? record.value.reduce((total, value) => total + value, 0) : record.value[3];
                        return (
                            <Box
                                key={index}
                                className={active? styles.activeRecord : styles.recordContainer}
                                onClick={() => setCurrentRecord(record.label)}
                            >
                                <Typography className={styles.recordText}>{record.label}</Typography>
                                <Box className={styles.arrowContainer}>
                                    <Typography className={styles.recordValue}>{value}</Typography>
                                    {active && <img src={RightArrow} alt='' />}
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                <Box className={styles.chartContainer}>
                    <Box className={styles.titleContainer}>
                        <Typography className={styles.chartTitle}>{tab ? 'All Season' : 'Last Match'} {currentRecord}</Typography>
                        <img src={RightArrow} alt='' />
                        <Typography className={styles.chartTitle}>{chartValue}</Typography>
                    </Box>
                    <RenderChart data={chartData} />
                </Box>
            </Stack>
        </Box>
    );
}

export default Stats;