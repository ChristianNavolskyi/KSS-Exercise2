import { uploadData } from "./actions/sensorActions";

const motionEvent = "devicemotion";
const lightEvent = "devicelight";
const orientationEvent = "deviceorientation";

let motion = [];
let light = [];
let orientation = [];

const handleMotionEvent = (context, name, event) => {
	console.log(context);
	console.log(name);
	console.log(event);

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

	if (motion.length > 50) {
		const data = { data: [...motion] };
		motion = [];

		uploadData(data);
	}
};

const handleLightEvent = (context, name, event) => {
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

	if (light.length > 50) {
		const data = { data: [...light] };
		light = [];

		uploadData(data);
	}
};

const handleOrientationEvent = (context, name, event) => {
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

	if (orientation.length > 50) {
		const data = { data: [...orientation] };
		orientation = [];

		uploadData(data);
	}
};

export const enableDeviceEvents = (context, name) => {
	let result = [];

	if (window.DeviceMotionEvent) {
		window.addEventListener(motionEvent, (evt) => handleMotionEvent(context, name, evt));
		console.log("Added motion event listener");
		result = [...result, { name: "motion", active: true }]
	} else {
		result = [...result, { name: "motion", active: false }]
	}

	if (window.DeviceLightEvent) {
		window.addEventListener(lightEvent, (evt) => handleLightEvent(context, name, evt));
		console.log("Added light event listener");
		result = [...result, { name: "light", active: true }]
	} else {
		result = [...result, { name: "light", active: false }]
	}

	if (window.DeviceOrientationEvent) {
		window.addEventListener(orientationEvent, (evt) => handleOrientationEvent(context, name, evt));
		console.log("Added orientation event listener");
		result = [...result, { name: "orientation", active: true }]
	} else {
		result = [...result, { name: "orientation", active: false }]
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
