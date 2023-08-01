const axios = require("axios");

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
        res.send(result.data);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getStocks,
};
