import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Hidden } from '@mui/material';
import styles from './ChatBox.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { alpha } from '@mui/material/styles';

function ChatBox({ chatLog, setChatLog }) {
  const [message, setMessage] = useState('');
  const isChatEmpty = chatLog.length === 0;
  const [isBeginning, setIsBeginning] = useState(true)
  
  useEffect(() => {
    console.log('This is the chat: ' + chatLog)
  }, [chatLog]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  
  const inputFieldHeight = 'calc(100px + 2em)';

  const renderers = {
    code: ({node, inline, className, children, ...props}) => {
      const match = /language-(\w+)/.exec(className || '')
      const codeString = String(children).replace(/\n$/, '');
      
      if (!inline && match) {
        return (
          <Box style={{ position: 'relative', paddingBottom: '5px', paddingRight: '5px', backgroundColor: 'rgb(29, 31, 33)', borderRadius: '3px' }}>
            <Typography variant="overline" display="block" gutterBottom sx={{paddingLeft:'8px'}}>
              {match[1]}
            </Typography>
            <SyntaxHighlighter 
              language={match[1]} 
              PreTag="div" 
              style={atomDark}
              children={codeString} 
              {...props} 
            />
            <Button
              size="small"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                color: 'white',
                backgroundColor: 'transparent',
                textTransform: 'none'
              }}
              onClick={() => copyToClipboard(codeString)}
            >
              <FileCopyIcon fontSize="small" />
              Copy Code
            </Button>
          </Box>
        )
      } else {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    },
    a: ({node, ...props}) => <a {...props} style={{ color: 'white', fontWeight: '700' }} />,};
  
  
    const handleInputSubmit = async (event) => {
      event.preventDefault();
      if (message.trim() !== '') {
        setMessage('');
        if (isBeginning) setIsBeginning(false);

        
          const updatedChatLog = [...chatLog, {user: "me", message: message}];
          setChatLog(updatedChatLog);
          
          let url = "https://vim-challenge.com/chat-bff/";
        try{
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user: "me",
              message: updatedChatLog.length === 1 ? updatedChatLog[0].message + "@#@" : updatedChatLog.map((message) => message.message).join("@#@"),
            })
          });
                    
          const data = await response.json();
          setChatLog((prevChatLog) => [...prevChatLog, {user:"ai", message:`${data.message}`}]);
          console.log('Rendered chatLog: ' + JSON.stringify(chatLog));
        }  
        catch{
          setChatLog((prevChatLog) => [...prevChatLog, {user:"ai", message:`I am an AI`}]);
        }
      }
    };

    const theme = createTheme({
      palette: {
          primary: {
              main: '#128743',
          },
          secondary: {
              main: '#54ff9d',
          },
          background: {
              default: '#121212',
              paper: '#1e1e1e',
          },
          text: {
              primary: '#fff',
              secondary: '#aaa',
          },
      },
      typography: {
          fontFamily: 'Arial, sans-serif', // Consider a modern font
      },
  });

  const welcomeMessage = `I'm the gate keeper, how can I help`
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{  
        position: 'fixed',
        bottom: '0px', 
        right: '0px', 
        width: '100%',
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        p: 1, 
        bgcolor: '#121212', 
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
      {(isChatEmpty) ? (
        <>
          <Hidden only={['xs', 'sm']}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Typography sx={{paddingTop: '20px', fontFamily: 'Courier New', color: '#54ff9d', fontWeight: 'bold', fontSize: '48px',}}>
                <ReactMarkdown>
                  {welcomeMessage}
                </ReactMarkdown>
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}></Box>
          </Hidden>
          <Hidden only={['md', 'lg', 'xl']}>
            <div style={{height: '100%'}}></div>
          </Hidden>
        </>
      ) : (
        <Box sx={{overflowY: 'auto', paddingBottom: inputFieldHeight, wordWrap: 'break-word', flexGrow: 1, mb: 2, mt: '8px', width: '100%',  borderRadius: '2px', paddingTop: '25px',}}>
          {chatLog.map((msg, index) => (
            <Typography key={index}  sx={{ color: 'white', fontWeight: '500', fontFamily: 'Courier New', borderRadius: '2px', fontSize: {lg: '20px', md: '18px'}, bgcolor: msg.user === 'ai' ? 'rgba(128, 128, 128, 0.3)' : '#128743', paddingLeft: '10px' }} gutterBottom>
              <ReactMarkdown remarkPlugins={[gfm]} components={renderers}>
                {msg.message}
              </ReactMarkdown>
            </Typography>
          ))}
        </Box>
      )}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '1em',
        }}
      >
      <Box component="form" onSubmit={handleInputSubmit} sx={{ display: 'flex', justifyContent: 'space-between', borderRadius: '2px', padding: '4px', background: 'transparent', width: '70%', }}>
        <TextField 
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleInputSubmit(e);
            }
          }}
          sx={{ 
            ...theme.typography.body1,
            flexGrow: 1, 
            mx: 1, 
            backgroundColor: alpha(theme.palette.secondary.main, 0.5), 
            borderRadius: '2px',
            transition: '0.3s',
            '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.9),
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
          }}
          variant="outlined"
          value={message}
          onChange={handleInputChange}
          multiline
          inputProps={{ 
            style: { 
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'Courier New',
              maxHeight: '100px',
              overflowY: 'auto'
            } 
          }}
        />
        <Button type="submit" variant="contained" sx={{backgroundColor: theme.palette.primary.main, borderRadius: '2px', background: 'rgba(128, 128, 128, 0.2)', fontFamily: 'Courier New', color: 'white', transition: '0.3s', '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.8),
                                }, }}>Send</Button>
      </Box>
      </Box>
</Box>
</ThemeProvider>
);

}

export default ChatBox;