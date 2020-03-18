import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from '../src/pages/LoginPage';
import {LandingPage} from './pages/landingPage'
import {AppLayout} from './pages/app.layout'
import {ProtectedRoute} from './service/protected.route'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route exact path="/" component={LandingPage}/>
        <ProtectedRoute exact path="/app" component={AppLayout}/>
        <Route path="/Login" component={Login} />
        <Route path="*" component={() => "404 NOT FOUND"}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
