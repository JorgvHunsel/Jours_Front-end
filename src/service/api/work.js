export async function AddWork(selectedTaskId, beginDate, endDate){
    return fetch('https://joursapp.herokuapp.com/work', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
            taskId: selectedTaskId,
            beginDate: beginDate,
            endDate: endDate
        })
    }).then(response => response.json())
        .then(data => {
            return data
        });
}

export async function GetUnfinishedWork(){
    return fetch('https://joursapp.herokuapp.com/work', {
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

export async function UpdateWork(unfinishedWorkId){
    return fetch('https://joursapp.herokuapp.com/work', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
            workId: unfinishedWorkId
        })
    }).then(response => response.json())
        .then(data => {
            return data
        });
}