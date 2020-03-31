import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import {withRouter} from 'react-router-dom';

import ProjectItem from '../components/ProjectOverviewItem';
import { Row, Container, Col, Button, CardColumns } from 'react-bootstrap';


class CompanyDetailPage extends Component {

    constructor(props) {
        super(props)


        this.state = {
            projects: [],
            userId: window.sessionStorage.getItem("userId"),
            companyId: props.match.params.companyId
        }

         this.getProjects()
         
    }

    getProjects() {
        fetch('http://localhost:8090/project/all?companyId=' + this.state.companyId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
            }
        })
            .then(res => res.json()).catch()
            .then((data) => {
                this.setState({ projects: data })
            })
    }


    render() {
        const { projects } = this.state;

        return (
            <React.Fragment>
                <div>
                    <Container>
                        <Row >
                            <Col><h1>Company detail</h1></Col>
                        </Row>
                    
                    
                    <CardColumns>
                    {projects.map((item) => (
                        <ProjectItem key={item.id} project={item} />
                    ))}
                    </CardColumns>
                    </Container>
                </div>

            </React.Fragment >
        )
    }
}

export default CompanyDetailPage