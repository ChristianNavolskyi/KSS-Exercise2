import {uploadData} from "./actions/sensorActions";

const motionEvent = "devicemotion";
const lightEvent = "devicelight";
const orientationEvent = "deviceorientation";

let motion = [];
let light = [];
let orientation = [];

let counter = 1;

let context = "";
let name = "";

const handleMotionEvent = (event) => {
	if (motion.length > counter) {
		const data = {data: [...motion]};
		motion = [];

		uploadData(data);
	}

	motion = [...motion, {
		measurement: "motion",
		tags: {
			context: context,
			subject: name
		},
		fields: {
			accelerationX: event.acceleration.x,
			accelerationY: event.acceleration.y,
			accelerationZ: event.acceleration.z
		},
		timestamp: Date.now()
	}];
};

const handleLightEvent = (event) => {
	if (light.length > counter) {
		const data = {data: [...light]};
		light = [];

		uploadData(data);
	}

	light = [...light, {
		measurement: "light",
		tags: {
			context: context,
			subject: name
		},
		fields: {
			value: event.value
		},
		timestamp: Date.now()
	}];
};

const handleOrientationEvent = (event) => {
	if (orientation.length > counter) {
		const data = {data: [...orientation]};
		orientation = [];

		uploadData(data);
	}

	orientation = [...orientation, {
		measurement: "orientation",
		tags: {
			context: context,
			subject: name
		},
		fields: {
			absolute: event.absolute,
			alpha: event.alpha,
			beta: event.beta,
			gamma: event.gamma
		},
		timestamp: Date.now()
	}];
};

export const enableDeviceEvents = (context_arg, name_arg) => {
	let result = [];
	context = context_arg;
	name = name_arg;

	if (window.DeviceMotionEvent) {
		window.addEventListener(motionEvent, handleMotionEvent);
		console.log("Added motion event listener");
		result = [...result, {name: "motion", active: true}]
	} else {
		result = [...result, {name: "motion", active: false}]
	}

	if (window.DeviceLightEvent) {
		window.addEventListener(lightEvent, handleLightEvent);
		console.log("Added light event listener");
		result = [...result, {name: "light", active: true}]
	} else {
		result = [...result, {name: "light", active: false}]
	}

	if (window.DeviceOrientationEvent) {
		window.addEventListener(orientationEvent, handleOrientationEvent);
		console.log("Added orientation event listener");
		result = [...result, {name: "orientation", active: true}]
	} else {
		result = [...result, {name: "orientation", active: false}]
	}

	return result
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
