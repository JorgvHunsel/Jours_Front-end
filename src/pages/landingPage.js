import React from "react";
import { Link } from 'react-router-dom'
import {Jumbotron, Button} from 'react-bootstrap'

export const LandingPage = () => {
    return <Jumbotron>
    <h1>Welcome to Jours!</h1>
    
    <h4>Click the start button to begin</h4>
    <p>Made by Jorg van Hunsel</p>
    

      <Link to="/company/all"><Button variant="primary">Start</Button></Link>

  </Jumbotron>;
}