import { React, useState, useEffect } from "react";
import MainScreen from "../components/MainScreen";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import About from "./About";

const AddStocks = () => {
    const [stocks, setStock] = useState([]);

    const fetchStock = async () => {
        const data = await axios.get("http://localhost:5000/stock");
        setStock(data.data);
    };

    // useEffect will call everytime our page is loaded
    useEffect(() => {
        fetchStock();
    }, []);

    return (
        <div className="addStock">
            <MainScreen title="Add Stock">
                <p>add stock form</p>

                <div>
                    <ListGroup>
                        {stocks.map((stock) => (
                            <ListGroup.Item
                                action
                                variant="dark"
                                key={stock._id}
                            >
                                {stock.stockName}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </MainScreen>
        </div>
    );
};

export default AddStocks;
