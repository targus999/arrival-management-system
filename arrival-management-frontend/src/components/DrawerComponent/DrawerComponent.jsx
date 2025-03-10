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

  const handleNavigate = (path) => {
    console.log(path);
    if(path === "All") {navigate("/");}
    else navigate(`/${path.toLowerCase()}`)
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
      <Divider />
      <List>
      <ListItem>
        <Button variant="contained" color="success" size="small" startIcon={<AddIcon />} onClick={() => openModal()}>Add Arrival</Button>
      </ListItem>
        {["All", "Upcoming", "Finished"].map((text, index) => (<>
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNavigate(text)}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          <Divider />
          </>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
