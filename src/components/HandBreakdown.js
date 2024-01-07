import React from 'react';
import { Typography } from '@mui/material';
import PlayingCard from './PlayingCard/PlayingCard';

function HandBreakdown({handData}) {
  if(!handData) return;

  const bb = handData.gameExtra[0].bigblind
  const {name} = handData.matchExtra

  console.log(handData);

  return (
    <div>  
      <Typography variant="body1">{name}</Typography>
    </div>
  );
}

export default HandBreakdown;
