const Influx = require("influx");

const influx = new Influx.InfluxDB({
	host: "18.197.100.138",
	database: "sensor",
	port: 80,

	schema: [
		{
			measurement: "motion",
			tags: [
				"context",
				"subject"
			],
			fields: {
				accelerationX: Influx.FieldType.FLOAT,
				accelerationY: Influx.FieldType.FLOAT,
				accelerationZ: Influx.FieldType.FLOAT
			}
		},
		{
			measurement: "light",
			tags: [
				"context",
				"subject"
			],
			fields: {
				value: Influx.FieldType.FLOAT
			}
		},
		{
			measurement: "orientation",
			tags: [
				"context",
				"subject"
			],
			fields: {
				absolute: Influx.FieldType.BOOLEAN,
				alpha: Influx.FieldType.FLOAT,
				beta: Influx.FieldType.FLOAT,
				gamma: Influx.FieldType.FLOAT,
			}
		}
	]
});

influx.getDatabaseNames()
	.then(names => {
		if (!names.includes("sensor")) {
			console.log("Creating new database");
			return influx.createDatabase("sensor");
		}
	})
	.catch(err => {
		console.error("Error opening database");
		console.error(err);
	});

module.exports = influx;