import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Button, Card, Row, Col, ListGroup } from 'react-bootstrap'
import { Trash} from 'react-bootstrap-icons'


function EmployeeDetailTask(props) {
    const task = props.task;

    return (
        <tr>
            <th>{task.name}</th>
            <th>{task.description}</th>
            <th>{task.status}</th>
        </tr>
    )
}

export default EmployeeDetailTask
