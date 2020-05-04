import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

import DatePicker from 'react-datepicker'

import { Dot } from 'react-bootstrap-icons'

import { Row, Container, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';

class AddWorkPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            unfinishedWork: null,
            selectedTask: '',
            tasks: [],
            taskPlaceholder: 'select your task',
            beginDate: new Date(),
            endDate: new Date(),
        }
    }

    componentDidMount() {
        this.getTasksFromUser()
        this.getUnfinishedWork()
    }

    getUnfinishedWork() {
        fetch('http://localhost:8090/work/clock', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                this.setState({ unfinishedWork: data })
            })
    }

    getTasksFromUser() {
        fetch('http://localhost:8090/user/tasks', {
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
                this.setState({ tasks: data })
            })
    }



    handleClockIn() {
        this.setState({ endDate: null }, () => {
            this.addWork()
        })
    }

    handleClockOut() {
        fetch('http://localhost:8090/work/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                workId: this.state.unfinishedWork.id
            })
        }).then(response => response.json())
            .then(data => {
                window.alert("Succes")
                this.setState({ unfinishedWork: null })
            });
    }


    addWork() {
        if (this.state.selectedTask == '') {
            window.alert("Select a task first")
            return
        }

        fetch('http://localhost:8090/work/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                taskId: this.state.selectedTask.id,
                beginDate: this.state.beginDate,
                endDate: this.state.endDate
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                window.alert("Work added!")
                this.getUnfinishedWork()
            });
    }

    render() {
        const { tasks } = this.state;

        const handleTaskChange = (task) => {
            this.setState({ selectedTask: task, taskPlaceholder: task.name })
        }

        const handleBeginDate = (time) => {
            this.setState({
                beginDate: time
            })
        }

        const handleEndDate = (time) => {
            this.setState({
                endDate: time
            })
        }

        return (
            <React.Fragment>
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="outline-info" id="dropdown-basic" block>{this.state.taskPlaceholder}</Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        {tasks.map((item) => (
                                            <Dropdown.Item onClick={() => handleTaskChange(item)}><Dot></Dot>{item.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row><Col><h3>Add work:</h3></Col></Row>
                        {this.state.unfinishedWork == null ?
                            <Row><Col><Button variant="success" onClick={() => this.handleClockIn()} block>Clock in</Button></Col></Row> :
                            <Row><Col><Button variant="danger" onClick={() => this.handleClockOut()} block>Clock out</Button></Col></Row>
                        }
                        <Row><Col><h3>Add work manually:</h3></Col></Row>
                        <form className="form">
                            <div className="div">
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Begin time:</label>
                                            <DatePicker
                                                selected={this.state.beginDate}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                timeFormat="HH:mm"
                                                dateFormat="HH:mm"
                                                onChange={date => handleBeginDate(date)} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label>End time:</label>
                                            <DatePicker
                                                selected={this.state.endDate}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                timeFormat="HH:mm"
                                                dateFormat="HH:mm"
                                                onChange={date => handleEndDate(date)} />                                        </div>
                                    </Col>
                                </Row>
                                <Button className="btn btn-primary btn-block" onClick={() => this.addWork()}>Confirm</Button>
                            </div>
                        </form>

                    </Container>
                </div>
            </React.Fragment>

        );
    }
}

export default AddWorkPage