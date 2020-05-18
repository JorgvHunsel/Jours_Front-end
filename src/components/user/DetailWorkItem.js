import React from 'react'


function UserDetailWorkItem(props) {
    const workItem = props.work;

    return (
        <tr>
            <td>{workItem.taskName}</td>
            <td>{workItem.beginDate}</td>
            <td>{workItem.endDate}</td>
        </tr>
    )
}

export default UserDetailWorkItem