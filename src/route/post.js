const express = require("express");
const route = express.Router();

const Posts = require("../model/post");

route.post("/add", async (req, res) => {
	const { title, des } = req.body;

	// simple invalid
	if (!title) {
		return res
			.status(401)
			.json({ success: false, message: "Title is require" });
	}

	try {
		const newPost = new Posts({
			title,
			des,
			userId: req.userId,
		});
		await newPost.save();

		return res
			.status(200)
			.json({ success: true, message: "Add post successfully", newPost });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, message: "server interval" });
	}
});

route.get("/", async (req, res) => {
	try {
		const posts = await Posts.find({ userId: req.userId }).populate("userId");
		res
			.status(200)
			.json({ success: true, message: "get post successfully", posts });
	} catch (error) {
		res.status(500).json({ success: false, message: "get post failed" });
	}
});

route.put("/:id", async (req, res) => {
	const { title, des } = req.body;
	const id = req.params.id;
	try {
		let newPost = req.body;
		newPost = await Posts.findOneAndUpdate(
			{ _id: id, userId: req.userId },
			newPost,
			{ new: true }
		).populate("userId");

		return res
			.status(200)
			.json({ success: true, post: newPost, message: "updated successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, message: error.message });
	}
});

route.delete("/:id", async (req, res) => {
	console.log(req.params.id);
	console.log(req.userId);
	try {
		const postDelete = await Posts.findOneAndDelete({
			_id: req.params.id,
			userId: req.userId,
		});

		if (!postDelete) {
			return res
				.status(401)
				.json({ success: false, message: "user not authorized to delete" });
		} else
			return res.status(200).json({ success: true, message: "delete success" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, message: "server interval" });
	}
});

module.exports = route;
