import jwt from 'jsonwebtoken'

class Auth {

    constructor() {
        //  const jwt_secret = 'javainuse';
        //  let token = window.sessionStorage.getItem("userToken")

         
        //  var decoded = jwt.verify(token, jwt_secret)
        //  console.log('decoded: ' + decoded)
        // console.log(decoded.exp)

        // this.authenticated = false;
        // try {
        //     const { exp } = decode(token);


        //     if (exp < new Date().getTime) {
        //         console.log("correct")
        //         this.authenticated = true;
        //     }
        // } catch(e) {
        //     console.log(e)
        //     console.log("niet correct")
        //     return this.authenticated = false;
        // }

        this.authenticated = true
    }




    // checkIfCorrect(){
    //     const jwt_secret = 'javainuse';
    //     let token = window.sessionStorage.getItem("userToken")


    //     if (token) {

    //         jwt.verify(token, jwt_secret, function (err, decoded) {
    //             if (err) {
    //                 console.log("werkt niet")
    //                 console.log(err)
    //                 window.sessionStorage.removeItem("userToken")
    //                 window.sessionStorage.removeItem("user")
    //                 token = null;
    //                 return false;

    //             }
    //             else {
    //                 console.log("werkt")
    //                 console.log(decoded)
    //                 return true;
    //             }

    //         })

    //     }


    login(data) {
        window.sessionStorage.clear()
        window.sessionStorage.setItem("userId", this.parseJwt(data.token).userId)
        window.sessionStorage.setItem("username", this.parseJwt(data.token).sub)
        window.sessionStorage.setItem("userToken", data.token);

       




        console.log('userId: ' + window.sessionStorage.getItem("userId"))
        console.log('username: ' + window.sessionStorage.getItem("username"))
        console.log('usertoken: ' + window.sessionStorage.getItem("userToken"))

        this.authenticated = true;
    }

    logout(token) {
        window.sessionStorage.removeItem(token)
        this.authenticated = false;
    }

    isAuthenticated() {
        console.log("watjldsfjlfjnogfonhjsjhj")
        var output = this.checkIfCorrect()
        console.log(output)

        return this.checkIfCorrect()
    }


    // async checkIfAuth() {
    //     console.log(this.authenticated)
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: JSON.stringify({
    //             username: window.sessionStorage.getItem("user"),
    //             token: window.sessionStorage.getItem("userToken")
    //         }),
    //         redirect: 'follow'
    //     };


    //     fetch("http://localhost:8090/isLegit", requestOptions)
    //         .then(response => response.text())
    //         .then(
    //             (result) => {
    //                 console.log("islegit:")
    //                 console.log(result)

    //                 if (result) {
    //                     this.authenticated = result;
    //                 }
    //             })
    // }

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