import { React, useState, useEffect } from "react";
import MainScreen from "../components/MainScreen";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./Portfolio.css";
import moment from "moment";

import DataTable from "react-data-table-component";

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
                setPortfolio(portfolioData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            name: "Stock",
            selector: (row) => row.stockName,
            sortable: true,
        },
        {
            name: "Buy Price",
            selector: (row) => row.buyPrice.toFixed(2),
            sortable: true,
        },
        {
            name: "Quantity",
            selector: (row) => row.buyQuantity,
            sortable: true,
        },
        {
            name: "Total Investment",
            selector: (row) => row.buyPrice * row.buyQuantity,
            sortable: true,
        },
        {
            name: "Buy Date",
            selector: (row) => moment(row.buyDate).format("MM/DD/YYYY"),
        },
        {
            name: "Actions",
            cell: (row) => (
                <span>
                    <Button variant="primary" size="sm" className="me-2">
                        Edit
                    </Button>
                    <Button variant="danger" size="sm" className="me-2">
                        Delete
                    </Button>
                </span>
            ),
        },
    ];

    useEffect(() => {
        fetchPortfolio();
    }, []);
    return (
        <div className="portfolio">
            <MainScreen title="Portfolio">
                <DataTable
                    columns={columns}
                    data={portfolio}
                    pagination
                    fixedHeader
                    highlightOnHover
                ></DataTable>

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
