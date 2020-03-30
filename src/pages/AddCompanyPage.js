import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

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

                

                //this.props.history.push('/app')
            });
    }

    render() {
        return (
            <form className="form">
                <div className="div">
                    <h3>Create company:</h3>
                    <div className="form-group">
                        <label>Company name:</label>
                        <input required type="text" className="form-control" placeholder="Enter the name of your company" onChange={this.handleCompanyNameChange} />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Confirm</button>
                </div>
            </form>
        );
    }
}

export default AddCompanyPage