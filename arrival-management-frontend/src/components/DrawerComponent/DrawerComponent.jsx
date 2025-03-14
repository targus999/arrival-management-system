import React from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import "./DrawerComponent.css";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";

const drawerWidth = 240;

const DrawerComponent = ({ open, handleDrawerClose, openModal }) => {
  const navigate = useNavigate(); 
  const theme = useTheme();

  // Function to navigate to the selected path
  const handleNavigate = (text) => {
    const path=text.split(" ")[0].toLowerCase();
    if(path === "all") {navigate("/");}
    else navigate(`/${path}`)
    handleDrawerClose();
    }
  return (
    <Drawer
      className="drawer"
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div className="drawer-header">
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <List>
      <ListItem>
        <Button variant="contained" color="success" size="small" startIcon={<AddIcon />} onClick={() => openModal()}>Add Arrival</Button>
      </ListItem>
      <Divider />
        {["All Arrivals", "Upcoming Arrivals", "Finished Arrivals"].map((text, index) => (
          <React.Fragment key={text}>
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNavigate(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
