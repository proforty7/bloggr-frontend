import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";

const PublicRoute = (props) => {
  return <Route {...props} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/signin" component={SigninScreen} />
        <PublicRoute path="/signup" component={SignupScreen} />
        <PublicRoute path="/" exact component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
