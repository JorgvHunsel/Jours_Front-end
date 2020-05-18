import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Dot, Check } from 'react-bootstrap-icons'
import { Row, Container, Col, Button, Dropdown, Tab, Tabs } from 'react-bootstrap';
import { GetUnfinishedWork } from '../../service/api/work'
import { GetTasksFromuser, UpdateWork, AddWork } from '../../service/api/user'

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
        GetUnfinishedWork().then((data) => {
            this.setState({ unfinishedWork: data })
        })
    }

    getTasksFromUser() {
        GetTasksFromuser().then((data) => {
            this.setState({ tasks: data })
        })
    }

    handleClockIn() {
        this.setState({ endDate: null }, () => {
            this.addWork()
        })
    }

    handleClockOut() {
        UpdateWork(this.state.unfinishedWork.id).then((data) => {
            window.alert("Succes")
            this.setState({ unfinishedWork: null })
        })
    }

    addWork() {
        if (this.state.selectedTask === '') {
            window.alert("Select a task first")
            return
        }

        AddWork(this.state.selectedTask.id, this.state.beginDate, this.state.endDate).then(()=>{
            this.getUnfinishedWork()
        })
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
                        <Row><Col><h1>Register your work</h1></Col></Row>
                        <Row><Col><h3>1. Select your task</h3></Col></Row>
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

                        <Row><Col><h3>2. Choose your method</h3></Col></Row>
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                            <Tab eventKey="clockin" title="Clock in">
                                <Row><Col><h4>Clock in work:</h4></Col></Row>
                                {this.state.unfinishedWork == null ?
                                    <Row><Col><Button variant="success" onClick={() => this.handleClockIn()} block>Start timer</Button></Col></Row> :
                                    <Row><Col><Button variant="danger" onClick={() => this.handleClockOut()} block>Stop timer</Button></Col></Row>
                                }
                            </Tab>


                            <Tab eventKey="mannually" title="Manually">
                                <Row><Col><h4>Add work manually:</h4></Col></Row>
                                <form className="form">
                                    <div className="div">
                                        <Row>
                                            <Col>
                                                <div className="form-group">
                                                    <h5>Begin time</h5>
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
                                                    <h5>End time</h5>
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
                                        <Button block variant="success" onClick={() => this.addWork()}><Check /></Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default AddWorkPage