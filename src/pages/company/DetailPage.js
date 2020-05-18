import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { GetCompany } from '../../service/api/company'
import {GetProjects} from '../../service/api/project'

import ProjectOverviewItem from '../../components/project/OverviewItem';
import UserOverviewItem from '../../components/user/OverviewItem';
import { Row, Container, Col, Button, CardColumns } from 'react-bootstrap';


class CompanyDetailPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projects: [],
            employees: [],
            userId: window.sessionStorage.getItem("userId"),
            companyId: props.match.params.companyId,
            userRole: ''
        }

        this.getEmployees()
        this.getProjects()
    }

    getProjects() {
        GetProjects(this.state.companyId).then((data)=>{
            this.setState({ projects: data })
        })
    }

    getEmployees() {
        GetCompany(this.state.companyId).then((data) => {
            this.setState({ employees: data.usersInCompany })
            this.setState({ userRole: data.currentUserRole })
        })
    }


    render() {
        const { projects, employees, companyId, userRole } = this.state;

        return (
            <React.Fragment>
                <Container>
                    <div>
                        <Row ><Col><h1>Company detail</h1></Col></Row>
                        <Row><Col><h2>Projects</h2></Col></Row>
                        <CardColumns>
                            {projects.map((item) => (
                                <ProjectOverviewItem companyId={this.state.companyId} key={item.id} project={item} role={userRole} />
                            ))}
                        </CardColumns>
                        {userRole === "admin" &&
                            <Link to={{ pathname: '/project/create', state: { companyId } }}><Button variant="outline-primary" size="sm" block>New project</Button></Link>
                        }
                    </div>

                    <div>
                        <Row>
                            <Col><h2>Employees</h2></Col>
                            <Table variant="dark">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Function</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((item) => (
                                        <UserOverviewItem key={item.id} employee={item} />
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </div>
                </Container>
            </React.Fragment >
        )
    }
}

export default CompanyDetailPage