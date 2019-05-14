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

router.put("/motion", (req, res) => {
	const time = req.body.time;
	const accelerationX = req.body.accX;
	const accelerationY = req.body.accY;
	const accelerationZ = req.body.accZ;
	const source = req.body.source;

	influx.writePoints([
			{
				measurement: "motion",
				fields: {
					accelerationX: accelerationX,
					accelerationY: accelerationY,
					accelerationZ: accelerationZ,
					time: time
				},
				tags: {
					source: source
				}
			}
		],
		{
			database: "sensor"
		})
		.then(() => {
			console.log("Successfully added measurement to database.");
			req.json("Added measurement.");
		})
		.catch(err => {
			console.error("Could not save measurement to database.");
			console.error(err);
			res.status(500).json({success: false, message: "Could not save measurement", data: err});
		})
});


// @route 	POST api/users
// @desc 	Create a user
// @access 	Public
router.put("/", (req, res) => {

	User.updateOne(
		{_id: req.params.id},
		{"$push": {"breath": breath}})
		.then(result => {
			res.status(201).json({success: true, message: "Breath value appended successfully", data: result});
			notifyDataAdded(req.params.id);
			pusher.trigger(channel, "breath-value-added", {
				id: req.params.id,
				breath: breath
			})
		})
		.catch(err => res.status(500).json({success: false, message: "Could not append value", data: err}));
});

module.exports = router;