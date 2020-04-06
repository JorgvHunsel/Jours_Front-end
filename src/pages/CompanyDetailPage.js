import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import {withRouter} from 'react-router-dom';

import ProjectItem from '../components/ProjectOverviewItem';
import EmployeeItem from '../components/EmployeeOverviewItem';
import { Row, Container, Col, Button, CardColumns } from 'react-bootstrap';


class CompanyDetailPage extends Component {

    constructor(props) {
        super(props)


        this.state = {
            projects: [],
            employees: [],
            userId: window.sessionStorage.getItem("userId"),
            companyId: props.match.params.companyId
        }

         this.getProjects()
         this.getEmployees()
         
    }

    getProjects() {
        fetch('http://localhost:8090/project/all?companyId=' + this.state.companyId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                this.setState({ projects: data })
            })
    }

    getEmployees() {
        fetch('http://localhost:8090/company/users?companyId=' + this.state.companyId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                this.setState({ employees: data })
            })
    }


    render() {
        const { projects, employees } = this.state;

        return (
            <React.Fragment>
                <div>
                    <Container>
                        <Row ><Col><h1>Company detail</h1></Col></Row>                                 
                        <Row ><Col><h2>Projects</h2></Col></Row>                                 
                    <CardColumns>
                    {projects.map((item) => (
                        <ProjectItem key={item.id} project={item} />
                    ))}
                    </CardColumns>
                    </Container>
                </div>

                <div>
                    <Row>
                        <Col><h2>Employees</h2></Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((item) => (
                                    <EmployeeItem key={item.id} employee={item}/>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </div>

            </React.Fragment >
        )
    }
}

export default CompanyDetailPage