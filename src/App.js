import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationItem from './components/NavigationItem'
import Login from '../src/pages/LoginPage';
import Register from '../src/pages/RegisterPage';
import {LandingPage} from './pages/landingPage'
import {AppLayout} from './pages/app.layout'
import {ProtectedRoute} from './service/protected.route'

import AddCompany from './pages/company/AddPage'
import JoinCompany from './pages/company/JoinPage'
import AllCompanies from './pages/company/OverviewPage'
import DetailCompany from './pages/company/DetailPage'
import EmployeeDetail from './pages/user/DetailPage'
import EditCompany from './pages/company/EditPage'
import DetailProject from './pages/project/DetailPage'
import AddProject from './pages/project/AddPage'
import EditProject from './pages/project/EditPage'
import AddWork from './pages/work/AddPage'
import AddTask from './pages/task/AddPage'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationItem/>
        <Switch>
        <Route exact path="/" component={LandingPage}/>
        <ProtectedRoute exact path="/app" component={AppLayout}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/company/create" component={AddCompany}/>
        <ProtectedRoute path="/company/join" component={JoinCompany}/>
        <ProtectedRoute path="/company/all" component={AllCompanies}/>
        <ProtectedRoute name="projectEdit" path="/company/:companyId/project/:projectId/edit" component={EditProject}/>
        <ProtectedRoute name="projectDetail" path="/company/:companyId/project/:projectId" component={DetailProject}/>
        <ProtectedRoute name="companyEdit" path="/company/:companyId/edit" component={EditCompany}/>
        <ProtectedRoute name="companyDetail" path="/company/:companyId" component={DetailCompany}/>
        <ProtectedRoute name="employeeDetail" path="/employee/:userId" component={EmployeeDetail}/>
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
