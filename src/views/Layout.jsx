import {
  AppBar,
  Container,
  createTheme,
  ThemeProvider,
  Toolbar,
  Box,
  Button,
  CssBaseline,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
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
      <Container maxWidth="xl">
        <AppBar position="sticky" sx={{color: 'white'}}>
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
                mr: 2,
                display: {xs: 'none', md: 'flex'},
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Digital Photography Portfolio
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
        <main>
          <Outlet />
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
