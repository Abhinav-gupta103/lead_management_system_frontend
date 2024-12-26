import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import RestaurantLeadsPage from "./pages/RestaurantLeadsPage";
import PointOfContactPage from "./pages/PointOfContactPage";
import RestaurantInteractionsPage from "./pages/RestaurantInteractionsPage";
import PerformancePage from "./pages/PerformancePage";
import SignInPage from "./pages/SignInPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/signin" replace />;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/"
          element={<PrivateRoute element={<RestaurantLeadsPage />} />}
        />
        <Route
          path="/points-of-contact/:restaurantId"
          element={<PrivateRoute element={<PointOfContactPage />} />}
        />
        <Route
          path="/interactions/:restaurantId"
          element={<PrivateRoute element={<RestaurantInteractionsPage />} />}
        />
        <Route
          path="/performance-metrics"
          element={<PrivateRoute element={<PerformancePage />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
