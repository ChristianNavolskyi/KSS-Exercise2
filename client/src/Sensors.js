import {uploadData} from "./actions/sensorActions";

const motionEvent = "devicemotion";
const lightEvent = "devicelight";
const orientationEvent = "deviceorientation";

let motion = [];
let light = [];
let orientation = [];

const handleMotionEvent = (window, event) => {
	motion = [...motion, {
		measurement: "motion",
		fields: {
			accelerationX: event.acceleration.x,
			accelerationY: event.acceleration.y,
			accelerationZ: event.acceleration.z
		},
		timestamp: Date.now()
	}];

	if (motion.length > 20) {
		const data = {data: [...motion]};
		motion = [];

		uploadData(data);
	}
};

const handleLightEvent = (window, event) => {
	light = [...light, {
		measurement: "light",
		fields: {
			value: event.value
		},
		timestamp: Date.now()
	}];

	if (light.length > 20) {
		const data = {data: [...light]};
		light = [];

		uploadData(data);
	}
};

const handleOrientationEvent = (window, event) => {
	orientation = [...orientation, {
		measurement: "orientation",
		fields: {
			absolute: event.absolute,
			alpha: event.alpha,
			beta: event.beta,
			gamma: event.gamma
		},
		timestamp: Date.now()
	}];

	if (orientation.length > 20) {
		const data = {data: [...orientation]};
		orientation = [];

		uploadData(data);
	}
};

export const enableDeviceEvents = () => {
	if (window.DeviceMotionEvent) {
		window.addEventListener(motionEvent, handleMotionEvent);
		console.log("Added motion event listener");
	}
	if (window.DeviceLightEvent) {
		window.addEventListener(lightEvent, handleLightEvent);
		console.log("Added light event listener");
	}
	if (window.DeviceOrientationEvent) {
		window.addEventListener(orientationEvent, handleOrientationEvent);
		console.log("Added orientation event listener");
	}
};

export const disableDeviceEvents = () => {
	if (window.DeviceMotionEvent) {
		window.removeEventListener(motionEvent, handleMotionEvent);
		console.log("Removed motion event listener");
	}
	if (window.DeviceLightEvent) {
		window.removeEventListener(lightEvent, handleLightEvent);
		console.log("Removed light event listener");
	}
	if (window.DeviceOrientationEvent) {
		window.removeEventListener(orientationEvent, handleOrientationEvent);
		console.log("Removed orientation event listener");
	}
};
