import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'
import { Pencil, BoxArrowInRight } from 'react-bootstrap-icons'


function companyItem(props) {
    const companyItem = props.company;

    const link = '/company/' + companyItem.id

    return (
        <Card>
            <Card.Title>{companyItem.name}</Card.Title>
            <Card.Body>
                <Row>
                    <Col>
                        <Link to={link} ><Button variant="success" block><BoxArrowInRight/></Button></Link>
                    </Col>
                    <Col>
                        {companyItem.currentUserRole == "admin" ?
                            <Link to=""><Button variant="outline-primary" block><Pencil /></Button></Link> :
                            <Link to=""><Button variant="outline-secondary" disabled block><Pencil /></Button></Link>
                        }
                    </Col>

                </Row>

            </Card.Body>
        </Card>
    )
}

export default companyItem
