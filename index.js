const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const db = require("./config/db");
const route = require("./src/route");
const PORT = 4000;

db.connect();

app.use(cors());
app.use(express.json()); // for parsing application/json

app.use("/api", route);

app.listen(PORT, () => {
	console.log(`Server running in port ${PORT}`);
});
