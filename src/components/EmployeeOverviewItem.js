import React, { useState } from 'react'

import { Button, Card } from 'react-bootstrap'


function EmployeeItem(props) {
    const EmployeeItem = props.employee;

    return (
        <tr>
            <td>{EmployeeItem.username}</td>
            <td>{EmployeeItem.role}</td>
        </tr>
    )
}

export default EmployeeItem