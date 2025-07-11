import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 標準化 CSS，確保跨瀏覽器一致性 */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);