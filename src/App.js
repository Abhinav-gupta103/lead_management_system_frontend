import { useContext } from "react";
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
import SignUpPage from "./pages/SignUpPage";
import { AuthContext, AuthProvider } from "./Auth/AuthContext";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
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
    </AuthProvider>
  );
};
export default App;
