export async function GetProject(projectId) {
    return fetch('http://localhost:8090/project/?projectId=' + projectId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
        }
    })
        .then(res => res.json()).catch()
        .then((data) => {
            return data
        })
}

export async function GetProjects(companyId) {
    return fetch('http://localhost:8090/project/all?companyId=' + companyId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken")
        }
    })
        .then(res => res.json()).catch()
        .then((data) => {
            return data
        })
}

export async function CreateProject(projectName, endDate, companyId) {
    return fetch('http://localhost:8090/project/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
            projectName: projectName,
            endDate: endDate,
            companyId: companyId
        })
    }).then(response => response.json())
        .then(data => {
            return data
        });
}

export async function DisableProject(projectId){
    return fetch('http://localhost:8090/project/disable?projectId=' + projectId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
        }
    }).then(response => response.json())
        .then(data => {
            return data
        });
}

export async function EditProject(projectId, projectName, endDate, companyId){
    return fetch('http://localhost:8090/project', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
            projectId: projectId,
            projectName: projectName,
            endDate: endDate,
            companyId: companyId
        })
    }).then(response => response.json())
        .then(data => {
            return data
        });
}