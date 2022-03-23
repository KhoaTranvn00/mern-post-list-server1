const mongoose = require("mongoose");

async function connect() {
	try {
		await mongoose.connect(
			"mongodb+srv://anhkhoacttv:05012000@cluster0.gtkea.mongodb.net/TodoList?retryWrites=true&w=majority",
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		);
		console.log("Connect Successfully!!");
	} catch (error) {
		console.log("Connect Fail!!!!!!!!", error);
	}
}

module.exports = { connect };
