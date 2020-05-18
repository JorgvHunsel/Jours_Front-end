import React from 'react'

import { Button, Row, Col, ListGroup } from 'react-bootstrap'
import { Trash} from 'react-bootstrap-icons'


function EmployeeTask(props) {
    const employeeItem = props.employee;

    return (
        <ListGroup.Item><Row>
            <Col>{employeeItem.username}</Col>
            <Col><Button variant="danger" onClick={() => props.update()}><Trash/></Button></Col>
            </Row></ListGroup.Item>
    )
}

export default EmployeeTask
