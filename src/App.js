import './App.css';
import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const defaultData = {
  gameExtra: [{bigblind: 1}],
  matchExtra: {},
}

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

  return <Typography variant="body1">{next} - {cards.join(" ")} - Pot {toBB(pot, bb)}</Typography>
}

const renderGameExtra = ({e, pos, action, smallblind, bigblind, chips, coins, cards, stateName, pot, pattern}, bb) => {
  if(e === "startinfo") return renderStart(smallblind, bigblind);
  if(e === "player_action" && action === "ante" && pos === "BTN" ) return renderAnte(chips);
  if(e === "player_action" ) return renderPlayerAction(action, pos, chips, coins, bb, pattern);
  if(e === "nextround" ) return renderNextRound(cards, stateName, pot, bb);
}

function App() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const bb = data.gameExtra[0].bigblind

  const {name, playerCount, mttCurBlindLevel, mttprizecount} = data.matchExtra
  const handleClick = async (handURL) => {
    if(!handURL || handURL.length === 0) return;
    console.log(handURL);
    setIsLoading(true);

    try {
      const handId = currentUrl.split("t=")[1].split("&")[0].slice(0,8);
      console.log(handId);
      const response = await fetch(`https://ra.supremapoker.net/supremaAPI/replayInfo.php?s=${handId}`);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='main_body'>
      <Typography variant="h2">
        Suprema Hand History
      </Typography>
      <div className='action_bar'>
        <TextField
          id="url-text"
          label="Hand Url"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={() => handleClick(currentUrl)}>Analyze</Button>

      </div>
      <Typography variant="body1">{name}</Typography>
      {data.gameExtra.map((event) => renderGameExtra(event, bb))}
      
    </div>
  );
}

export default App;
