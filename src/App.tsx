import { useState } from 'react';
import { AppBar, Box, Container, createTheme, ThemeProvider, CssBaseline, Toolbar, Typography, Button } from '@mui/material'
import Home from './components/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const App = () => {

  const [appTheme, changeAppTheme] = useState<any>('light');

  const theme = createTheme({
    palette: {
      primary: {
        main: '#7b68ee'
      },
      secondary: {
        main: '#FFFFFF'
      },
      mode: appTheme
    }
  });


  return (<ThemeProvider theme={theme}>
    <AppBar position="fixed">

      <Toolbar variant="dense" style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Typography variant="h6">
          Multi-Step Form
        </Typography>

        <Button
          onClick={() => appTheme === 'light' ? changeAppTheme('dark') : changeAppTheme('light')}
        >
          {appTheme === 'light' ? <LightModeIcon style={{ color: 'white' }} /> : <DarkModeIcon />}
        </Button>

      </Toolbar>

    </AppBar>

    <CssBaseline />

    <Container>

      <Box marginTop={10}>
        <Home />
      </Box>

    </Container>
  </ThemeProvider>);
}

export default App;
