export async function CreateTask(name, description, projectId, selectedEmployees){
    return fetch('https://joursapp.herokuapp.com/task/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
            name: name,
            description: description,
            projectId: projectId,
          users: JSON.stringify(selectedEmployees)
        })
    }).then(response => response.json())
        .then(data => {
            return data
        });
}

export async function ChangeTaskStatus(taskItemId, taskItemStatus, direction){
    return fetch('https://joursapp.herokuapp.com/task/status', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
            taskId: taskItemId,
            status: taskItemStatus,
            direction: direction
        })
    }).then(response => {
        return response
    });
}