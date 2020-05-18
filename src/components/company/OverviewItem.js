import React from 'react'

import { Link } from 'react-router-dom'
import { Row, Col, Button, Jumbotron } from 'react-bootstrap'
import { Pencil } from 'react-bootstrap-icons'


function CompanyOverviewItem(props) {
    const companyItem = props.company;

    const overviewLink = '/company/' + companyItem.id
    const editLink = '/company/' + companyItem.id + '/edit'

    return (
        <Jumbotron>
            <Row><Col><Link to={overviewLink} ><h1>{companyItem.name}</h1></Link></Col></Row>
            <Row>
                <Col>
                    {companyItem.currentUserRole === "admin" ?
                        <Link to={editLink}><Button variant="outline-success" size="lg" ><Pencil /></Button></Link> :
                        <Button variant="outline-secondary" size="lg" disabled ><Pencil /></Button>
                    }
                </Col>
            </Row>
        </Jumbotron>
    )
}

export default CompanyOverviewItem
