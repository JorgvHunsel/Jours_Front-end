export async function CreateCompany(companyName){
    return fetch('http://localhost:8090/company/create', {
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
    return fetch('http://localhost:8090/company?companyId=' + companyId, {
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
    return fetch('http://localhost:8090/company/edit', {
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
    return fetch('http://localhost:8090/company/join', {
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
    return fetch('http://localhost:8090/company/code?companyId=' + companyId, {
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