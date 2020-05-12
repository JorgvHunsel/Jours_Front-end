import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

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
        console.log(auth)
        e.preventDefault();
        fetch('http://localhost:8090/company/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                companyName: this.state.companyName,
                userId: window.sessionStorage.getItem("userId")
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.props.history.push('/company/all')
            });
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