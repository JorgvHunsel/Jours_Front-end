import React from 'react'

function ProjectWorkItem(props) {
    const workItem = props.work;
    
    return (
        <tr>
            <td>{workItem.taskName}</td>
            <td>{workItem.username}</td>
            <td>{workItem.beginDate}</td>
            <td>{workItem.endDate}</td>
        </tr>
    )
}

export default ProjectWorkItem