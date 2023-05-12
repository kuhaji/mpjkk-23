import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useUser} from '../hooks/ApiHooks';
import {themeOptions} from '../theme/themeOptions';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = () => {
  const {user, setUser} = useContext(MediaContext);
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);

  const getUserInfo = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      console.log(userToken);
      const userData = await getUserByToken(userToken);
      if (userData) {
        setUser(userData);
        const target = location.pathname === '/' ? '/home' : location.pathname;
        navigate(target);
        return;
      }
    }
    navigate('/');
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const theme = createTheme(themeOptions);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            left: 0,
            right: 0,
            padding: '10px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
          }}
        >
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mr: 2, display: {md: 'none'}}}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
                textAlign: 'left',
              }}
            >
              Photography Gallery
            </Typography>
            <Box sx={{mr: 2}}>
              <Button sx={{color: 'black'}} component={Link} to="/home">
                Home
              </Button>
              {user ? (
                <>
                  <Button sx={{color: 'black'}} component={Link} to="/profile">
                    Profile
                  </Button>
                  <Button sx={{color: 'black'}} component={Link} to="/upload">
                    Upload
                  </Button>
                  <Button sx={{color: 'black'}} component={Link} to="/myfiles">
                    My Files
                  </Button>
                  <Button sx={{color: 'black'}} component={Link} to="/logout">
                    Logout
                  </Button>
                </>
              ) : (
                <Button sx={{color: 'black'}} component={Link} to="/">
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: '250px',
            },
          }}
        >
          <List>
            <ListItem button component={Link} to="/home">
              <ListItemText primary="Home" />
            </ListItem>
            {user && (
              <>
                <ListItem button component={Link} to="/profile">
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button component={Link} to="/upload">
                  <ListItemText primary="Upload" />
                </ListItem>
                <ListItem button component={Link} to="/myfiles">
                  <ListItemText primary="My Files" />
                </ListItem>
                <ListItem button component={Link} to="/logout">
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
        <Box sx={{flexGrow: 1}}>
          <main>
            <Outlet />
          </main>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
