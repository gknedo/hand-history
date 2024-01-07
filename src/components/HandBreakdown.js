import React, { useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PlayingCard from './PlayingCard/PlayingCard';

function HandBreakdown({handData}) {
  console.log(handData);

  const allPlayers = useMemo(() => {
    if(!handData) return [];
    
    const players = [];
    Object.values(handData.players).forEach(player => {
      players[player.seat] = player.displayID;
    });

    return players;
  },[handData]);

  const activePlayers = useMemo(() => {
    if(!handData) return [];

    const players = [];
    let afterFlop = false;
    Object.values(handData.gameExtra).forEach(action => {
      if(action.stateName === "preflop") afterFlop = true;
      if(!afterFlop || action.e !== "player_action") return;
      players[action.seat] = true;
    });

    return players;
  },[handData]);

  const playerPatterns = useMemo(() => {
    if(!handData) return [];

    const streets = [];
    let currentStreet = 0;
    Object.values(handData.gameExtra).forEach(action => {
      if(!!action.stateName) currentStreet = currentStreet+1;
      if(currentStreet < 1 || action.e !== "player_action") return;

      const current = streets[currentStreet] || [];
      current[action.seat] = action.pattern;
      streets[currentStreet] = current;
    });

    return streets;
  },[handData]);

  if(!handData) return;

  console.log(playerPatterns);
  
  const sharedCards = handData.gameResult.sharedcards;

  return (
    <TableContainer component={Paper} style={{width: "max-content"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width={150}>Board</TableCell>
            {allPlayers.map((player, seat) => {
              if(!activePlayers[seat]) return null;
              return <TableCell key={player} align="right" width={100}>{player}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key="flop"
          >
            <TableCell align='left'>
              <PlayingCard card={sharedCards[0]}/>
              <PlayingCard card={sharedCards[1]}/>
              <PlayingCard card={sharedCards[2]}/>
            </TableCell>
            {allPlayers.map((player, seat) => {
              if(!activePlayers[seat]) return null;
              return <TableCell key={player} align="right">{playerPatterns[1][seat]}</TableCell>
            })}
          </TableRow>
          <TableRow
            key="turn"
          >
            <TableCell align='left'>
              <PlayingCard card={sharedCards[0]}/>
              <PlayingCard card={sharedCards[1]}/>
              <PlayingCard card={sharedCards[2]}/>
              {" | "}
              <PlayingCard card={sharedCards[3]}/>
            </TableCell>
            {allPlayers.map((player, seat) => {
              if(!activePlayers[seat]) return null;
              return <TableCell key={player} align="right">{playerPatterns[2][seat]}</TableCell>
            })}
         </TableRow>
          <TableRow
            key="river"
          >
            <TableCell align='left'>
              <PlayingCard card={sharedCards[0]}/>
              <PlayingCard card={sharedCards[1]}/>
              <PlayingCard card={sharedCards[2]}/>
              <PlayingCard card={sharedCards[3]}/>
              {" | "}
              <PlayingCard card={sharedCards[4]}/>
            </TableCell>
            {allPlayers.map((player, seat) => {
              if(!activePlayers[seat]) return null;
              return <TableCell key={player} align="right">{playerPatterns[3][seat]}</TableCell>
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HandBreakdown;
