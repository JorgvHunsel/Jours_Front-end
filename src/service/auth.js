import decode from 'jwt-decode'

class Auth {
    constructor() {
        // const token = window.sessionStorage.getItem("usertoken")

        // try {
        //     const { exp } = decode(token);


        //     if (exp < new Date().getTime) {
        //         this.authenticated = false;
        //     }
        // } catch (e) {
        //     console.log(e)
        //     return this.authenticated = false;
        // }

        this.authenticated = true;
    }


    login(token) {
        window.sessionStorage.setItem("userToken", token);
        window.sessionStorage.setItem("user", this.parseJwt(token).sub)

        console.log(this.parseJwt(token))
        console.log("hier gaat die inloggen:")
        console.log(window.sessionStorage.getItem("userToken"))
        console.log(window.sessionStorage.getItem("user"))

        this.authenticated = true;
    }

    logout(token) {
        window.sessionStorage.removeItem(token)
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }


    async checkIfAuth() {
        console.log(this.authenticated)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                username: window.sessionStorage.getItem("user"),
                token: window.sessionStorage.getItem("userToken")
            }),
            redirect: 'follow'
        };


        fetch("http://localhost:8090/isLegit", requestOptions)
            .then(response => response.text())
            .then(
                (result) => {
                    console.log("islegit:")
                    console.log(result)

                    if (result) {
                        this.authenticated = result;
                    }
                })
    }

    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
}

export default new Auth()