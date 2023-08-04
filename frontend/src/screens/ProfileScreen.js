import { Form, Button, Col, Row } from "react-bootstrap";
import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { updateProfile } from "../actions/userActions";
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage";
import "./ProfileScreen.css";


const ProfileScreen = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username);
            setEmail(userInfo.email);
        }
    }, [navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password === confirmPassword)
            dispatch(updateProfile({ username, email, password }));
    }



    return <div>
        <Header></Header>
        <MainScreen title="EDIT PROFILE" >
            <div>

                <Row className="profileContainer">
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {loading && <Loading />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )}
                            {
                                error && <ErrorMessage variant="danger">{error}</ErrorMessage>
                            }
                            <Form.Group controlId="username" className="formContainer">
                                <Form.Label>username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email" className="formContainer">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password" className="formContainer">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword" className="formContainer">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>{" "}

                            <Button className="button" type="submit" variant="primary">
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </MainScreen >x
    </div>
};

export default ProfileScreen;