import React from 'react';
import './App.css';
import Login from '../src/pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        <Route path="/Login" component={Login} />
        </div>
      </Router>
    </div>
  );
}

export default App;
