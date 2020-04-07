import React, { Component } from 'react'
import auth from '../service/auth'
import jwt from 'jsonwebtoken'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import '../styling/AddProjectPage.css'


import { Container } from 'react-bootstrap'

class AddProjectPage extends Component {


    constructor(props) {
        super(props)

        this.state = {
            projectName: '',
            endDate: new Date(),
            companyId: this.props.location.state.companyId,
        }
        console.log(this.state.companyId)
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
        console.log(this.state.endDate)
    }

    handleSubmit = (e) => {
        console.log(auth)
        e.preventDefault();
        fetch('http://localhost:8090/project/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                projectName: this.state.projectName,
                endDate: this.state.endDate,
                companyId: this.state.companyId
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.props.history.push('/company/' + this.state.companyId)
            });
    }


    render() {
        return (
            <Container>
                <form className="form">
                    <div className="div">
                        <h3>Create project:</h3>
                        <div className="form-group">
                            <label>Project name:</label>
                            <input required type="text" className="form-control" placeholder="Enter the name of your new project" onChange={this.handleProjectNameChange} />
                        </div>
                        <div className="form-group">
                            <label>endDate:</label><br/>
                            <DatePicker minDate={new Date()} strictParsing dateFormat="dd/MM/yyyy" selected={this.state.endDate} onChange={date => this.handleEndDateChange(date)} />
                        </div>
                        <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Confirm</button>
                    </div>
                </form>

            </Container>

        );
    }
}

export default AddProjectPage