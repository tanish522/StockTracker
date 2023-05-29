import React from "react";
import MainScreen from "../components/MainScreen";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddStocks = () => {
    return (
        <div className="addStock">
            <MainScreen title="Add Stock">
                <p>add stock form</p>
                <Link to="/portfolio">
                    <Button size="lg" variant="dark">
                        Confirm
                    </Button>
                </Link>
            </MainScreen>
        </div>
    );
};

export default AddStocks;
