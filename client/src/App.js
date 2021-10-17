import './App.css';
import React from 'react';
import Movie from "./Movie.js";
import Home from "./Home.js";
import { Route, Switch } from "react-router-dom";

export default function App() {
  return (
      <Switch>
          <Route path="/movie/:title"><Movie/></Route>
          <Route path="/"><Home /></Route>
      </Switch>
  );
}
