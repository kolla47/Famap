import { Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/DashboardComponents/Dashboard";

// Define your route components here

// Define your route guard component
function PrivateRoute({ Component, ...rest }) {
  // Check if the user is authenticated
  const isAuthenticated = true; // Replace this with your authentication logic

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

// Define your routes
const AppRoutes = () => {
  return (
    <>
      <PrivateRoute path="/" component={Dashboard} />
    </>
  );
};

export default AppRoutes;
