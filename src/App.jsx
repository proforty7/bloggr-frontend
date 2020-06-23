import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import { useSelector, useDispatch } from "react-redux";
import { privateApi } from "./api";
import { setUser } from "./actions/authActions";
import DashboardScreen from "./screens/DashboardScreen";
import { toast } from "react-toastify";
import CreatePostScreen from "./screens/CreatePostScreen";
import PostScreen from "./screens/PostScreen";

const PublicRoute = ({ user, ...props }) => {
  if (user) {
    return <Redirect to={user.profile ? `/dashboard` : `/create-profile`} />;
  }
  return <Route {...props} />;
};

const PrivateRoute = ({ user, ...props }) => {
  if (!user) {
    return <Redirect to={`/signin`} />;
  }

  return <Route {...props} />;
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("bloggrToken");
        if (token) {
          const res = await privateApi(token).get("/auth");
          dispatch(setUser({ user: res.data.user, token: res.data.token }));
        }
      } catch (err) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <PrivateRoute
          path="/create-post"
          component={CreatePostScreen}
          user={user}
        />
        <Route path="/posts/:postId" component={PostScreen} />
        <PublicRoute path="/signin" component={SigninScreen} user={user} />
        <PublicRoute path="/signup" component={SignupScreen} user={user} />
        <PublicRoute path="/" component={HomeScreen} user={user} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
