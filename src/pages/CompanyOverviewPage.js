import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import CompanyItem from '../components/CompanyOverviewItem';
import { Row, Container, Col, Button } from 'react-bootstrap';


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
                    <Container>
                        <Row >
                            <Col><h1>Company overview</h1></Col>
                        </Row>
                    </Container>

                    {companies.map((item) => (
                        <CompanyItem key={item.id} company={item} />
                    ))}

                    <Container>
                        <Row>
                            <Col><Button variant="primary" size="lg" block>Join</Button></Col>
                            <Col><Button variant="primary" size="lg" block>Add</Button></Col>
                        </Row>
                    </Container>



                </div>

            </React.Fragment >
        )

    }

}

export default CompanyOverviewPage