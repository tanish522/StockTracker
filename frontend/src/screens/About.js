import React from "react";
import MainScreen from "../components/MainScreen";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Header from "../components/Header";
import "./About.css";

Chart.register(ArcElement, Tooltip, Legend);

const About = () => {
    return (
        <div className="about">
            <Header></Header>
            <MainScreen title="About Us">
                <div className="content">
                    <h2>
                        <center>Who we are</center>
                    </h2>
                    <p>
                        Welcome to Stock Tracker, your ultimate destination for
                        managing and tracking your investment portfolios with
                        ease and precision. Keeping a close eye on your stocks
                        and investments is crucial to achieving your financial
                        goals, and that's why we've built a platform that
                        empowers you to take control of your financial future.
                        We are a team of finance enthusiasts, tech geeks, and
                        customer-centric individuals who are passionate about
                        simplifying investment management. Our diverse
                        backgrounds enable us to create a platform that caters
                        to both seasoned investors and beginners alike.
                    </p>
                </div>
                <div className="content">
                    <h2>
                        <center>Our Vision</center>
                    </h2>
                    <p>
                        Our vision is to empower individuals from all walks of
                        life to make investment decisions and grow their wealth
                        through smart portfolio management. We believe that
                        everyone should have access to reliable tools and
                        resources to navigate the complexities of the financial
                        markets confidently. Whether you are a seasoned investor
                        looking to optimize your portfolio or a beginner taking
                        your first steps into the world of investments, Stock
                        Tracker is here to support you at every stage.
                    </p>
                </div>
            </MainScreen>
        </div>
    );
};

export default About;
