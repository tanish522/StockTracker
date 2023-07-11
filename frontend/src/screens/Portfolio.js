import { React, useState, useEffect } from "react";
import MainScreen from "../components/MainScreen";
import { Link } from "react-router-dom";
import { Button, Modal, Form, Card } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]); // stocks inside portfolio
    const [portfolioDetails, setPortfolioDetails] = useState({}); // user portfolio details
    const [data, setData] = useState({
        stockName: "",
        buyPrice: "",
        buyQuantity: "",
        buyDate: "",
    }); // store edit data
    const [show, setShow] = useState(false); // for modal
    const [totalPnL, setTotalPnL] = useState(0);
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [pnLPercentage, setPnLPercentage] = useState(0);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [validated, setValidated] = useState(false);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    // to fetch portfolio from db
    const fetchPortfolio = async () => {
        const userId = "647f3e52b0e7bb876995c354";
        try {
            const data = await axios.get(
                `http://localhost:5000/user/${userId}`
            );
            if (data && data.data.length) {
                let portfolioStocks = data.data[0].portfolioId.stocks;
                setPortfolioDetails(data.data[0].portfolioId);
                await addCurrStockPriceAndDate(portfolioStocks);
            }
        } catch (error) {
            console.log("===> ", error);
        }
    };
    const addCurrStockPriceAndDate = async (portfolioData) => {
        try {
            const stockData = await axios.get("http://localhost:5000/stock"); // stocks historical data
            portfolioData.forEach((item) => {
                stockData.data.forEach((stock) => {
                    if (item.stockName === stock.symbol) {
                        item.currPrice = stock.previousClose;
                        item.buyDate = item.buyDate.substring(0, 10);
                    }
                });
            });
            setPortfolio(portfolioData);
            getPnL(portfolioData);
        } catch (error) {
            console.log(error);
        }
    };

    /* Theme Setting for table */
    const customStyle = {
        headRow: {
            style: {
                fontSize: "medium",
                fontWeight: "bold",
            },
        },
        rows: {
            style: {
                fontSize: "medium",
            },
        },
    };
    const columns = [
        {
            name: "Stock",
            selector: (row) => row.stockName,
            sortable: true,
        },
        {
            name: "Current Price",
            selector: (row) => row.currPrice,
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
            name: "Buy Date",
            selector: (row) => moment(row.buyDate).format("DD-MM-YYYY"),
        },
        {
            name: "Investment",
            selector: (row) => row.buyPrice * row.buyQuantity,
            sortable: true,
        },
        {
            name: "PnL",
            selector: (row) =>
                ((row.currPrice - row.buyPrice) * row.buyQuantity).toFixed(2),
            cell: (row) => {
                const pnl = (
                    (row.currPrice - row.buyPrice) *
                    row.buyQuantity
                ).toFixed(2);
                if (pnl < 0) {
                    return (
                        <div className="minus" style={{ color: "red" }}>
                            {pnl}
                        </div>
                    );
                } else if (pnl >= 0) {
                    return (
                        <div className="plus" style={{ color: "green" }}>
                            {pnl}
                        </div>
                    );
                }
            },
            sortable: true,
            footer: "profit",
        },
        {
            name: "Actions",
            cell: (row) => (
                <span>
                    <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={openForm(row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        className="me-2"
                        onClick={openDeleteConfirmation(row)}
                    >
                        Delete
                    </Button>
                </span>
            ),
        },
    ];

    // Modal funs
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteClose = () => setConfirmDelete(false);
    const deleteShow = () => setConfirmDelete(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // delete existing stock details
            for (var i = 0; i < portfolioDetails.stocks.length; i++) {
                if (portfolioDetails.stocks[i].stockName === data.stockName) {
                    portfolioDetails.stocks.splice(i, 1);
                    break;
                }
            }
            // adding updated stock details
            portfolioDetails.stocks.push(data);
            const result = await axios.put(
                `http://localhost:5000/portfolio/updateStock/${portfolioDetails._id}`,
                portfolioDetails
            );
            handleClose();
            setPortfolio(result.data.stocks);
            await fetchPortfolio();
        }
        setValidated(true);
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setData({ ...data, [name]: value });
    };

    const openForm = (stockDetails) => () => {
        setData(stockDetails);
        handleShow();
    };
    const openDeleteConfirmation = (stockDetails) => () => {
        setData(stockDetails);
        deleteShow();
    };

    const deleteStock = async (selectedStock) => {
        for (var i = 0; i < portfolioDetails.stocks.length; i++) {
            if (portfolioDetails.stocks[i].stockName === selectedStock) {
                portfolioDetails.stocks.splice(i, 1);
                break;
            }
        }
        const result = await axios.put(
            `http://localhost:5000/portfolio/updateStock/${portfolioDetails._id}`,
            portfolioDetails
        );
        deleteClose();
        setPortfolio(result.data.stocks);
        await fetchPortfolio();
    };

    //baki
    const getPnL = (portfolioData) => {
        let pnl = 0,
            investment = 0;
        for (const item of portfolioData) {
            pnl += (item.currPrice - item.buyPrice) * item.buyQuantity;
            investment += item.buyPrice * item.buyQuantity;
        }
        // portfolio.forEach((item) => {
        //     pnl += (item.currPrice - item.buyPrice) * item.buyQuantity;
        //     investment += item.buyPrice * item.buyQuantity;
        // });
        setTotalPnL(pnl);
        setTotalInvestment(investment);
        setCurrentValue(pnl + investment);
        setPnLPercentage((pnl * 100) / investment);
    };
    const objectStyleProfit = {
        color: "green",
        fontSize: "30px",
        margin: "0",
        padding: "0px 20px 0px 20px",
    };
    const objectStyleLoss = {
        color: "Red",
        fontSize: "30px",
        margin: "0",
        padding: "0px 20px 0px 20px",
    };
    const defaulttextStyle = {
        margin: "0",
        padding: "0px 20px 0px 20px",
    };
    const defaultNumberStyle = {
        fontSize: "30px",
        margin: "0",
        padding: "0px 20px 0px 20px",
    };
    const isProfit = true;

    useEffect(() => {
        fetchPortfolio();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="portfolio">
            <MainScreen title="Portfolio">
                <Card>
                    <Card.Body className="d-flex justify-content-between">
                        <div>
                            <p style={defaulttextStyle}>Investment:</p>
                            <p style={defaultNumberStyle}>{totalInvestment}</p>
                        </div>
                        <div>
                            <p style={defaulttextStyle}>Current Value: </p>
                            <p style={defaultNumberStyle}>
                                {currentValue.toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <p style={defaulttextStyle}>Unrealised P&L: </p>
                            <p
                                style={
                                    isProfit
                                        ? objectStyleProfit
                                        : objectStyleLoss
                                }
                                className="d-flex"
                            >
                                {totalPnL.toFixed(2)}{" "}
                                <p
                                    style={{
                                        fontSize: "15px",
                                        margin: "15px 0px 0px 5px",
                                    }}
                                >
                                    ({pnLPercentage.toFixed(2)}%)
                                </p>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
                <DataTable
                    columns={columns}
                    data={portfolio}
                    pagination
                    fixedheader
                    customStyles={customStyle}
                    responsive="true"
                    highlightOnHover
                ></DataTable>

                <Link to="/stock">
                    <Button
                        size="lg"
                        variant="outline-dark"
                        className="align-items-start mt-1"
                    >
                        Add Stock
                    </Button>
                </Link>

                <Modal
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <Form.Group
                                className="mb-2"
                                controlId="formStockName"
                            >
                                <Form.Label>Stock Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="stockName"
                                    onChange={handleChange}
                                    value={data.stockName}
                                    disabled
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field*
                                </Form.Control.Feedback>
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
                                    min="1"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field*
                                </Form.Control.Feedback>
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
                                    min="1"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field*
                                </Form.Control.Feedback>
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
                                    max={today}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Required Field*
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>

                                <Button variant="dark" type="submit">
                                    Submit
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={confirmDelete} onHide={deleteClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure, do you want to delete {data.stockName}{" "}
                        from portfolio ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={() => deleteStock(data.stockName)}
                        >
                            Yes
                        </Button>
                        <Button variant="primary" onClick={deleteClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </MainScreen>
        </div>
    );
};

export default Portfolio;
