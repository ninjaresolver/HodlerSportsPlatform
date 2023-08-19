import { useReducer, useState } from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GroupButton from '../GroupButton';

import styles from './Leaderboard.module.css';

import Up from '../../assets/images/up.png';
import Down from '../../assets/images/down.png';
import NoChange from '../../assets/images/nochange.png';
import Hodler from '../../assets/images/holder.png';
import Juventinos from '../../assets/images/juventinos.png';
import Player1 from '../../assets/images/player-1.png';
import Player2 from '../../assets/images/player-2.png';
import Player3 from '../../assets/images/player-3.png';

const options = ['League', 'Team'];
const header = ['Place', 'Full Name', 'Team', 'Points'];
const initData = [
  { place: '1st', change: Up, name: 'Marcos castillo', team: 'Hodler Miami FC', teamIcon: Hodler, point: 67 },
  { place: '2nd', change: Down, name: 'Marcos castillo', team: 'Juventinos FC', teamIcon: Juventinos, point: 67 },
  { place: '3rd', change: NoChange, name: 'Marcos castillo', team: 'Juventinos FC', teamIcon: Juventinos, point: 67 },
  { place: '3rd', change: NoChange, name: 'Marcos castillo', team: 'Juventinos FC', teamIcon: Juventinos, point: 67 },
  { place: '3rd', change: NoChange, name: 'Marcos castillo', team: 'Juventinos FC', teamIcon: Juventinos, point: 67 },
  { place: '3rd', change: NoChange, name: 'Marcos castillo', team: 'Juventinos FC', teamIcon: Juventinos, point: 67 },
  { place: '3rd', change: NoChange, name: 'Marcos castillo', team: 'Juventinos FC', teamIcon: Juventinos, point: 67 },
];

const LeaderBoard = () => {
  let carouselRef = null;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(0);
  const [leaguePlayerData, setLeagueData] = useState([...initData]);
  const [teamPlayerData, setTeamData] = useState([...initData]);
  const forceUpdate = useReducer(x => x + 1, 0)[1];

  const onIndexChanged = (index) => {
    setPage(index);
    carouselRef.goToSlide(index);
  };

  const loadMoreData = () => {
    const newData = Array(3).fill({ place: '8th', change: NoChange, name: 'Marcos castillo', team: 'Juventinos FC', teamIcon: Juventinos, point: 67 });
    if (page > 0) {
      teamPlayerData.push(...newData);
      setTeamData(teamPlayerData);
    } else {
      leaguePlayerData.push(...newData);
      setLeagueData(leaguePlayerData);
    }
    forceUpdate();
  };

  return (
    <Box className={styles.container}>
      {/* {!isMobile && <GroupButton captions={options} onIndexChange={onIndexChanged} />} */}
      <GroupButton captions={options} onIndexChange={onIndexChanged} />
      <Carousel
        ref={(el) => (carouselRef = el)}
        arrows={false}
        swipeable={false}
        draggable={false}
        responsive={{
          mobile: {
            breakpoint: { max: 3000, min: 0 },
            items: 1,
          }
        }}>
        {options.map((option) => {
          const playerData = option === 'League' ? leaguePlayerData : teamPlayerData;
          return (
            <Box key={option}>
              <Typography className={styles.title}>{option} fantasy leaderboard</Typography>
              <Box className={styles.leaderBox}>
                <Box className={styles.leaderColumn}>
                  <img src={Player2} alt='' className={styles.playerAvatar} />
                  <Typography className={styles.playerName}>Carlos Rodriguez</Typography>
                  <Box className={styles.secondBar}>
                    <Typography className={styles.description}>2ND</Typography>
                    <Typography className={styles.playerPoint}>54PTS</Typography>
                  </Box>
                </Box>
                <Box className={styles.leaderColumn}>
                  <img src={Player1} alt='' className={styles.playerAvatar} />
                  <Typography className={styles.playerName}>Marcos Castillo</Typography>
                  <Box className={styles.firstBar}>
                    <Typography className={styles.description}>1ST</Typography>
                    <Typography className={styles.playerPoint}>67PTS</Typography>
                  </Box>
                </Box>
                <Box className={styles.leaderColumn}>
                  <img src={Player3} alt='' className={styles.playerAvatar} />
                  <Typography className={styles.playerName}>Pedro Salas</Typography>
                  <Box className={styles.thirdBar}>
                    <Typography className={styles.description}>3RD</Typography>
                    <Typography className={styles.playerPoint}>47PTS</Typography>
                  </Box>
                </Box>
              </Box>
              <Typography className={styles.description}>We have a winner for the moment!</Typography>
              <Typography className={styles.winner}>Marcos Castillo is winning the league fantasy this week with 67 points so far</Typography>
              <Box className={styles.playerList}>
                <Box className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                    <tr>
                      {header.map((label, index) => (
                        <th key={index} style={{ position: 'sticky', top: 0, background: 'black' }}>
                          <Typography className={styles.tableHeader}>{label}</Typography>
                        </th>
                      ))}
                    </tr>
                    </thead>
                    <tbody>
                    {playerData.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.tableCell}>
                          <Stack direction='row' alignItems='center' spacing={1}>
                            <Typography className={styles.cellText}>{item.place}</Typography>
                            <img src={item.change} alt='' />
                          </Stack>
                        </td>
                        <td className={styles.tableCell}>
                          <Typography className={styles.cellText}>{item.name}</Typography>
                        </td>
                        <td className={styles.tableCell}>
                          <Stack direction='row' alignItems='center' spacing={1}>
                            <img src={item.teamIcon} alt='' />
                            <Typography className={styles.cellText}>{item.team}</Typography>
                          </Stack>
                        </td>
                        <td className={styles.tableCell}>
                          <Typography className={styles.points}>{item.point}PTS</Typography>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </Box>
                <div>
                  <Box className={styles.loadButton} onClick={loadMoreData}>
                    <Typography className={styles.buttonText}>Load More</Typography>
                  </Box>
                </div>
              </Box>
            </Box>
          )
        })}
      </Carousel>
    </Box>
  )
}

export default LeaderBoard;