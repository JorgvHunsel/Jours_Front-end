import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { withRouter, Link } from 'react-router-dom';

import TaskItem from '../components/TaskItem';

import { Row, Container, Col, Button, CardColumns, Modal } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons'
import ProjectWorkItem from '../components/ProjectWorkItem';


class ProjectDetailPage extends Component {

    constructor(props) {
        super(props)

        console.log(props.match.params)
        this.state = {
            companyId: props.match.params.companyId,
            projectId: props.match.params.projectId,
            userRole: '',
            tasks: [],
            workList: [],
            showDetail: false
        }

        this.getUserRole()
        this.getProject()
    }

    getUserRole() {
        fetch('http://localhost:8090/company/users?companyId=' + this.state.companyId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
                'userId': + window.sessionStorage.getItem("userId")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                this.setState({ userRole: data.currentUserRole })
            })
    }

    getProject() {
        fetch('http://localhost:8090/project/?projectId=' + this.state.projectId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                console.log(data)

                this.setState({ tasks: data.tasks, workList: data.workList })
            })
    }


    render() {
        const { userRole, tasks, workList, projectId, companyId } = this.state;

        const filterTasksByStatus = (filterValue) => {

            var newtask = tasks.filter((item) => {
                return item.status == filterValue
            })
            return newtask

        }

        return (
            <React.Fragment>
                <Container>
                    <div>
                        <Row ><Col><h1>Project detail</h1></Col></Row>
                        <Row>
                            <Col>
                                <Table>
                                    <thead><tr><th>To do</th></tr></thead>
                                    <tbody>
                                        {filterTasksByStatus("to do").map((item) => (
                                            <tr key={item.id}><td><TaskItem userRole={userRole} update={() => this.getProject()} key={item.id} task={item} /></td></tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col>
                                <Table>
                                    <thead><tr><th>Doing</th></tr></thead>
                                    <tbody>
                                        {filterTasksByStatus("doing").map((item) => (
                                            <tr key={item.id}><td><TaskItem userRole={userRole} update={() => this.getProject()} key={item.id} task={item} /></td></tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col>
                                <Table>
                                    <thead><tr><th>Done</th></tr></thead>
                                    <tbody>
                                        {filterTasksByStatus("done").map((item) => (
                                            <tr key={item.id}><td><TaskItem userRole={userRole} update={() => this.getProject()} key={item.id} task={item} /></td></tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        {userRole == "admin" &&
                            <Link to={{ pathname: '/task/add', state: { companyId, projectId } }}><Button variant="outline-primary" block>New task</Button></Link>
                        }
                    </div>
                    {userRole == "admin" &&
                        <div>
                            <Row>
                                <Col><h2>Work log</h2></Col>
                                <Table variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Name</th>
                                            <th>Begin date</th>
                                            <th>End date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workList.map((item) => (
                                            <ProjectWorkItem key={item.id} work={item} />
                                        ))}
                                    </tbody>
                                </Table>
                            </Row>
                        </div>
                    }

                </Container>

            </React.Fragment >
        )
    }
}

export default ProjectDetailPage