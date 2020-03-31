import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function companyItem(props) {
    const companyItem = props.company;

    const link = '/company/' + companyItem.id

    return (
            <Container>
                <Row>
                    <Col><h2>{companyItem.name}</h2></Col>
                    <Col><Link to={link} ><Button variant="dark" type="submit">Select</Button></Link></Col>
                </Row>
                <Row>
                </Row>
            </Container>
    )
}

export default companyItem
