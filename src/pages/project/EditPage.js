import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styling/AddProjectPage.css'


import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Check, Trash } from 'react-bootstrap-icons'

class EditProjectPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projectName: '',
            endDate: new Date(),
            projectId: props.match.params.projectId,
            companyId: props.match.params.companyId,
        }
        console.log(this.state.projectId)
    }

    componentDidMount() {
        this.getProject()
    }

    getProject() {
        fetch('http://localhost:8090/project/?projectId=' + this.state.projectId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
                'projectId': + this.state.projectId,
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                console.log(data)
                this.setState({ projectName: data.name, endDate: new Date(data.endDate) })

            })
    }


    handleProjectNameChange = event => {
        this.setState({
            projectName: event.target.value
        })
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        })
        console.log(this.state.endDate)
    }

    disableProject() {
        console.log(this.state.projectId)
        fetch('http://localhost:8090/project/disable', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                projectId: this.state.projectId,
            })
        }).then(response => response.json())
            .then(data => {
                this.props.history.push('/company/' + this.state.companyId)
            });
    }

    handleSubmit = (e) => {
        console.log(this.state.companyId)
        console.log(this.state.endDate)
        e.preventDefault();
        fetch('http://localhost:8090/project', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                projectId: this.state.projectId,
                projectName: this.state.projectName,
                endDate: this.state.endDate,
                companyId: this.state.companyId
            })
        }).then(response => response.json())
            .then(data => {
                this.props.history.push('/company/' + this.state.companyId)
            });
    }


    render() {
        return (
            <Container>
                <Row><Col><h1>Edit your project</h1></Col></Row>
                <InputGroup size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">Project name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl defaultValue={this.state.projectName} aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handleProjectNameChange} />
                </InputGroup>
                <br />
                <div className="form-group">
                    <label>endDate:</label><br />
                    <DatePicker minDate={new Date()} strictParsing dateFormat="dd/MM/yyyy" selected={this.state.endDate} onChange={date => this.handleEndDateChange(date)} />
                </div>
                <Button variant="primary" onClick={this.handleSubmit} size="lg" block><Check /></Button>
                <Button variant="danger" onClick={() => this.disableProject()} size="lg" block><Trash /></Button>
            </Container>

        );
    }
}

export default EditProjectPage