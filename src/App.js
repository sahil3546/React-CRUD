import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Details from "./components/details";
import Dashboard from "./components/dashboard";
import Register from "./components/registerPhone";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <div className="App">
       <ToastContainer />
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/dashboard"} className="navbar-brand">
            Mobile Phones
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/dashboard"]} component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/register/:id" component={Register} />
            <Route path="/details/:id" component={Details} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
