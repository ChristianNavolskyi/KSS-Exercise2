const express = require("express");
const influx = require("../../config/db");

module.exports = class Sensor {

	constructor(host, port) {
		this.db = influx(host, port);
		this.router = express.Router();
		this.setup();
	}

	setup() {
		this.router.get("/", (req, res) => {
			this.db.getDatabaseNames()
				.then(names => {
					res.json({success: true, data: names})
				})
		});

		this.router.get("/all", (req, res) => {
			this.db.query("select * from motion; select * from orientation; select * from light")
				.catch(err => {
					console.log(err);
					res.json({success: false, message: "Could not get measurements", data: err});
				})
				.then(result => {
					res.json(result);
				})
		});

		this.router.get("/:measurement", (req, res) => {
			this.db.query(`select * from ${req.params.measurement}`)
				.catch(err => {
					console.log(err);
					res.json({success: false, message: "Could not get measurements", data: err});
				})
				.then(result => {
					res.json({length: result.length, data: result});
				})
		});

		this.router.delete("/", (req, res) => {
			if (req.body.password === process.env.PASSWORD) {
				this.db.dropDatabase("sensor")
					.then(value => {
						console.log(value);
						this.db.createDatabase("sensor");
						res.json({success: true, message: "Successfully cleared sensor database", data: value});
					})
					.catch(err => {
						res.status(500).json({success: false, message: "Error dropping database sensor", data: err});
					})
			} else {
				res.json({success: false, message: "Please provide the correct password or stop bothering me!"});
			}
		});

		this.router.put("/", (req, res) => {
			this.db.writePoints(req.body.data, {database: "sensor", precision: "ms"})
				.then(() => {
					res.json("Added measurement.");
				})
				.catch(err => {
					console.error("Could not save measurement to database.");
					console.error(err);
					res.status(500).json({success: false, message: "Could not save measurement", data: err});
				})
		});
	}
};