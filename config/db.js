const Influx = require("influx");

const influx = new Influx.InfluxDB({
	host: "localhost",
	database: "sensor",
	port: 8086,

	schema: [
		{
			measurement: "motion",
			fields: {
				accelerationX: Influx.FieldType.FLOAT,
				accelerationY: Influx.FieldType.FLOAT,
				accelerationZ: Influx.FieldType.FLOAT
			},
			tags: ["source"]
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