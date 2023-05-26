import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="dark" expand="md" variant="dark">
            <Container>
                <Navbar.Brand>
                    {/* This / is a route which will navigate page to specified element in index.js */}
                    <Link to="/"> Stock Tracker</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to="/portfolio">Portfolio</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/add-stock">Add Stocks</Link>
                        </Nav.Link>
                        <Nav.Link href="#link">Charts</Nav.Link>
                        <Nav.Link>
                            <Link to="/about">About</Link>
                        </Nav.Link>
                        <NavDropdown title="Tanish" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                MyProfile
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
