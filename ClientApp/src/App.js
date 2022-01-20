import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './assets/scss/main.scss'
import About from "./components/About";
import Index from "./components/Index";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Artisian from "./components/Artisian";
import Hire from "./components/Hire";
import PrivateRoute from "./layouts/PrivateRoutes";
import RunningJobs from "./components/Runningjobs";
import StartJob from "./components/StartJob";


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <PrivateRoute exact path="/artisian" component={Artisian} />
        <PrivateRoute exact path="/hire" component={Hire} />
        <PrivateRoute exact path="/running-jobs" component={RunningJobs} />
        <PrivateRoute exact path="/start-job" component={StartJob} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
