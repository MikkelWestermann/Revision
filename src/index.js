import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App/App';
import * as serviceWorker from './serviceWorker';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#d46bff',
      main: 'rgba(157, 55, 252, 0.8)',
      dark: 'rgba(102, 0, 200, 0.8)',
      contrastText: '#FAFAFF',
    },
    secondary: {
      light: '#ff8e8c',
      main: '#ff5a5f',
      dark: '#c62035',
      contrastText: '#191D32',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
