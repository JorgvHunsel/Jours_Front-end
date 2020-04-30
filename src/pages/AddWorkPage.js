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
        this.getCompaniesFromUser()
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

    getCompaniesFromUser() {
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
                this.setState({ companies: data })
                console.log(this.state.selectedCompany)
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
                var placeHolder = 'Choose your project'
                if (data[0] == null) {
                    placeHolder = 'No projects'
                }

                this.setState({ projects: data, projectPlaceHolder: placeHolder })
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
        if (this.state.selectedProject == '') {
            window.alert("Select a project first")
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
                projectId: this.state.selectedProject.id,
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
        const { companies, projects } = this.state;

        const handleCompanyChange = (company) => {
            this.setState({ selectedCompany: company, selectedProject: '', companyPlaceholder: company.name }, () => {
                this.getProjects()
                console.log(this.state.selectedCompany)
            })
        }

        const handleProjectChange = (project) => {
            this.setState({ selectedProject: project, projectPlaceHolder: project.name }, () => { console.log(this.state.selectedProject) })
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
                                            <Dropdown.Item onClick={() => handleCompanyChange(item)}><Dot></Dot> {item.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-info" id="dropdown-basic" block>{this.state.projectPlaceHolder}</Dropdown.Toggle>
                                    {projects[0] != null &&
                                        <Dropdown.Menu >
                                            {projects.map((item) => (
                                                <Dropdown.Item onClick={() => handleProjectChange(item)}><Dot></Dot> {item.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    }
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
                                                onChange={date => handleBeginDate(date)}/>
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