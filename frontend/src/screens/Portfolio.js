import { React, useState, useEffect } from "react";
import MainScreen from "../components/MainScreen";
import { Link } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);
    // to fetch portfolio from db
    const fetchPortfolio = async () => {
        const userId = "647f3e52b0e7bb876995c354";
        try {
            const data = await axios.get(
                `http://localhost:5000/user/${userId}`
            );
            if (data && data.data.length) {
                const portfolioData = data.data[0].portfolioId.stocks;
                console.log(portfolioData);
                setPortfolio(portfolioData);
                console.log("fun ", portfolioData);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchPortfolio();
    }, []);
    return (
        <div className="portfolio">
            <MainScreen title="Portfolio">
                {portfolio &&
                    portfolio.map((stock) => (
                        <ListGroup key={stock._id}>
                            <ListGroup.Item className="d-flex justify-content-between align-items-start mt-1">
                                <p>{stock.stockName}</p>
                                <p>{stock.buyPrice.toFixed(2)}</p>
                                <p>{stock.buyQuantity}</p>
                                <p>
                                    {moment(stock.buyDate).format("DD/mm/yyyy")}
                                </p>

                                <Button variant="primary">Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    ))}
                <Link to="/stock">
                    <Button
                        size="lg"
                        variant="dark"
                        className="align-items-start mt-1"
                    >
                        Add Stock
                    </Button>
                </Link>
            </MainScreen>
        </div>
    );
};

export default Portfolio;
