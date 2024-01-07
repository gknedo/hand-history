import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import HandLog from './HandLog';
import HandBreakdown from './HandBreakdown';

function HandViewer({handData}) {
  const [selectedView, setSelectedView] = useState("log");
  const [players, setPlayers] = useState([]);

  if(!handData) return;

  return (
    <div>
      <ToggleButtonGroup
        value={selectedView}
        exclusive
        onChange={(_e, view) => setSelectedView(view)}
      >
        <ToggleButton value="log" aria-label="centered">
          Text Log
        </ToggleButton>
        <ToggleButton value="breakdown" aria-label="centered">
          Player Breakdown
        </ToggleButton>
      </ToggleButtonGroup>
      
      {selectedView === "log" && <HandLog handData={handData}/>}
      {selectedView === "breakdown" && <HandBreakdown handData={handData}/>}
    </div>
  )
}
  
  export default HandViewer;