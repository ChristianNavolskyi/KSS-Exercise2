import axios from "axios";

/**
 *
 * @param motionData in the form of {motionData: [{accX: Float, accY: Float, accZ: Float, time: Timestamp}]}
 */
export const uploadMotionData = motionData => {
	axios.put("http://localhost:5000/api/sensor/motion", motionData)
		.then(res => {
			console.log("Successfully send data to backend");
			console.log(res);
		})
		.catch(err => {
			console.error("Error sending data to backend");
			console.error(err)
		});
};