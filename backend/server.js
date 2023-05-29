const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { insertStocks, getStocks } = require("./controller/stock.controller");
const { insertSector } = require("./controller/sector.controller");
require("./routers/connection.js"); // this import statement will connect our server to db
app.use(express.json()); // this allows our application to use json data

app.post("/stocks", (req, res) => {
    insertStocks();
});

app.get("/stocks", (req, res) => {
    getStocks();
});

app.get("/", (req, res) => {
    getStocks();
    res.send({ name: "tabd", age: 39 });
});

app.listen(5000, console.log(`Server listening at http://localhost:${PORT}`));
