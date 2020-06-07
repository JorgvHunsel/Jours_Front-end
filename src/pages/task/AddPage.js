import React, { Component } from 'react'
import { Container, Button, InputGroup, FormControl, Alert, Dropdown, Row, Col, ListGroup } from 'react-bootstrap'
import { Check, Dot } from 'react-bootstrap-icons'
import EmployeeTask from '../../components/user/EmployeeTaskItem'
import {GetCompany} from '../../service/api/company'
import {CreateTask} from '../../service/api/task'


class AddTaskPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            allEmployees: [],
            selectedEmployees: [],
            projectId: this.props.location.state.projectId,
            companyId: this.props.location.state.companyId
        }
    }

    componentDidMount() {
        this.getEmployees()
    }

    getEmployees() {
        GetCompany(this.state.companyId).then((data)=>{
            this.setState({ allEmployees: data.usersInCompany })
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

    handleAddEmployee(employee) {
        this.setState({ 
            selectedEmployees: this.state.selectedEmployees.concat(employee), 
            allEmployees: this.state.allEmployees.filter(function(emp) {
                return emp !== employee
            })})
    }


    
    removeEmployee(employee) {
        this.setState({ 
            allEmployees: this.state.allEmployees.concat(employee), 
            selectedEmployees: this.state.selectedEmployees.filter(function(emp) {
                return emp !== employee
            })})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        CreateTask(this.state.name, this.state.description, this.state.projectId, this.state.selectedEmployees).then(()=>{
            this.props.history.push('/company/' + this.state.companyId + '/project/' + this.state.projectId)
        })
    }

    render() {
        const { allEmployees, selectedEmployees } = this.state;

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
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handleDescriptionChange} />
                    </InputGroup>
                    <br />
                    <Dropdown >
                        <Dropdown.Toggle variant="outline-info" id="dropdown-basic" block>Chose your users</Dropdown.Toggle>
                        <Dropdown.Menu >
                            {allEmployees.map((employee) => (
                                <Dropdown.Item key={employee.id} onClick={() => this.handleAddEmployee(employee)}><Dot></Dot>{employee.username}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <Row><Col><h2>People</h2></Col></Row>
                    <ListGroup>
                        {selectedEmployees.map((employee) => (
                            <EmployeeTask key={employee.id} employee={employee} update={()=> this.removeEmployee(employee)}></EmployeeTask>
                        ))}
                    </ListGroup>
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
export function handleAddEmployee(employee){}