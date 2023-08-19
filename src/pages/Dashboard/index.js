import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import styles from './Dashboard.module.css';

import Navigation from '../../components/Navigation';
import Stats from '../../components/Stats';
import PlayerCard from '../../components/PlayerCard';
import League from '../../components/League';
import LeaderBoard from '../../components/LeaderBoard';
import Trophies from '../../components/Trophies';
import Balances from '../../components/Balances';

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {isMobile && <Navigation />}
            <Box className={styles.container}>
                <Grid container spacing={3} direction='row'>
                    <Box
                        component={Grid}
                        item
                        xs={12}
                        lg='auto'
                        display={{ xs: 'none', md: 'block' }}
                    >
                        <Navigation />
                    </Box>
                    <Box
                        component={Grid}
                        item
                        container
                        xs={12}
                        lg={true}
                        spacing={3}
                        className={styles.rightPanel}
                    >
                        <Grid container item spacing={3} xs={12} lg>
                            <Grid item xs={12}>
                                <Stats />
                            </Grid>
                            <Grid container item spacing={3} direction={isMobile ? 'row' : 'row-reverse'}>
                                <Grid item xs={12} md={4}>
                                    <League />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <PlayerCard />
                                </Grid>
                            </Grid>
                        <Grid item xs={12} md={8}>
                            <LeaderBoard />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Trophies />
                        </Grid>
                        {isMobile && (
                            <Grid item xs={12}>
                                <Balances />
                            </Grid>
                        )}
                        </Grid>
                    </Box>
                </Grid>
            </Box>
        </>
    );
};

export default Dashboard;
