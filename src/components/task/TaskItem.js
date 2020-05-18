import React, { useState } from 'react'
import { Row, Col, Button, Card, Modal, ListGroup } from 'react-bootstrap'
import { ArrowLeft, ArrowRight, Trash } from 'react-bootstrap-icons'
import {ChangeTaskStatus} from '../../service/api/task'



function TaskItem(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const taskItem = props.task;
    const userRole = props.userRole;


    function changeTaskStatus(direction) {
        ChangeTaskStatus(taskItem.id, taskItem.status, direction).then(()=>{
            props.update()
        })
    }

    return (
        <tr ><td>
            <Card border="secondary">
                <Card.Body>
                    <Card.Title onClick={handleShow}>{taskItem.name}</Card.Title>
                    <Card.Text>{taskItem.description.substring(0, 20)}..</Card.Text>

                    {userRole === "admin" &&
                        <Row>
                            <Col>
                                {taskItem.status !== "to do" &&
                                    <Button onClick={() => changeTaskStatus(false)} variant="outline-success" block><ArrowLeft /></Button>
                                }
                            </Col>
                            <Col>
                                {taskItem.status !== "done" ?
                                    <Button onClick={() => changeTaskStatus(true)} variant="outline-success" block><ArrowRight /></Button> :
                                    <Button onClick={() => changeTaskStatus(true)} variant="outline-danger" block><Trash /></Button>
                                }
                            </Col>
                        </Row>
                    }
                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{taskItem.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{taskItem.description}</Modal.Body>
                <Modal.Body><h4>People</h4></Modal.Body>
                <ListGroup>{taskItem.userNames.map((username) => (
                    <ListGroup.Item key={username}>{username}</ListGroup.Item>
                ))}</ListGroup>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </td></tr>
    )
}

export default TaskItem
