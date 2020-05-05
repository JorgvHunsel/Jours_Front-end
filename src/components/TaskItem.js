import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons'


function taskItem(props) {
    const taskItem = props.task;

    const link = '/task/' + taskItem.id

    return (
        <Card>
            <Card.Body>
                <Card.Title>{taskItem.name}</Card.Title>
                <Card.Text>{taskItem.description.substring(0, 20)}..</Card.Text>
                <Row>
                    <Col>
                        {taskItem.status != "to do" &&
                            <Button variant="success" block><ArrowLeft /></Button>
                        }

                    </Col>
                    <Col>
                    {taskItem.status != "done" &&
                    <Button variant="success" block><ArrowRight /></Button>
                    }
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default taskItem
