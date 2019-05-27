const express = require("express");
const influx = require("../../config/db");
const router = express.Router();


router.get("/", (req, res) => {
	influx.getDatabaseNames()
		.then(names => {
			res.json({success: true, data: names})
		})
});

router.get("/all", (req, res) => {
	influx.query("select * from motion; select * from orientation; select * from light")
		.catch(err => {
			console.log(err);
			res.json({success: false, message: "Could not get measurements", data: err});
		})
		.then(result => {
			res.json(result);
		})
});

router.get("/:measurement", (req, res) => {
	influx.query(`select * from ${req.params.measurement}`)
		.catch(err => {
			console.log(err);
			res.json({success: false, message: "Could not get measurements", data: err});
		})
		.then(result => {
			res.json({length: result.length, data: result});
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

router.put("/", (req, res) => {
	influx.writePoints(req.body.data, {database: "sensor", precision: "ms"})
		.then(() => {
			res.json("Added measurement.");
		})
		.catch(err => {
			console.error("Could not save measurement to database.");
			console.error(err);
			res.status(500).json({success: false, message: "Could not save measurement", data: err});
		})
});

module.exports = router;