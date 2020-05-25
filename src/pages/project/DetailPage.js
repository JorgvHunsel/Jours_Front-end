import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import TaskItem from '../../components/task/TaskItem';
import { Row, Container, Col, Button, Alert } from 'react-bootstrap';
import ProjectWorkItem from '../../components/project/WorkItem';
import { GetCompany } from '../../service/api/company'
import { GetProject } from '../../service/api/project'

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
            showDetail: false,
            overBudget: ''
        }

        this.getUserRole()
        this.getProject()
    }

    getUserRole() {
        GetCompany(this.state.companyId).then((data) => {
            this.setState({ userRole: data.currentUserRole })
        })
    }

    getProject() {
        GetProject(this.state.projectId).then((data) => {
            this.setState({ tasks: data.tasks, workList: data.workList, overBudget: data.overBudget })
        })
    }


    render() {
        const { userRole, tasks, workList, projectId, companyId } = this.state;

        const filterTasksByStatus = (filterValue) => {
            var newtask = tasks.filter((item) => {
                return item.status === filterValue
            })
            return newtask
        }

        return (
            <React.Fragment>
                <Container>
                    <div>
                        <Row ><Col><h1>Project detail</h1></Col></Row>
                        {this.state.overBudget &&
                            <Row><Col><Alert variant="danger">This project is over budget</Alert></Col></Row>}
                        <Row>
                        <Col>
                            <Table>
                                <thead><tr><th>To do</th></tr></thead>
                                <tbody>
                                    {filterTasksByStatus("to do").map((item) => (
                                        <TaskItem key={item.id} userRole={userRole} update={() => this.getProject()} task={item} />
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table>
                                <thead><tr><th>Doing</th></tr></thead>
                                <tbody>
                                    {filterTasksByStatus("doing").map((item) => (
                                        <TaskItem key={item.id} userRole={userRole} update={() => this.getProject()} task={item} />
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table>
                                <thead><tr><th>Done</th></tr></thead>
                                <tbody>
                                    {filterTasksByStatus("done").map((item) => (
                                        <TaskItem key={item.id} userRole={userRole} update={() => this.getProject()} task={item} />
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    {userRole === "admin" &&
                        <Link to={{ pathname: '/task/add', state: { companyId, projectId } }}><Button variant="outline-primary" block>New task</Button></Link>
                    }
                    </div>
                {userRole === "admin" &&
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