import { React, useState, useEffect } from "react";
import MainScreen from "../components/MainScreen";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Route, Routes } from "react-router-dom";
import Portfolio from "./Portfolio";

const AddStocks = () => {
    const [stocks, setStock] = useState([]);
    const [selectedStock, setSelectedStock] = useState([""]);
    const [data, setData] = useState({
        stockName: "",
        buyPrice: "",
        buyQuantity: "",
        buyDate: "",
    });
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    // Modal functions
    const handleClose = () => {
        clearForm();
        setShow(false);
    };
    const handleShow = () => {
        clearForm();
        setShow(true);
    };

    // Form functions
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setData({ ...data, [name]: value, stockName: selectedStock });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const portfolioData = await fetchPortfolio();
        console.log("portfolioData ", portfolioData);
        let isStockExists = false;
        for (var i = 0; i < portfolioData.stocks.length; i++) {
            // when stock already exists in portfolio
            if (portfolioData.stocks[i].stockName === selectedStock) {
                const existingStock = portfolioData.stocks[i];

                let avgQty =
                    Number(data.buyQuantity) +
                    Number(existingStock.buyQuantity);
                console.log("avg quantity ", avgQty);
                let avgPrice =
                    (Number(existingStock.buyPrice) * Number(data.buyQuantity) +
                        Number(data.buyPrice) *
                            Number(existingStock.buyQuantity)) /
                    avgQty;
                console.log("avg price ", avgPrice);
                setData({
                    ...data,
                    buyPrice: avgPrice,
                    buyQuantity: avgQty,
                });
                portfolioData.stocks[i] = {
                    ...data,
                    buyPrice: avgPrice,
                    buyQuantity: avgQty,
                };
                isStockExists = true;
                break;
            }
        }
        if (isStockExists === false) {
            portfolioData.stocks.push(data);
        }
        await axios.put(
            `http://localhost:5000/portfolio/addStock/${portfolioData._id}`,
            portfolioData
        );
        handleClose();
        navigateToPortfolio();
    };
    const navigateToPortfolio = () => {
        // 👇️ navigate to /portfolio
        navigate("/portfolio");
    };
    const openForm = (stockName) => () => {
        setSelectedStock(stockName);
        handleShow();
    };
    const clearForm = () => {
        setData({
            stockName: "",
            buyPrice: "",
            buyQuantity: "",
            buyDate: "",
        });
    };

    // to fetch stock list from db
    const fetchStock = async () => {
        const data = await axios.get("http://localhost:5000/stock");
        // data.data.sort((a, b) => {
        //     return a.symbol - b.symbol;
        // });
        data.data.sort(dynamicSort("symbol"));
        console.log(data.data);
        setStock(data.data);
    };
    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result =
                a[property] < b[property]
                    ? -1
                    : a[property] > b[property]
                    ? 1
                    : 0;
            return result * sortOrder;
        };
    }

    // to fetch portfolio from db
    const fetchPortfolio = async () => {
        const userId = "647f3e52b0e7bb876995c354";

        try {
            const data = await axios.get(
                `http://localhost:5000/user/${userId}`
            );
            if (data && data.data.length) {
                const portfolioData = data.data[0].portfolioId;
                console.log(portfolioData);
                return portfolioData;
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect will call everytime our page is loaded
    useEffect(() => {
        fetchStock();
    }, []);

    return (
        <div className="stock">
            <MainScreen title="Stocks">
                <div>
                    {stocks.map((stock) => (
                        <ListGroup key={stock.symbol}>
                            <ListGroup.Item className="d-flex justify-content-between align-items-start-baseline mt-1">
                                <div>
                                    <p style={{ margin: 0 }}>
                                        {" "}
                                        Symbol: {stock.symbol}
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        {" "}
                                        Price: {stock.previousClose}
                                    </p>
                                </div>
                                <span style={{ display: "flex" }}>
                                    <Button
                                        variant="secondary"
                                        size="md"
                                        className="me-2"
                                    >
                                        More Details
                                    </Button>
                                    <Button
                                        variant="success"
                                        onClick={openForm(stock.symbol)}
                                        size="md"
                                    >
                                        Add Stock
                                    </Button>
                                </span>
                            </ListGroup.Item>
                        </ListGroup>
                    ))}
                    <Modal
                        show={show}
                        onHide={handleClose}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Enter Stock Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-2"
                                    controlId="formBuyPrice"
                                >
                                    <Form.Label>Stock Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="stockName"
                                        onChange={handleChange}
                                        value={selectedStock}
                                        disabled
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-2"
                                    controlId="formBuyPrice"
                                >
                                    <Form.Label>Buy Price</Form.Label>
                                    <Form.Control
                                        required
                                        autoFocus
                                        type="number"
                                        placeholder="Enter price"
                                        name="buyPrice"
                                        onChange={handleChange}
                                        value={data.buyPrice}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-2"
                                    controlId="formBuyQuantity"
                                >
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Enter quantity"
                                        name="buyQuantity"
                                        onChange={handleChange}
                                        value={data.buyQuantity}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-2"
                                    controlId="formBuyDate"
                                >
                                    <Form.Label>Investment Date</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        placeholder="Enter date"
                                        name="buyDate"
                                        onChange={handleChange}
                                        value={data.buyDate}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                            <Button
                                variant="dark"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Routes>
                        <Route path="/portfolio" element={<Portfolio />} />
                    </Routes>
                </div>
            </MainScreen>
        </div>
    );
};

export default AddStocks;
