const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

require("./connection.js"); // this import statement will connect our server to db
app.use(express.json()); // this allows our application to use json data
app.use(cors()); // it enables CORS (cross-origin resource sharing). In order for your server to be accessible by other origins (domains).

const sectorRoutes = require("./routes/sector.routes");
const userRoutes = require("./routes/user.routes.js");
const stockRoutes = require("./routes/stock.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const portfolioRoutes = require("./routes/portfolio.routes.js");

app.use("/sector", sectorRoutes);
app.use("/user", userRoutes);
app.use("/stock", stockRoutes);
app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes);

app.listen(5000, console.log(`Server listening at http://localhost:${PORT}`));
