import React, { Component } from 'react'
import auth from '../service/auth'

import { Container, Button, InputGroup, FormControl, Alert } from 'react-bootstrap'
import { Check } from 'react-bootstrap-icons'

class RegisterPage extends Component {
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

    handleRegister = (e) => {
        e.preventDefault();
        fetch('http://localhost:8090/register', {
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
                if(data.id !== null){
                    this.handleLogin()
                }
            });
    }

    handleLogin(){
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
                    <h3>Register</h3>
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
                    <Button className="btn btn-primary btn-block" onClick={this.handleRegister} size="lg"><Check /></Button>
                    <br/>
                {this.state.showError &&
                <Alert variant="danger">Register failed</Alert>
                }
                </div>
            </Container>
        );
    }
}

export default RegisterPage