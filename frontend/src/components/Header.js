import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <Navbar bg="dark" expand="md" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link
                        to="/"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                        {" "}
                        Stock Tracker
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            {/* This / is a route which will navigate page to specified element in index.js */}
                            <Link
                                to="/portfolio"
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                            >
                                Portfolio
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link
                                to="/stock"
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                            >
                                Stocks
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link
                                to="/about"
                                style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                }}
                            >
                                About
                            </Link>
                        </Nav.Link>
                        <NavDropdown title={userInfo.username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                MyProfile
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={logoutHandler}
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default Header;
