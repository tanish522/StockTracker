import { useState } from "react";
import MainScreen from "../components/MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
var Link = require("react-router-dom").Link;

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

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

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    console.log("login screen paege");
    return (
        <MainScreen title="LOGIN">
            <div className="loginContainer">
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
