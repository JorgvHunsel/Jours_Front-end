import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

import DatePicker from 'react-datepicker'


import { Row, Container, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';

class AddWorkPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companies: [],
            projects: [],
            projectId: '',
            beginDate: new Date(),
            endDate: new Date(),
        }

    }

    handleBeginDate(time) {
        this.setState({
            beginDate: time
        })
    }

    handleEndDate(time) {
        this.setState({
            endDate: time
        })
    }

    handleSubmit = (e) => {
        console.log(this.state.beginDate)
        console.log(auth)
        e.preventDefault();
        fetch('http://localhost:8090/work/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                projectId: 24,
                beginDate: this.state.beginDate,
                endDate: this.state.endDate                
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.props.history.push('/company/all')
            });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-info" id="dropdown-basic" block>Choose your company</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-info" id="dropdown-basic" block>Choose your project</Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row><Col><h3>Add work:</h3></Col></Row>
                        <Row><Col><Button block>Clock in</Button></Col></Row>
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
                                                onChange={date => this.handleBeginDate(date)} />
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
                                                onChange={date => this.handleEndDate(date)} />                                        </div>
                                    </Col>
                                </Row>

                                <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Confirm</button>
                            </div>
                        </form>

                    </Container>
                </div>
            </React.Fragment>

        );
    }
}

export default AddWorkPage