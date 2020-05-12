import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

import {Link} from 'react-router-dom'
import { Container, Button, InputGroup, FormControl, Alert } from 'react-bootstrap'
import { Check } from 'react-bootstrap-icons'

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            showError: false
        }
    }

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:8090/authenticate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        }).then(response => response.json())
            .then(data => {
                if (data.token != null) {
                    auth.login(data)
                    this.props.history.push('/company/all')

                }
                if (data.message === 'Unauthorized') {
                    this.setState({showError: true})
                    console.log('Gebruikersnaam of Wachtwoord komt niet overeen');
                }
            });
    }

    render() {
        return (
            
            <Container>
                <div className="div">
                    <h1>Login</h1>
                    <InputGroup size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg">Username</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handleUsernameChange} />
                    </InputGroup>
                    <br />
                    <InputGroup size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg">Password</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="password" aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.handlePasswordChange} />
                    </InputGroup>
                    <br />
                    <Button className="btn btn-primary btn-block" onClick={this.handleLogin} size="lg"><Check /></Button>
                    <br/>
                    <Link to="/register"><Button variant="outline-success"size="lg" block>Register</Button></Link>
                    <br/>
                {this.state.showError &&
                <Alert variant="danger">Login failed</Alert>
                }
                </div>
            </Container>
        );
    }
}

export default LoginPage