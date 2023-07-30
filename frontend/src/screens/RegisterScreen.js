import MainScreen from "../components/MainScreen";
import React, { useState } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import "./RegisterScreen.css";
import { Error } from "mongoose";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";
import Loading from "../components/Loading";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords Do not Match");
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
                setLoading(false);
                localStorage.setItem("userInfo", JSON.stringify(data));
            } catch (error) {
                setError(error.response.data.message);
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <MDBContainer
                fluid
                className="d-flex align-items-center justify-content-center bg-image"
                style={{
                    backgroundImage:
                        "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
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
                            size="lg"
                            id="form1"
                            type="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Your Email"
                            size="lg"
                            id="form2"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Password"
                            size="lg"
                            id="form3"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Repeat your password"
                            size="lg"
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
        </div>
    );
};

export default RegisterScreen;
