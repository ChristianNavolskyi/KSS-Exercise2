import axios from "axios";

/**
 *
 * @param data in the form of {motionData: [{accX: Float, accY: Float, accZ: Float, time: Timestamp}]}
 */
export const uploadData = data => {
	console.log("Uploading data");

	axios.put("http://localhost:5000/api/sensor/", data)
		.then(res => {
			console.log("Successfully send data to backend");
			console.log(res);
		})
		.catch(err => {
			console.error("Error sending data to backend");
			console.error(err)
		});
};