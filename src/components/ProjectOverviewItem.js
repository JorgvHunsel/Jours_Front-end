import React, { useState } from 'react'

import { Button, Card, Row, Col } from 'react-bootstrap'
import { BoxArrowInRight, Pencil} from 'react-bootstrap-icons'


function ProjectItem(props) {
    const projectItem = props.project;
    const role = props.role;




    function handleSubmit(event) {
        event.preventDefault();
        fetch('https://koffieleut.herokuapp.com/project/id', {
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
            <Card text="light" bg="dark">
                <Card.Title>{projectItem.name}</Card.Title>
                <Card.Body>
                    <Row>
                        <Col>
                            <Button variant="success" block><BoxArrowInRight/></Button>
                        </Col>
                        {role == "admin" &&
                            <Col><Button variant="secondary" block><Pencil/></Button></Col>
                        }
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">End date: {projectItem.endDate}</small>
                </Card.Footer>
            </Card>
        </form>
    )
}

export default ProjectItem
