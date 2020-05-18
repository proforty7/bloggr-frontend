import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import { useSelector, useDispatch } from "react-redux";
import { privateApi } from "./api";
import { setUser } from "./actions/authActions";
import DashboardScreen from "./screens/DashboardScreen";

const PublicRoute = ({ user, ...props }) => {
  if (user) {
    return <Redirect to={user.profile ? "/dashboard" : "/create-profile"} />;
  }
  return <Route {...props} />;
};

const PrivateRoute = ({ user, ...props }) => {
  if (!user) {
    return <Redirect to="/signin" />;
  }

  return <Route {...props} />;
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("bloggrToken");
      if (token) {
        const res = await privateApi.get("/auth");
        dispatch(setUser({ ...res.data.user, token: res.data.token }));
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          path="/create-profile"
          component={CreateProfileScreen}
          user={user}
        />
        <PrivateRoute
          path="/dashboard"
          component={DashboardScreen}
          user={user}
        />
        <PublicRoute path="/signin" component={SigninScreen} user={user} />
        <PublicRoute path="/signup" component={SignupScreen} user={user} />
        <PublicRoute path="/" exact component={HomeScreen} user={user} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
