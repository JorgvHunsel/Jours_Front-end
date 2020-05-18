import React, { Component } from 'react'
import { EditCompany, GetCompany, UpdateCompanyCode } from '../../service/api/company'

import { Container, InputGroup, FormControl, Button, ListGroup, Row, Col } from 'react-bootstrap'
import { Check, ArrowClockwise } from 'react-bootstrap-icons'

class EditCompanyPage extends Component {
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
        GetCompany(this.state.companyId).then((data) => {
            this.setState({ companyName: data.name, employees: data.usersInCompany, companyCode: data.code })
        })
    }

    updateCode() {
        UpdateCompanyCode(this.state.companyId).then((data) => {
            this.setState({ companyCode: data })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        EditCompany(this.state.companyId, this.state.companyName, this.state.employees).then(() => {
            this.props.history.push('/company/all')
        })
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
                    <FormControl defaultValue={this.state.companyName} aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handleCompanyNameChange} />
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
                    <FormControl defaultValue={this.state.companyCode} aria-label="Large" aria-describedby="inputGroup-sizing-sm" disabled />
                    <InputGroup.Append>
                        <Button onClick={() => this.updateCode()} variant="success"><ArrowClockwise /></Button>
                    </InputGroup.Append>
                </InputGroup>
                <br />
                <Button className="btn btn-primary btn-block" onClick={this.handleSubmit} size="lg"><Check /></Button>
            </Container>
        );
    }
}

export default EditCompanyPage