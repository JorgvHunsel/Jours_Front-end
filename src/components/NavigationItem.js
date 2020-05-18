import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import auth from '../service/auth'

import { ListUl, Plus, PersonPlus } from 'react-bootstrap-icons'


class NavigationItem extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Jours</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Company" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/company/all"><ListUl></ListUl> Overview</NavDropdown.Item>
                            <NavDropdown.Item href="/company/create"><Plus></Plus> Create</NavDropdown.Item>
                            <NavDropdown.Item href="/company/join"><PersonPlus></PersonPlus> Join</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/work/add">Add work</Nav.Link>
                    </Nav>
                    {window.sessionStorage.getItem("userToken") == null ?
                        <Link to="/login"><Button variant="outline-info">Login</Button></Link> :
                        <Link to="/login"><Button onClick={() => auth.logout()} variant="outline-info">Logout</Button></Link>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavigationItem;