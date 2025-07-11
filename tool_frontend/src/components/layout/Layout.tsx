import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { text: '首頁', path: '/' },
  { text: '地區限制工具', path: '/geo-restriction' },
];

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      {/* Sidebar */}
      <Box
        component="aside"
        sx={{
          width: 240,
          flexShrink: 0,
          bgcolor: 'background.paper', // 使用主題中的淺灰色
          borderRight: 1,
          borderColor: 'divider',
          p: '20px',
          boxSizing: 'border-box'
        }}
      >
        <Typography variant="h2" component="h2" sx={{ mb: '20px' }}>
          導覽列
        </Typography>
        <List component="nav">
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: '8px' }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end // 確保只有完全匹配的路徑才為 active
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
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ 
            flexGrow: 1, 
            p: '40px', 
            boxSizing: 'border-box', 
            overflowY: 'auto',
            bgcolor: 'background.default' // 使用主題中的白色
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;