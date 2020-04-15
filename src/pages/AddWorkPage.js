import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

import { Row, Container, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';

class AddWorkPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companies: [],
            projects: [],
            beginTime: '',
            endTime: '',
        }
    }

    handleCompanyNameChange = event => {
        this.setState({
            companyName: event.target.value
        })
    }

    handleSubmit = (e) => {
        console.log(auth)
        e.preventDefault();
        fetch('http://localhost:8090/company/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                companyName: this.state.companyName,
                userId: window.sessionStorage.getItem("userId")
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
                        <Row><Col><h3>Add work:</h3></Col></Row>
                        <Row>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Dropdown Button
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Dropdown Button
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row><Col><Button block>Clock in</Button></Col></Row>

                        <Row><Col><h3>Add work manually:</h3></Col></Row>
                        <form className="form">
                            <div className="div">
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Begin time:</label>
                                            <input required type="text" className="form-control" placeholder="Enter the name of your company" onChange={this.handleCompanyNameChange} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label>End time:</label>
                                            <input required type="text" className="form-control" placeholder="Enter the name of your company" onChange={this.handleCompanyNameChange} />
                                        </div>
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