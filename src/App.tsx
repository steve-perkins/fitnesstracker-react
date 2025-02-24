import {
  AppBar,
  BottomNavigation, BottomNavigationAction,
  Divider,
  Drawer, IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FastFoodIcon from "@mui/icons-material/FastFood";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {useEffect, useRef, useState} from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import Profile from "./components/Profile.tsx";
import Food from "./components/Food.tsx";
import Exercise from "./components/Exercise.tsx";
import Report from "./components/Report.tsx";
import GoogleLoginButton from "./components/GoogleLoginButton.tsx";
import LogoutButton from "./components/LogoutButton.tsx";
import {useAuth} from "./context/useAuth.ts";

function App() {
  const { token } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [appBarHeight, setAppBarHeight] = useState(0);
  const appBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateAppBarHeight = () => {
      if (appBarRef.current) {
        setAppBarHeight(appBarRef.current.offsetHeight);
      }
    };

    updateAppBarHeight();
    window.addEventListener('resize', updateAppBarHeight);
    return () => window.removeEventListener('resize', updateAppBarHeight);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
      <div>
        {token && isDesktop && (
          <>
            <List>
              <ListItem component={NavLink} to="/profile">
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem component={NavLink} to="/food">
                <ListItemText primary="Food" />
              </ListItem>
              <ListItem component={NavLink} to="/exercise">
                <ListItemText primary="Exercise" />
              </ListItem>
              <ListItem component={NavLink} to="/reports">
                <ListItemText primary="Reports" />
              </ListItem>
            </List>
            <Divider />
          </>
        )}
        <List>
          <ListItem>
            <LogoutButton />
          </ListItem>
        </List>
      </div>
  );

  return (
      <div>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} ref={appBarRef}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Fitness Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* This is to offset the content below the AppBar */}
        <Drawer
            variant={isDesktop ? 'permanent' : 'temporary'}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{
              width: isDesktop ? 240 : 'auto',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                marginTop: `${appBarHeight}px`,
                height: `calc(100% - ${appBarHeight}px)`,
                boxSizing: 'border-box',
              },
            }}
        >
          {drawer}
        </Drawer>
        <div
          style={{
            marginLeft: isDesktop ? '240px' : 0,
            padding: '20px',
            width: isDesktop ? 'calc(100% - 240px)' : '100%',
          }}
        >
          {token ? (
            <>
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/food" element={<Food />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="/reports" element={<Report />} />
              </Routes>
              {!isDesktop && (
                <>
                  <Divider />
                  <BottomNavigation showLabels>
                    <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} component={NavLink} to="/profile" />
                    <BottomNavigationAction label="Food" icon={<FastFoodIcon />} component={NavLink} to="/food" />
                    <BottomNavigationAction label="Exercise" icon={<FitnessCenterIcon />} component={NavLink} to="/exercise" />
                    <BottomNavigationAction label="Reports" icon={<AssessmentIcon />} component={NavLink} to="/reports" />
                  </BottomNavigation>
                </>
              )}
            </>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <GoogleLoginButton />
            </div>
          )}
        </div>
      </div>
  );
}

export default App
