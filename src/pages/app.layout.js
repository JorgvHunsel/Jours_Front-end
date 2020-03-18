import React from 'react'
import auth from '../service/auth'

export const AppLayout = props => {
    return (
        <div>
            <h1>App Layout</h1>
            <button onClick={() => {
                auth.logout(() => {
                    this.props.history.push("/");
                    console.log("wat is deze")
                });
            }}>Log out</button>
        </div>
    )
}