import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
  <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

