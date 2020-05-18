import React, { Component } from 'react';
import CompanyItem from '../../components/company/OverviewItem';
import { Row, Col } from 'react-bootstrap';
import { GetCompaniesFromUser } from '../../service/api/user'


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
        GetCompaniesFromUser(this.state.userId).then((data) => {
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