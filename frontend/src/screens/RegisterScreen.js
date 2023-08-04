import React, { useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import "./RegisterScreen.css";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";
import Loading from "../components/Loading";
import LoginScreen from "./LoginScreen";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;
        const passwordLength = password.length;
        const uppercasePassword = uppercaseRegExp.test(password);
        const lowercasePassword = lowercaseRegExp.test(password);
        const digitsPassword = digitsRegExp.test(password);
        const specialCharPassword = specialCharRegExp.test(password);
        const minLengthPassword = minLengthRegExp.test(password);

        if (password !== confirmPassword) {
            setMessage("Passwords Do not Match");
        } else if (passwordLength === 0) {
            setMessage("Password is empty");
        } else if (!uppercasePassword) {
            setMessage("At least one Uppercase");
        } else if (!lowercasePassword) {
            setMessage("At least one Lowercase");
        } else if (!digitsPassword) {
            setMessage("At least one digit");
        } else if (!specialCharPassword) {
            setMessage("At least one Special Characters");
        } else if (!minLengthPassword) {
            setMessage("At least minumum 8 characters");
        } else {
            setMessage(null);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                setLoading(true);

                const { data } = await axios.post(
                    "http://localhost:5000/auth",
                    { username, email, password },
                    config
                );
                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false);
                navigateToLogin();
            } catch (error) {
                setError(error.response.data.message);
                setLoading(false);
            }
        }
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <p>minimum 8 characters required</p>
            <p>1 uppercase character</p>
            <p>1 lowercase character</p>
            <p>1 digit/number</p>
            <p>1 special character</p>
        </Tooltip>
    );

    const navigateToLogin = () => {
        // 👇️ navigate to /portfolio
        navigate("/login");
    };

    return (
        <div>
            <MDBContainer
                fluid
                className="d-flex align-items-center justify-content-center bg-image"
                style={{
                    backgroundImage:
                        "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
                    minHeight: "100vh",
                }}
            >
                <div className="mask gradient-custom-3"></div>

                <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
                    <MDBCardBody className="px-5">
                        {error && (
                            <ErrorMessage variant="danger">
                                {error}
                            </ErrorMessage>
                        )}
                        {message && (
                            <ErrorMessage variant="danger">
                                {message}
                            </ErrorMessage>
                        )}
                        {loading && <Loading />}
                        <h2 className="text-uppercase text-center mb-5">
                            Create an account
                        </h2>
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Your Name"
                            size="md"
                            id="form1"
                            type="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Your Email"
                            size="md"
                            id="form2"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Password "
                                size="md"
                                id="form3"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </OverlayTrigger>
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Repeat your password"
                            size="md"
                            id="form4"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="d-flex flex-row justify-content-center mb-4">
                            <MDBCheckbox
                                name="flexCheck"
                                id="flexCheckDefault"
                                label="I agree all statements in Terms of service"
                            />
                        </div>
                        <MDBBtn
                            onClick={submitHandler}
                            className="mb-4 w-100 gradient-custom-4"
                            size="lg"
                        >
                            Register
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
            </Routes>
        </div>
    );
};

export default RegisterScreen;
