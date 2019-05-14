const express = require("express");
const influx = require("../../config/db");
const router = express.Router();


router.get("/", (req, res) => {
	influx.getDatabaseNames()
		.then(names => {
			res.json({success: true, data: names})
		})
});

router.get("/:measurement", (req, res) => {
	influx.query(`select * from ${req.params.measurement}`)
		.catch(err => {
			console.log(err);
			res.json({success: false, message: "Could not get measurements", data: err});
		})
		.then(result => {
			res.json(result);
		})
});

router.delete("/", (req, res) => {
	influx.dropDatabase("sensor")
		.then(value => {
			console.log(value);
			influx.createDatabase("sensor");
			res.json({success: true, message: "Successfully cleared sensor database", data: value});
		})
		.catch(err => {
			res.status(500).json({success: false, message: "Error dropping database sensor", data: err});
		})
});

router.put("/motion", (req, res) => {
	let points = [];

	if ("motionData" in req.body) {
		req.body.motionData.forEach(data => {
			const entry = {
				measurement: "motion",
				fields: {
					accelerationX: data.accX,
					accelerationY: data.accY,
					accelerationZ: data.accZ
				},
				timestamp: data.time
			};

			points = [...points, entry];
		});
	}

	console.log(points);

	influx.writePoints(points, {database: "sensor", precision: "ms"})
		.then(() => {
			console.log("Successfully added measurement to database.");
			res.json("Added measurement.");
		})
		.catch(err => {
			console.error("Could not save measurement to database.");
			console.error(err);
			res.status(500).json({success: false, message: "Could not save measurement", data: err});
		})
});


module.exports = router;