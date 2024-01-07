import React from 'react';
import { Typography } from '@mui/material';
import PlayingCard from './PlayingCard/PlayingCard';

const renderStart = (smallBlind, bigBlind) => {
  return <Typography variant="body1">Blinds: {smallBlind}/{bigBlind}</Typography>
}

const renderAnte = (ante) => {
  return <Typography variant="body1">Ante: {ante}</Typography>
}

const toBB = (stack, bb) => {
  return `${(stack/bb).toFixed(1)} BB`
}

const renderPlayerAction = (action, pos, chips, coins, bb, pattern) => {
  const patternStr = pattern !== "" ? `- ${pattern} ` : "";
  if(action === "SB" || action === "BB") return;
  if(["check", "fold"].includes(action)) return <Typography variant="body1">{pos} {patternStr} - {action} ({toBB(coins, bb)} left)</Typography>
  if(["raise", "call", "bet"].includes(action)) return <Typography variant="body1">{pos} {patternStr} - {action} {toBB(chips, bb)} ({toBB(coins, bb)} left)</Typography>
}

const renderNextRound = (cards, stateName, pot, bb) => {
  let next = {
    "preflop": "FLOP",
    "flop": "TURN",
    "turn": "RIVER",
    "river": "SHOWDOWN"
  }[stateName];

  return <Typography variant="body1">{next} - {cards.map((card) => <PlayingCard card={card}/>)} - Pot {toBB(pot, bb)}</Typography>
}

const renderGameExtra = ({e, pos, action, smallblind, bigblind, chips, coins, cards, stateName, pot, pattern}, bb) => {
  if(e === "startinfo") return renderStart(smallblind, bigblind);
  if(e === "player_action" && action === "ante" && pos === "BTN" ) return renderAnte(chips);
  if(e === "player_action" ) return renderPlayerAction(action, pos, chips, coins, bb, pattern);
  if(e === "nextround" ) return renderNextRound(cards, stateName, pot, bb);
}

function HandLog({handData}) {
  if(!handData) return;

  const bb = handData.gameExtra[0].bigblind
  const {name} = handData.matchExtra

  return (
    <div>  
      <Typography variant="body1">{name}</Typography>
      {handData.gameExtra.map((event) => renderGameExtra(event, bb))}
    </div>
  );
}

export default HandLog;
