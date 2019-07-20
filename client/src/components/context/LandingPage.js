import React, {Component} from "react";
import {svm} from "../../classifier/linear_svm"
import {disableDeviceEvents, enableDeviceEvents} from "../../Sensors";
import {Walking} from "./Walking";
import {Sitting} from "./Sitting";

export class LandingPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			motionStore: [],
			orientationStore: [],
			timeBetweenClassifications: 5000,
			classifications: ["Sitting", "Walking"],
			currentContext: 0,
			accelerationXMean: null,
			accelerationXMin: null,
			accelerationXMax: null,
			accelerationXStd: null,
			accelerationYMean: null,
			accelerationYMin: null,
			accelerationYMax: null,
			accelerationYStd: null,
			accelerationZMean: null,
			accelerationZMin: null,
			accelerationZMax: null,
			accelerationZStd: null,
			combinedMean: null,
			combinedMin: null,
			combinedMax: null,
			combinedStd: null,
			alphaMean: null,
			alphaStd: null,
			betaMean: null,
			betaStd: null,
			gammaMean: null,
			gammaStd: null
		};
	}

	componentDidMount() {
		console.log("Enable Events");
		enableDeviceEvents("Classifying", "NoName", this.combineDeviceEvents)
	}

	componentWillUnmount() {
		console.log("Disable Events");
		disableDeviceEvents()
	}

	static getTimeDiff(dataArray) {
		const firstDate = dataArray[0].time;
		const lastDate = dataArray[dataArray.length - 1].time;
		return lastDate - firstDate;
	}

	combineDeviceEvents = (data) => {
		console.log("combine device events");

		let diff;
		const sensorData = data.data;
		const fields = sensorData.map(entry => {
			return {measurements: entry.fields, time: entry.timestamp}
		});


		if (sensorData[0].measurement === "motion") {
			this.setState({motionStore: [...this.state.motionStore, ...fields]});
			diff = LandingPage.getTimeDiff(this.state.motionStore);

			if (diff > this.state.timeBetweenClassifications) {
				this.setMotionFeatures();
				this.setState({
					motionStore: []
				})
			}
		} else if (sensorData[0].measurement === "orientation") {
			this.setState({orientationStore: [...this.state.orientationStore, ...fields]});
			diff = LandingPage.getTimeDiff(this.state.orientationStore);

			if (diff > this.state.timeBetweenClassifications) {
				this.setOrientationFeatures();
				this.setState({
					orientationStore: []
				})
			}
		}

		if (diff > this.state.timeBetweenClassifications) {
			this.triggerClassification()
		}
	};

	triggerClassification() {
		if (this.state.accelerationXMean != null && this.state.alphaMean != null) {
			const features = [this.state.accelerationXMean, this.state.accelerationXMin, this.state.accelerationXMax, this.state.accelerationXStd,
				this.state.accelerationYMean, this.state.accelerationYMin, this.state.accelerationYMax, this.state.accelerationYStd,
				this.state.accelerationZMean, this.state.accelerationZMin, this.state.accelerationZMax, this.state.accelerationZStd,
				this.state.combinedMean, this.state.combinedMin, this.state.combinedMax, this.state.combinedStd,
				this.state.alphaMean, this.state.alphaStd,
				this.state.betaMean, this.state.betaStd,
				this.state.gammaMean, this.state.gammaStd];

			const prediction = svm.predict(features);

			this.setState({
				currentContext: prediction,
				accelerationXMean: null,
				accelerationXMin: null,
				accelerationXMax: null,
				accelerationXStd: null,
				accelerationYMean: null,
				accelerationYMin: null,
				accelerationYMax: null,
				accelerationYStd: null,
				accelerationZMean: null,
				accelerationZMin: null,
				accelerationZMax: null,
				accelerationZStd: null,
				combinedMean: null,
				combinedMin: null,
				combinedMax: null,
				combinedStd: null,
				alphaMean: null,
				alphaStd: null,
				betaMean: null,
				betaStd: null,
				gammaMean: null,
				gammaStd: null
			});
		}
	}

	setOrientationFeatures() {
		console.log("setting orientation features");

		const apply = (fun, ...values) => ({
			alpha: fun(...values.map(({alpha}) => alpha)),
			beta: fun(...values.map(({beta}) => beta)),
			gamma: fun(...values.map(({gamma}) => gamma)),
		});

		const measurements = this.state.orientationStore.map(entry => ({
			alpha: entry.measurements.alpha,
			beta: entry.measurements.beta,
			gamma: entry.measurements.gamma
		}));
		const length = measurements.length;

		const sums = measurements.reduce((acc, entry) => apply((a, e) => a + e, acc, entry));
		const means = apply((a) => a / length, sums);
		const squaredDiffs = measurements.reduce((acc, entry) => apply((a, e, m) => a + Math.pow(e - m, 2), acc, entry, means));
		const stds = apply((v) => Math.sqrt(v), squaredDiffs);

		this.setState({
			alphaMean: means.alpha,
			alphaStd: stds.alpha,
			betaMean: means.beta,
			betaStd: stds.beta,
			gammaMean: means.gamma,
			gammaStd: stds.gamma
		});
	}

	setMotionFeatures() {
		console.log("setting motion features");

		const apply = (fun, ...values) => ({
			x: fun(...values.map(({x}) => x)),
			y: fun(...values.map(({y}) => y)),
			z: fun(...values.map(({z}) => z)),
			c: fun(...values.map(({c}) => c))
		});

		const getExtreme = (acc, entry, comparator) => {
			if (comparator(acc, entry)) {
				return entry;
			} else {
				return acc;
			}
		};

		const measurements = this.state.motionStore.map(entry => ({
			x: entry.measurements.accelerationX,
			y: entry.measurements.accelerationY,
			z: entry.measurements.accelerationZ,
			c: entry.measurements.accelerationX + entry.measurements.accelerationY + entry.measurements.accelerationZ
		}));

		const length = measurements.length;

		const sums = measurements.reduce((acc, entry) => apply((a, e) => a + e, acc, entry));
		const means = apply((a) => a / length, sums);
		const mins = measurements.reduce((acc, entry) => apply((a, e) => getExtreme(a, e, (first, second) => first > second), acc, entry));
		const maxs = measurements.reduce((acc, entry) => apply((a, e) => getExtreme(a, e, (first, second) => first < second), acc, entry));
		const squaredDiffs = measurements.reduce((acc, entry) => apply((a, e, m) => a + Math.pow(e - m, 2), acc, entry, means));
		const stds = apply((v) => Math.sqrt(v / length), squaredDiffs);

		this.setState({
			accelerationXMean: sums.x,
			accelerationXMin: mins.x,
			accelerationXMax: maxs.x,
			accelerationXStd: stds.x,
			accelerationYMean: means.y,
			accelerationYMin: mins.y,
			accelerationYMax: maxs.y,
			accelerationYStd: stds.y,
			accelerationZMean: means.z,
			accelerationZMin: mins.z,
			accelerationZMax: maxs.z,
			accelerationZStd: stds.z,
			combinedMean: means.c,
			combinedMin: mins.c,
			combinedMax: maxs.c,
			combinedStd: stds.c
		});
	}

	render() {
		const current = this.state.currentContext;
		let context;

		if (current === 0) {
			context = <Sitting/>
		} else {
			context = <Walking/>
		}

		return (
			<div>
				{context}
			</div>
		);
	}
}