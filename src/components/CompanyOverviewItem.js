import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function companyItem(props) {
    const companyItem = props.company;


    function handleSubmit(event) {
        event.preventDefault();
        fetch('https://koffieleut.herokuapp.com/order/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

            })
        }).then(
            function (response) {

            }
        )
    }


    return (
        <form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Col><h2>{companyItem.name}</h2></Col>
                    <Col><Button variant="dark" type="submit">Select</Button></Col>
                </Row>
                <Row>
                </Row>
            </Container>
        </form>
    )
}

export default companyItem
