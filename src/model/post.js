const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = require("./user");

const PostSchema = new Schema({
	title: {
		type: "String",
		require: true,
	},
	des: {
		type: "String",
		default: "",
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: user,
	},
});

module.exports = mongoose.model("posts", PostSchema);
