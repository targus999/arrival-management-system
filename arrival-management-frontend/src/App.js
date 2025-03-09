import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import NavBar from "./components/NavBar/NavBar";
import DrawerComponent from "./components/DrawerComponent/DrawerComponent";
import "./styles.css";
import AllArrivals from "./components/AllArrivals/AllArrivals";
import UpcomingArrivals from "./components/UpcomingArrivals/UpcomingArrivals";
import FinishedArrivals from "./components/FinishedArrivals/FinishedArrivals";

const App = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar open={open} handleDrawerOpen={toggleDrawer} />
        <DrawerComponent open={open} handleDrawerClose={toggleDrawer} />

        <div className="main-content">
          <Container>
            {/* Routes define which component to render based on the path */}
            <Routes>
              <Route path="/" element={<AllArrivals />} />
              <Route path="/upcoming" element={<UpcomingArrivals />} />
              <Route path="/finished" element={<FinishedArrivals />} />
            </Routes>
          </Container>
        </div>
      </Box>
    </Router>
  );
};

export default App;
