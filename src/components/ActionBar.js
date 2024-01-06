import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

import mockedResponse from '../mocks/response.json';

const getResult = async (handUrl, opts = {}) => {
  const { mocked } = opts;
  if(mocked) return mockedResponse;

  const handId = handUrl.split("t=")[1].split("&")[0].slice(0,8);
  const response = await fetch(`https://ra.supremapoker.net/supremaAPI/replayInfo.php?s=${handId}`);

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  return await response.json();
}

function ActionBar({setData, setIsLoading}) {
  const [currentUrl, setCurrentUrl] = useState('');

  const handleClick = async (handURL) => {
    if(!handURL || handURL.length === 0) return;
    console.log(handURL);
    setIsLoading(true);

    try {
      const result = await getResult(handURL, {
        mocked: true,
      });

      setData(result);
    } finally {
      setIsLoading(false);
    }
  };
  
    return (
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
    );
  }
  
  export default ActionBar;