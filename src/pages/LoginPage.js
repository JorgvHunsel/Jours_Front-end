import React, { Component } from 'react'

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

    handleSubmit = (e) => {}

    render() {
        return (
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
        );
    }
}

export default LoginPage