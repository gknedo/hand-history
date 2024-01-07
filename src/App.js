import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import HandLog from './components/HandLog';
import ActionBar from './components/ActionBar';
import './App.css';
import HandViewer from './components/HandViewer';

function App() {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if(isLoading) return "Loading..."

  return (
    <div className='main_body playingCards fourColours inText'>
      <Typography variant="h2">
        Suprema Hand History
      </Typography>
      <ActionBar
        setData={setData}
        setIsLoading={setIsLoading}
      />
      <HandViewer handData={data}/>

    </div>
  );
}

export default App;
