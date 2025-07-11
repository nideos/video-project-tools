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
