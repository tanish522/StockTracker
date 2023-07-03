const Stock = require("../models/stock");
const axios = require("axios");

const insertStocks = async (req, res) => {
    try {
        // creating object for document/data;
        // save() - inserting document/data

        const body = new Stock(req.body); // sending body data in json obj format
        const result = await body.save();
        req.send(result);
    } catch (error) {
        console.log(error);
    }
};

const getStocks = async (req, res) => {
    try {
        const result = await axios.get(
            "https://latest-stock-price.p.rapidapi.com/price",

            {
                params: { Indices: "NIFTY 50" },
                headers: {
                    "X-RapidAPI-Key":
                        "f2a1333252mshb052c7a1d80313bp18b765jsn977d57c509bc",
                    "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
                },
            }
        );
        result.data.splice(0, 1);
        console.log(result.data);
        res.send(result.data);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertStocks,
    getStocks,
};
