import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

import { Container, InputGroup, FormControl, Button, ListGroup, Row, Col } from 'react-bootstrap'
import { Check, ArrowClockwise } from 'react-bootstrap-icons'

class AddCompanyPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companyId: props.match.params.companyId,
            companyName: '',
            companyCode: '',
            employees: []
        }

        this.getCompany()
    }

    getCompany() {
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
                this.setState({ companyName: data.name, employees: data.usersInCompany, companyCode: data.code })

            console.log(data)
            })
    }

    updateCode(){
        fetch('http://localhost:8090/company/code?companyId=' + this.state.companyId, {
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
                this.setState({ companyCode: data })
            })
    }

    handleSubmit = (e) => {
        console.log(auth)
        e.preventDefault();
        fetch('http://localhost:8090/company/edit', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                companyId: this.state.companyId,
                companyName: this.state.companyName,
                users: JSON.stringify(this.state.employees)
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.props.history.push('/company/all')
            });
    }

    handleCompanyNameChange = event => {
        this.setState({
            companyName: event.target.value
        })
    }


    render() {
        const { employees } = this.state;

        return (
            <Container>
                <h1>Edit company</h1>
                <InputGroup size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl defaultValue={this.state.companyName} aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handleNameChange} />
                </InputGroup>
                <br />
                <h2>Employees</h2>
                <ListGroup>
                    {employees.map((employee) => (
                        <ListGroup.Item key={employee.id}>
                            <Row>
                                <Col>{employee.username}</Col>
                                <Col>{employee.role}</Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <br />
                <InputGroup size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">Code</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl defaultValue={this.state.companyCode}  aria-label="Large" aria-describedby="inputGroup-sizing-sm" disabled/>
                    <InputGroup.Append>
                        <Button onClick={() => this.updateCode()} variant="success"><ArrowClockwise/></Button>
                    </InputGroup.Append>
                </InputGroup>
                <br />


                <Button className="btn btn-primary btn-block" onClick={this.handleSubmit} size="lg"><Check /></Button>

            </Container>
        );
    }
}

export default AddCompanyPage