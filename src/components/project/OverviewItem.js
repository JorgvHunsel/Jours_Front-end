import React from 'react'

import { Link } from 'react-router-dom'
import { Button, Card, Row, Col } from 'react-bootstrap'
import { BoxArrowInRight, Pencil} from 'react-bootstrap-icons'


function ProjectOverviewItem(props) {
    const projectItem = props.project;
    const role = props.role;

    const projectLink = '/company/' + props.companyId +  '/project/' + projectItem.id
    const editProjectLink = '/company/' + props.companyId +  '/project/' + projectItem.id + '/edit'


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
                            <Link to={projectLink}><Button variant="success" block><BoxArrowInRight/></Button></Link>
                        </Col>
                        {role === "admin" &&
                            <Col><Link to={editProjectLink}><Button variant="secondary" block><Pencil/></Button></Link></Col>
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

export default ProjectOverviewItem
