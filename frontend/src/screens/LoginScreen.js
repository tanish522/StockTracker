import { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./LoginScreen.css";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import ErrorMessage from "../components/ErrorMessage";
var Link = require("react-router-dom").Link;

const LoginScreen = () => {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            setLoading(true);

            const { data } = await axios.post(
                "http://localhost:5000/auth/login",
                {
                    email,
                    password,
                },
                config
            );
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };
    return (
        <MainScreen title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && (
                    <div
                        style={{
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MoonLoader color="#36d7b7" />
                    </div>
                )}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="mt-3" variant="primary" type="submit">
                        Submit
                    </Button>

                    <Row className="py-3">
                        <Col>
                            New Customer ?{" "}
                            <Link to="/register"> Register Here </Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </MainScreen>
    );
};

export default LoginScreen;
