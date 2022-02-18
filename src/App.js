import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link, NavLink } from "react-router-dom";
import "./styles.css";
import ToDo from "./components/ToDo";
import Table from "./components/Table";


export default function App() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = useCallback(() => setShowForm(!showForm), [showForm]);

  useEffect(() => {
    console.log("showForm => ", showForm);
  }, [showForm]);

  return (
    <div>
      <Router>
        <nav>
          <ul className="list">
            <li>
              <NavLink to="/todo">ToDo</NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Redirect to="/todo" />
          </Route>
          <Route exact path="/todo" component={ToDo} />
          <Route exact path="/users" component={Table} />
        </Switch>
      </Router>
    </div>
  );
}
