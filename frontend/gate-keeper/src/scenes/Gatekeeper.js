import React, { useState, useEffect } from 'react';
import ChatBox from '../components/Chat/ChatBox';
import { Box, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function Gatekeeper() {
  const [chatLog, setChatLog] = useState([]);

  return (
<Grid container sx={{ height: '100vh' }}>
  <Grid item xs={12} md={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        p: 1, 
        bgcolor: 'transparent',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
    }}>
      <ChatBox 
        chatLog={chatLog} 
        setChatLog={setChatLog} 
      />
    </Box>
  </Grid>
</Grid>

  );
}

export default Gatekeeper;
