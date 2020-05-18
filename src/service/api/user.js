
export async function Login(username, password) {
    return fetch('http://localhost:8090/authenticate', {
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
    return fetch('http://localhost:8090/register', {
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

export async function GetCompaniesFromUser(userId){
    return fetch('http://localhost:8090/user/company?userId=' + userId, {
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

