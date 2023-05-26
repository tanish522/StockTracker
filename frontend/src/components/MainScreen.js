import React from "react";
import "./MainScreen.css";
import { Container, Row } from "react-bootstrap";

const MainScreen = ({ title, children }) => {
    return (
        <div className="mainBack">
            <Container>
                <Row>
                    <div className="page">
                        {/* && will render code inside () if title exists */}
                        {title && (
                            <>
                                <h1 className="heading">{title}</h1>
                                <hr />
                            </>
                        )}
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default MainScreen;
