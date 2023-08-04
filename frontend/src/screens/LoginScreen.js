import { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
} from "mdb-react-ui-kit";
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
    const { error, userInfo } = userLogin;
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
        <div>
            {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {isLoading && <Loading />} */}
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

                        {loading && <Loading />}
                        <h2 className="text-uppercase text-center mb-5">
                            Enter Login Details
                        </h2>
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Email Address"
                            size="md"
                            id="form1"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Password"
                            size="md"
                            id="form2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <MDBBtn
                            onClick={submitHandler}
                            className="mb-4 w-100 gradient-custom-4"
                            size="lg"
                        >
                            Login
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default LoginScreen;
