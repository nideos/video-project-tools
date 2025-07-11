import { createTheme } from '@mui/material/styles';

// 根據 design/README.md 和 homepage_mockup.html 建立的主題
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 主色
    },
    background: {
      default: '#ffffff', // 頁面背景
      paper: '#f5f5f5',   // 側邊欄背景
    },
    text: {
      primary: '#333333',   // 主要文字
      secondary: '#555555', // 次要文字
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1976d2',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#1976d2',
    },
    body1: {
      fontSize: '1.1rem',
      color: '#555555',
    },
  },
  components: {
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: '#ffffff', // 將 Paper 元件預設背景改為白色
            }
        }
    }
  }
});

export default theme;
