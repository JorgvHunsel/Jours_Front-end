import React, { useState } from 'react'

import { Button, Card } from 'react-bootstrap'


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
            <Card>
                <Card.Title>{projectItem.name}</Card.Title>
                <Card.Body>
                    <Button variant="success" block>Select</Button>
                    {role == "admin" &&
                    <Button variant="secondary" block>Edit</Button>
                    }                
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">End date: {projectItem.endDate}</small>
                </Card.Footer>
            </Card>
        </form>
    )
}

export default ProjectItem
