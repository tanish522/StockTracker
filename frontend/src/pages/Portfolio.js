import React from "react";
import MainScreen from "../components/MainScreen";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Portfolio = () => {
    return (
        <div className="portfolio">
            <MainScreen title="Portfolio">
                <p>portfolio list from backend</p>
                <Link to="/add-stock">
                    <Button size="lg" variant="dark">
                        Add Stock
                    </Button>
                </Link>
            </MainScreen>
        </div>
    );
};

export default Portfolio;
