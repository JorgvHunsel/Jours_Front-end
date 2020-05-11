import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

import { Container, InputGroup, FormControl, Button, ListGroup, Row, Col } from 'react-bootstrap'
import { Check, ArrowClockwise } from 'react-bootstrap-icons'

class JoinCompanyPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companyCode: '',
        }

    }

    handleSubmit = (e) => {
        console.log(auth)
        e.preventDefault();
        fetch('http://localhost:8090/company/join', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                code: this.state.companyCode
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.props.history.push("/company/" + data.id)
            });
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