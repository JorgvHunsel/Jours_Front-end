import React, { useState } from 'react'

import { Button, Card } from 'react-bootstrap'


function EmployeeDetailWorkItem(props) {
    const workItem = props.work;


    return (
        <tr>
            <td>{workItem.taskName}</td>
            <td>{workItem.beginDate}</td>
            <td>{workItem.endDate}</td>
        </tr>
    )
}

export default EmployeeDetailWorkItem