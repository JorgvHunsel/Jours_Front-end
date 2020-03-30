import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (window.sessionStorage.getItem("userToken") != null) {   
                    console.log("access accepted")    
                    return <Component {...props} />
                }
                else {
                    console.log("access denied")
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }

        } />
    )
}