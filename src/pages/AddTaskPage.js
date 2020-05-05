import React, { Component } from 'react'
import auth from '../service/auth'

import { Container, Button, InputGroup, FormControl, Alert, Dropdown } from 'react-bootstrap'
import { Check, Dot } from 'react-bootstrap-icons'

class AddTaskPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            employees: [],
            projectId: this.props.location.state.projectId,
            companyId: this.props.location.state.companyId
        }
    }

    componentDidMount(){
        console.log(this.state.companyId)
        console.log(this.state.projectId)
        this.getEmployees()
    }

    getEmployees() {
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
                console.log(data)
                this.setState({ employees: data.usersInCompany })
            })
    }

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        })
    }

    handleDescriptionChange = event => {
        this.setState({
            description: event.target.value
        })
    }

    handleAddEmployee(){

    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8090/task/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                projectId: this.state.projectId
            })
        }).then(response => response.json())
            .then(data => {
                window.alert("succes")
                if (data.message === 'Unauthorized') {
                    this.setState({ showError: true })
                    console.log('Gebruikersnaam of Wachtwoord komt niet overeen');
                }
            });
    }

    render() {
        const { employees } = this.state;

        return (
            <Container>
                <div className="div">
                    <h3>Add task</h3>
                    <InputGroup size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg">Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handleNameChange} />
                    </InputGroup>
                    <br />
                    <InputGroup size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg">Description</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="password" aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handleDescriptionChange} />
                    </InputGroup>
                    <br />
                    <Dropdown >
                        <Dropdown.Toggle variant="outline-info" id="dropdown-basic" block>Chose your users</Dropdown.Toggle>
                        <Dropdown.Menu >
                            {employees.map((employee) => (
             
                                <Dropdown.Item key={employee.id} onClick={() => this.handleAddEmployee(employee)}><Dot></Dot>{employee.username}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <br/>
                    <Button className="btn btn-primary btn-block" onClick={this.handleSubmit} size="lg"><Check /></Button>
                    <br />
                    {this.state.showError &&
                        <Alert variant="danger">Login failed</Alert>
                    }
                </div>
            </Container>
        );
    }
}

export default AddTaskPage