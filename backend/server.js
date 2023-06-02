const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

require("./connection.js"); // this import statement will connect our server to db
app.use(express.json()); // this allows our application to use json data

const sectorRoutes = require("./routes/sector.routes");

app.use("/sector", sectorRoutes);

app.listen(5000, console.log(`Server listening at http://localhost:${PORT}`));
