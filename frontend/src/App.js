import React from 'react';
import './App.css';
import './style.scss';
import { GalleryList } from './components/GalleryList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { JsonGallery } from './components/JsonGallery';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/:gallery">
          <JsonGallery />
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
