import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'
import { ArrowLeft, ArrowRight, Trash, Search } from 'react-bootstrap-icons'


function taskItem(props) {
    const taskItem = props.task;
    const userRole = props.userRole;

    const link = '/task/' + taskItem.id


    function changeTaskStatus(direction) {
        fetch('http://localhost:8090/task/status', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                taskId: taskItem.id,
                status: taskItem.status,
                direction: direction
            })
        }).then(response => {
            props.update()
        });
    }



    return (
                <Card>
            <Card.Body>
                <Card.Title>{taskItem.name}</Card.Title>
                <Card.Text>{taskItem.description.substring(0, 20)}..</Card.Text>
                <Search onClick={() =>window.alert("d")}/>
                {userRole == "admin" &&
                    <Row>
                        <Col>
                            {taskItem.status != "to do" &&
                                <Button onClick={() => changeTaskStatus(false)} variant="outline-success" block><ArrowLeft /></Button>
                            }
                        </Col>
                        <Col>
                            {taskItem.status != "done" ?
                                <Button onClick={() => changeTaskStatus(true)} variant="outline-success" block><ArrowRight /></Button> :
                                <Button onClick={() => changeTaskStatus(true)} variant="outline-danger" block><Trash /></Button>
                            }
                        </Col>
                    </Row>
                }
            </Card.Body>
        </Card>
    )
}

export default taskItem
