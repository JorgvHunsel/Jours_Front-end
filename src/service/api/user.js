
export async function Login(username, password) {
    return fetch('https://joursapp.herokuapp.com/authenticate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }).then(response => response.json())
        .then(data => {
            return data
        });
}


export async function Register(username, password){
    return fetch('https://joursapp.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(response => response.json())
            .then(data => {
                return data
            });
}

export async function GetUser(userId){
    return fetch('https://joursapp.herokuapp.com/user?userId=' + userId, {
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

export async function GetCompaniesFromUser(){
    return fetch('https://joursapp.herokuapp.com/user/company', {
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

export async function GetTasksFromuser(){
    return fetch('https://joursapp.herokuapp.com/user/tasks', {
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






