import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");
    //     if (userInfo) {
    //         history("/portfolio");
    //     }

    // }, [history]);

    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className="title">Welcome to Stock Tracker</h1>
                            <p className="subtitle">
                                Track your personal stock portfolio
                            </p>
                        </div>
                        <div className="buttonContainer">
                            <Link to="/login">
                                <Button
                                    variant="outline-dark"
                                    size="lg"
                                    className="landingButton"
                                >
                                    <b>Login</b>
                                </Button>
                            </Link>

                            <a href="./register">
                                <Button
                                    variant="outline-dark"
                                    size="lg"
                                    className="landingButton"
                                >
                                    <b>Sign Up</b>
                                </Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;
