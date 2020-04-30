import React from "react";
import { Link } from 'react-router-dom'
import {Jumbotron, Button} from 'react-bootstrap'

export const LandingPage = () => {
    return <Jumbotron>
    <h1>Welcome to Jours!</h1>
    <p>
      This is the start page
    </p>
    <p>
      <Link to="/company/all"><Button variant="primary">Start</Button></Link>
    </p>
  </Jumbotron>;
}