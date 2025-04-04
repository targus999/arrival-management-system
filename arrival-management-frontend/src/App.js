import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import NavBar from "./components/NavBar/NavBar";
import DrawerComponent from "./components/DrawerComponent/DrawerComponent";
import "./styles.css";
import Arrivals from "./components/Arrivals/Arrivals";
import AddArrivals from "./components/AddArrivals/AddArrivals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openAddArrival, setOpenAddArrival] = React.useState(false);
  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  // Function to open the Add Arrival modal
  const openAddArrivalModal = () => {
    setOpenAddArrival(true);
    toggleDrawer();
  };

  

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar open={openDrawer} handleDrawerOpen={toggleDrawer} />
        <DrawerComponent open={openDrawer} handleDrawerClose={toggleDrawer} openModal={openAddArrivalModal}/>
        {openAddArrival &&<AddArrivals handleClose={() => setOpenAddArrival(false)} />}
        <div className="main-content">
          <Container>
            <Routes>
              <Route path="/" element={<Arrivals name={"All Arrivals"}/>} />
              <Route path="/upcoming" element={<Arrivals name={"Upcoming Arrivals"}/>} />
              <Route path="/finished" element={<Arrivals name={"Finished Arrivals"}/>} />
            </Routes>
          </Container>
        </div>
      </Box>
    </Router>
  );
};

export default App;
