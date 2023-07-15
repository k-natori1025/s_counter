import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom'
import { CardMedia } from '@mui/material';

const theme = createTheme();

export default function LayoutForCustomers(props) {

  const navigate = useNavigate();
  const goBackToTop = () => {
    navigate('/topforcustomers')
  }

  return (<>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
          <Toolbar>
            <CardMedia component='img' image='/logo_white.png' sx={{ width: 80, height: 80, cursor: "pointer" }} onClick={goBackToTop} />
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              サウナ混雑状況把握アプリ
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  </>);
}