const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sensors = require("./routes/api/sensor");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());


// Routes
app.use("/api/sensor", sensors);


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.info(`Server started on port ${port}`));
