import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

import { Container } from 'react-bootstrap'

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
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

    handleSubmit = (e) => {
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
                    console.log('Gebruiker is ingelogd heeft een valide token');

                    auth.login(data)
                    this.props.history.push('/company/all')

                }
                if (data.message === 'Unauthorized') {
                    console.log('Gebruikersnaam of Wachtwoord komt niet overeen');
                }
            });
    }

    render() {
        return (
            <Container>
            <form className="form">
                <div className="div">
                    <h3>Login</h3>
                    <div className="form-group">
                        <label>Username:</label>
                        <input required type="text" className="form-control" placeholder="Enter your username" onChange={this.handleUsernameChange} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input required type="password" className="form-control" placeholder="Vul uw wachtwoord in" onChange={this.handlePasswordChange} />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Confirm</button>
                </div>
            </form>
            </Container>
        );
    }
}

export default LoginPage