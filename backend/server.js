const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send({ name: "tabd", age: 39 });
});

app.listen(5000, console.log(`Server listening at http://localhost:${PORT}`));
