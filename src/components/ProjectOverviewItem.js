import React, { useState } from 'react'

import { Button, Card } from 'react-bootstrap'


function ProjectItem(props) {
    const projectItem = props.project;


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
            <Card style={{ width: '18rem' }}>
                <Card.Title>{projectItem.name}</Card.Title>
                <Card.Body><Button variant="primary" block>Select</Button></Card.Body>
                <Card.Footer>
                    <small className="text-muted">End date: {projectItem.endDate}</small>
                </Card.Footer>
            </Card>
        </form>
    )
}

export default ProjectItem
