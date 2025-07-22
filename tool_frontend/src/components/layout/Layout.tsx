import { Box, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { text: '首頁', path: '/' },
  { text: '地區限制工具', path: '/geo-restriction' },
  { text: 'M3U8 下載器', path: '/m3u8-downloader' },
];

const Layout = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      {/* Sidebar */}
      <Box
        component="aside"
        sx={{
          width: open ? 240 : 60, // 關閉時保留足夠空間給按鈕
          flexShrink: 0,
          bgcolor: 'background.paper', // 使用主題中的淺灰色
          borderRight: 1,
          borderColor: 'divider',
          p: open ? '20px' : '10px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          transition: 'width 0.3s, padding 0.3s',
          position: 'relative' // 增加相對定位以容納按鈕
        }}
      >
        <IconButton
          color="primary"
          aria-label="toggle drawer"
          onClick={handleDrawerToggle}
          sx={{
            position: 'absolute',
            top: '10px',
            right: open ? '10px' : 'auto',
            left: open ? 'auto' : '10px',
            zIndex: 1,
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': {
              bgcolor: 'background.paper',
            }
          }}
        >
          {open ? <MenuIcon /> : <MenuIcon />}
        </IconButton>
        {open && (
          <List component="nav" sx={{ mt: '40px' }}> {/* 增加上方邊距，為按鈕留出空間 */}
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: '8px' }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  end 
                  sx={{
                    borderRadius: '4px',
                    '&.active': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      fontWeight: '500',
                      '&:hover': {
                          backgroundColor: 'primary.dark',
                      }
                    },
                    '&.active .MuiListItemText-primary': {
                      color: 'primary.contrastText',
                      fontWeight: '500',
                    }
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ 
            flexGrow: 1, 
            p: '40px', 
            boxSizing: 'border-box', 
            overflowY: 'auto',
            bgcolor: 'background.default', // 使用主題中的白色
            position: 'relative'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;