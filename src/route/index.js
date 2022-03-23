const express = require("express");
const route = express.Router();

const userRoute = require("./user");
const postRoute = require("./post");
const authMiddleware = require("../middleware/auth");

route.get("/", (req, res) => {
	res.send("route");
});

route.use("/user", userRoute);
route.use("/post", authMiddleware.verifyToken, postRoute);

module.exports = route;
