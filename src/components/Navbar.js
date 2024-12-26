import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Lead Management System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Restaurant Leads
        </Button>
        {/* <Button color="inherit" component={Link} to="/call-planning">
          Call Planning
        </Button> */}
        <Button color="inherit" component={Link} to="/performance-metrics">
          Performance Metrics
        </Button>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
