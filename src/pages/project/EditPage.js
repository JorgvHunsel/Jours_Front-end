import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styling/AddProjectPage.css'
import { GetProject, DisableProject, EditProject } from '../../service/api/project'


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
        GetProject(this.state.projectId).then((data) => {
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
    }

    disableProject() {
        DisableProject(this.state.projectId).then(() => {
            this.props.history.push('/company/' + this.state.companyId)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        EditProject(this.state.projectId, this.state.projectName, this.state.endDate, this.state.companyId).then(()=>{
            this.props.history.push('/company/' + this.state.companyId)
        })
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