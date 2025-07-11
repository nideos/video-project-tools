import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import GeoRestrictionTool from './pages/GeoRestrictionTool';
import { Typography } from '@mui/material';

// 首頁元件
const HomePage = () => (
  <>
    <Typography variant="h1" component="h1">
      影視工具
    </Typography>
    <Typography variant="body1" component="p">
      歡迎使用我們的內部工具！請從左側選擇一個工具開始。
    </Typography>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="geo-restriction" element={<GeoRestrictionTool />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
