import React, { Component } from 'react';
import CompanyItem from '../../components/company/OverviewItem';
import { Row, Col } from 'react-bootstrap';


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
                if (data.length === 0) {
                    this.handleEmptyCompanies()
                }
                this.setState({ companies: data })

            })
    }

    handleEmptyCompanies() {
        this.props.history.push("/company/join")
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