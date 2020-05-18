import React, { Component } from 'react'
import { CreateCompany } from '../../service/api/company'
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Check } from 'react-bootstrap-icons'

class AddCompanyPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companyName: ''
        }
    }

    handleCompanyNameChange = event => {
        this.setState({
            companyName: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        CreateCompany(this.state.companyName).then((data) => {
            this.props.history.push('/company/all')
        })
    }

    render() {
        return (
            <Container>
                <h1>Create company</h1>
                <InputGroup size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">Company name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handleCompanyNameChange} />
                </InputGroup>
                <br />
                <Button className="btn btn-primary btn-block" onClick={this.handleSubmit} size="lg"><Check /></Button>
            </Container>
        );
    }
}

export default AddCompanyPage