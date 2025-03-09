import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import "./NavBar.css";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavBar = ({ open, handleDrawerOpen }) => {
  return (
    <AppBar position="fixed" open={open} className="navbar">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={open ? "hide" : ""}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
           Arrival Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
