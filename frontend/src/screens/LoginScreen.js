import { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./LoginScreen.css";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router";

var Link = require("react-router-dom").Link;

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (userInfo) {
            navigate("/portfolio");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        dispatch(login(email, password));
        setLoading(false);
    };
    return (
        <MainScreen title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {isLoading && <Loading />}
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
