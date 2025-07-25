import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Exercise from "./components/Exercise.tsx";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Food from "./components/Food.tsx";
import GoogleLoginButton from "./components/GoogleLoginButton.tsx";
import LogoutButton from "./components/LogoutButton.tsx";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./components/Profile.tsx";
// @ts-expect-error unused import
import React from "react";
import Report from "./components/Report.tsx";
import { useAuth } from "./context/useAuth.ts";

function App() {
  const { token } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [appBarHeight, setAppBarHeight] = useState(0);
  const appBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const prevTokenRef = useRef(token);

  useEffect(() => {
    if (!prevTokenRef.current && token) {
      // Token transitioned from falsy to truthy (just logged in)
      void navigate("/profile", { replace: true });
    }
    prevTokenRef.current = token;
  }, [token, navigate]);

  useEffect(() => {
    const updateAppBarHeight = () => {
      if (appBarRef.current) {
        setAppBarHeight(appBarRef.current.offsetHeight);
      }
    };

    updateAppBarHeight();
    window.addEventListener("resize", updateAppBarHeight);
    return () => window.removeEventListener("resize", updateAppBarHeight);
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
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        ref={appBarRef}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Fitness Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This is to offset the content below the AppBar */}
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: isDesktop ? 240 : "auto",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            marginTop: `${appBarHeight}px`,
            height: `calc(100% - ${appBarHeight}px)`,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
      <div
        style={{
          marginLeft: isDesktop ? "240px" : 0,
          padding: "20px",
          width: isDesktop ? "calc(100% - 240px)" : "100%",
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
                  <BottomNavigationAction
                    label="Profile"
                    icon={<AccountCircleIcon />}
                    component={NavLink}
                    to="/profile"
                  />
                  <BottomNavigationAction
                    label="Food"
                    icon={<FastfoodIcon />}
                    component={NavLink}
                    to="/food"
                  />
                  <BottomNavigationAction
                    label="Exercise"
                    icon={<FitnessCenterIcon />}
                    component={NavLink}
                    to="/exercise"
                  />
                  <BottomNavigationAction
                    label="Reports"
                    icon={<AssessmentIcon />}
                    component={NavLink}
                    to="/reports"
                  />
                </BottomNavigation>
              </>
            )}
          </>
        ) : (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <GoogleLoginButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
