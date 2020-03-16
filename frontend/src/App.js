import React from 'react';
import './App.css';
import './style.scss';
import { GalleryList } from './components/GalleryList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/test">
          test
        </Route>
        <Route path="/">
          <GalleryList />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
