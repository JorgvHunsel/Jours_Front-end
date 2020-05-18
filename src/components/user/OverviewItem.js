import React from 'react'
import {Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


function UserOverviewItem(props) {
    const EmployeeItem = props.employee;

    const link = "/employee/" + EmployeeItem.id

    return (
        <tr>
            <td>{EmployeeItem.username}</td>
            <td>{EmployeeItem.role}</td>
            <td><Link to={link}><Button>detail</Button></Link></td>
        </tr>
    )
}

export default UserOverviewItem
