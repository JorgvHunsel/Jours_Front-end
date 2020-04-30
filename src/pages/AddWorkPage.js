import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

import DatePicker from 'react-datepicker'


import { Row, Container, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { createPortal } from 'react-dom';

class AddWorkPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companies: [],
            selectedCompany: '',
            companyPlaceholder: 'Choose your company',
            projects: [],
            selectedProject: '',
            projectPlaceHolder: 'Choose your project',
            beginDate: new Date(),
            endDate: new Date(),
        }
    }

    componentDidMount() {
        fetch('http://localhost:8090/company/all/?userId=' + window.sessionStorage.getItem("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                this.setState({ companies: data, selectedCompany: data[0] })
                console.log(this.state.selectedCompany)
                this.getProjects(data[0])
            })
    }

    getProjects() {
        fetch('http://localhost:8090/project/all?companyId=' + this.state.selectedCompany.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                this.setState({ projects: data, selectedProject: data[0] })
            })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8090/work/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                projectId: this.state.selectedProject.id,
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
        const { companies, projects } = this.state;

        const handleCompanyChange = (company) => {
            this.setState({ selectedCompany: company, companyPlaceholder: company.name }, () => {
                this.getProjects()
                console.log(this.state.selectedCompany)
            })
        }

        const handleProjectChange = (project) => {
            this.setState({selectedProject: project, projectPlaceHolder: project.name}, () => { console.log(this.state.selectedProject) })
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
                                    <Dropdown.Toggle variant="outline-info" id="dropdown-basic" block>{this.state.companyPlaceholder}</Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        {companies.map((item) => (
                                            <Dropdown.Item onClick={() => handleCompanyChange(item)}>{item.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-info" id="dropdown-basic" block>{this.state.projectPlaceHolder}</Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        {projects[0] != null &&
                                            projects.map((item) => (
                                                <Dropdown.Item onClick={() => handleProjectChange(item)}>{item.name}</Dropdown.Item>
                                            ))
                                        }
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