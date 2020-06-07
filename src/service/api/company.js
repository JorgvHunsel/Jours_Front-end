export async function CreateCompany(companyName){
    return fetch('https://joursapp.herokuapp.com/company/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
            },
            body: JSON.stringify({
                companyName: companyName
            })
        }).then(response => response.json())
            .then(data => {
                return data
            });
}

export async function GetCompany(companyId){
    return fetch('https://joursapp.herokuapp.com/company?companyId=' + companyId, {
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

export async function EditCompany(companyId, companyName, employees){
    return fetch('https://joursapp.herokuapp.com/company/edit', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
            companyId: companyId,
            companyName: companyName,
            users: JSON.stringify(employees)
        })
    }).then(response => response.json())
        .then(data => {
            return data
        });
}

export async function JoinCompany(companyCode){
    return fetch('https://joursapp.herokuapp.com/company/join', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
            code: companyCode
        })
    }).then(response => response.json())
        .then(data => {
            return data
        });
}

export async function UpdateCompanyCode(companyId){
    return fetch('https://joursapp.herokuapp.com/company/code?companyId=' + companyId, {
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