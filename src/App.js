import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../src/components/Navigation'
import Login from '../src/pages/LoginPage';
import Register from '../src/pages/RegisterPage';
import {LandingPage} from './pages/landingPage'
import {AppLayout} from './pages/app.layout'
import {ProtectedRoute} from './service/protected.route'

import AddCompany from './pages/AddCompanyPage'
import JoinCompany from './pages/JoinCompanyPage'
import AllCompanies from './pages/CompanyOverviewPage'
import DetailCompany from './pages/CompanyDetailPage'
import EditCompany from './pages/EditCompanyPage'
import DetailProject from './pages/ProjectDetailPage'
import AddProject from './pages/AddProjectPage'
import AddWork from './pages/AddWorkPage'
import AddTask from './pages/AddTaskPage'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <Switch>
        <Route exact path="/" component={LandingPage}/>
        <ProtectedRoute exact path="/app" component={AppLayout}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/company/create" component={AddCompany}/>
        <ProtectedRoute path="/company/join" component={JoinCompany}/>
        <ProtectedRoute path="/company/all" component={AllCompanies}/>
        <ProtectedRoute name="projectDetail" path="/company/:companyId/project/:projectId" component={DetailProject}/>
        <ProtectedRoute name="companyEdit" path="/company/:companyId/edit" component={EditCompany}/>
        <ProtectedRoute name="companyDetail" path="/company/:companyId" component={DetailCompany}/>
        <ProtectedRoute path="/project/create" component={AddProject}/>
        <ProtectedRoute path="/work/add" component={AddWork}/>
        <ProtectedRoute path="/task/add" component={AddTask}/>
        
        <Route path="*" component={() => "404 NOT FOUND"}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
