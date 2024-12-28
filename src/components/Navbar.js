import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

const Navbar = () => {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Lead Management System
        </Typography>
        {isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/">
              Restaurant Leads
            </Button>

            <Button color="inherit" component={Link} to="/performance-metrics">
              Performance Metrics
            </Button>
            <Button color="inherit" onClick={signOut}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
