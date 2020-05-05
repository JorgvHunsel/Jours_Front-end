import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { withRouter, Link } from 'react-router-dom';

import CompanyItem from '../components/CompanyOverviewItem';
import { Row, Container, Col, Button, CardColumns } from 'react-bootstrap';
import companyItem from '../components/CompanyOverviewItem';


class CompanyOverviewPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            companies: [],
            userId: window.sessionStorage.getItem("userId")
        }

        this.getCompanies()
    }

    getCompanies() {
        fetch('http://localhost:8090/company/all/?userId=' + this.state.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                this.setState({ companies: data })

            })
    }

    render() {
        const { companies } = this.state;
        return (
            <React.Fragment>
                <div>
                    <Row >
                        <Col><h1>Your companies</h1></Col>
                    </Row>
                    {companies.map((item) => (
                        <CompanyItem key={item.id} company={item} />
                    ))}
                </div>

            </React.Fragment >
        )

    }

}

export default CompanyOverviewPage