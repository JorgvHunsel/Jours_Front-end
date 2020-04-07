import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'


function companyItem(props) {
    const companyItem = props.company;

    const link = '/company/' + companyItem.id

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Title>{companyItem.name}</Card.Title>
            <Card.Body>
                <Link to={link} ><Button variant="success" block>Select</Button></Link>
            </Card.Body>
            <Card.Footer>
                {companyItem.userRole == "admin" ?
                    <Link><Button variant="outline-primary" block>Edit</Button></Link>:
                    <Link><Button variant="outline-secondary" disabled block>Edit</Button></Link>
                }
            </Card.Footer>
        </Card>
    )
}

export default companyItem
