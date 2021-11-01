import React from 'react';
import AppRouter from './components/AppRouter'
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
import Storage from "./StorageModel/Storage";


// Create a theme instance.
let theme = createTheme();

theme = responsiveFontSizes(theme);

function App(): JSX.Element {

  // we want a single storage object per app instance.
  const initialObject = { "my first graph": [] };
  const storage = new Storage(initialObject);

  return (
    <ThemeProvider theme={theme}>
      <AppRouter storage={storage}/>
    </ThemeProvider>
  );
}

export default App;
