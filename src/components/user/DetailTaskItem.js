import React from 'react'

function UserDetailTaskItem(props) {
    const task = props.task;

    return (
        <tr>
            <th>{task.name}</th>
            <th>{task.description}</th>
            <th>{task.status}</th>
        </tr>
    )
}

export default UserDetailTaskItem
