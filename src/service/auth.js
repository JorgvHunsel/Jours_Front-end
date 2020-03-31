import jwt from 'jsonwebtoken'

class Auth {
    login(data) {
        window.sessionStorage.clear()
        window.sessionStorage.setItem("userId", this.parseJwt(data.token).userId)
        window.sessionStorage.setItem("username", this.parseJwt(data.token).sub)
        window.sessionStorage.setItem("userToken", data.token);
    }

    logout(token) {
        window.sessionStorage.removeItem("userId")
        window.sessionStorage.removeItem("username")
        window.sessionStorage.removeItem("userToken")
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