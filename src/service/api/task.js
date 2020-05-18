export async function CreateTask(name, description, projectId, selectedEmployees){
    return fetch('http://localhost:8090/task/create', {
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