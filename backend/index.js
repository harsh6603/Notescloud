const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 5000
dotenv.config({ path: "../.env" });

//database connection
require("./db");

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}));

app.get("/", (req, res) => {
    res.send("Hello");
})

app.use('/api/user', require("./modules/routes/routeUser"));
app.use('/api/note', require("./modules/routes/routeNote"));

app.listen(port, () => {
    console.log("Server connected");
})