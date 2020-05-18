import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { withRouter, Link, useHistory } from 'react-router-dom';

import CompanyItem from '../components/CompanyOverviewItem';
import { Row, Container, Col, Button, CardColumns } from 'react-bootstrap';
import companyItem from '../components/CompanyOverviewItem';
import EmployeeDetailTask from '../components/EmployeeDetailTaskItem'
import EmployeeDetailWork from '../components/EmployeeDetailWorkItem'


class DetailEmployeePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userId: props.match.params.userId,
            username: '',
            workList: [],
            workThisMonth: '',
            taskList: [],
        }

        this.getUser()
    }

    getUser() {
        fetch('http://localhost:8090/user/?userId=' + this.state.userId, {
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
                this.setState({username: data.username, taskList: data.tasks, workList: data.workList})
            })
    }

    handleEmptyCompanies() {
        this.props.history.push("/company/join")
    }

    render() {
        const { username, workList, taskList } = this.state;
        return (
            <React.Fragment>
                <Container>
                <div>
                    <Row><Col><h1>Details: {username}</h1></Col></Row>
                    <Row><Col><h3>Tasks</h3></Col></Row>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {taskList.map((task) => (
                        <EmployeeDetailTask key={task.id} task={task}></EmployeeDetailTask>
                    ))}
                    </tbody>
                    </Table>
                    <Row><Col><h3>Work</h3></Col></Row>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Begin date</th>
                                <th>End date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {workList.map((work) => (
                        <EmployeeDetailWork key={work.id} work={work}></EmployeeDetailWork>
                    ))}
                    </tbody>
                    </Table>
                </div>
                </Container>
            </React.Fragment >
        )

    }

}

export default DetailEmployeePage