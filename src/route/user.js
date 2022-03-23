const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");

const Users = require("../model/user");
const authMiddleware = require("../middleware/auth");

// check access token
route.get("/", authMiddleware.verifyToken, async (req, res) => {
	try {
		const user = await Users.findById(req.userId).select("-password");
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: "User is not found" });

		return res.status(200).json({ success: true, user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
});

route.post("/register", async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(400)
			.json({ success: false, message: "Username and password are required" });
	}

	const user = await Users.findOne({ username });
	if (user) {
		return res
			.status(400)
			.json({ success: false, message: "User already exists" });
	}

	const newUser = new Users({ username, password });
	await newUser.save();

	// JWT
	const accessToken = jwt.sign(
		{ userId: newUser._id },
		process.env.ACCESS_TOKEN_SECRET
	);
	res.status(200).json({ success: true, accessToken });
});

route.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).json({
				success: false,
				message: "Username and password are required",
			});
		}

		const user = await Users.findOne({ username });
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		if (password !== user.password) {
			return res
				.status(400)
				.json({ success: false, message: "Incorrect password" });
		}

		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		);
		return res.status(200).json({ success: true, accessToken });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server interval" });
	}
});

module.exports = route;
