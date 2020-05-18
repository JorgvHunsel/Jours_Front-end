import React, { Component } from 'react'
import {JoinCompany} from '../../service/api/company'

import { Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Check } from 'react-bootstrap-icons'

class JoinCompanyPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companyCode: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        JoinCompany(this.state.companyCode).then((data)=>{
            this.props.history.push("/company/" + data.id)
        })
    }

    handleCodeChange = event => {
        this.setState({
            companyCode: event.target.value
        })
    }


    render() {
        return (
            <Container>
                <h1>Join company</h1>
                <InputGroup size="lg">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">Company Code</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="000000" aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handleCodeChange} />
                </InputGroup>
                <br />
                <Button className="btn btn-primary btn-block" onClick={this.handleSubmit} size="lg"><Check /></Button>
            </Container>
        );
    }
}

export default JoinCompanyPage