import axios from "axios";

/**
 *
 * @param data in the form of {motionData: [{accX: Float, accY: Float, accZ: Float, time: Timestamp}]}
 */
export const uploadData = data => {
	console.log("Uploading data");
	console.log(data);

	axios.put("/api/sensor/", data)
		.then(res => {
			console.log("Successfully send data to backend");
			console.log(res);
		})
		.catch(err => {
			console.log("Error sending data to backend");
			console.log(err)
		});
};