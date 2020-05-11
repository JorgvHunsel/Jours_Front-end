import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, Card, Jumbotron } from 'react-bootstrap'
import { Pencil, BoxArrowInRight } from 'react-bootstrap-icons'


function companyItem(props) {
    const companyItem = props.company;

    const overviewLink = '/company/' + companyItem.id
    const editLink = '/company/' + companyItem.id + '/edit'

    return (
        <Jumbotron>
            <Row><Col><Link to={overviewLink} ><h1>{companyItem.name}</h1></Link></Col></Row>
            <Row>
                    <Col>
                        {companyItem.currentUserRole == "admin" ?
                            <Link to={editLink}><Button variant="outline-success" size="lg" ><Pencil /></Button></Link> :
                            <Button variant="outline-secondary" size="lg" disabled ><Pencil /></Button>
                        }
                    </Col>
                </Row>
        </Jumbotron>
    )
}

export default companyItem
