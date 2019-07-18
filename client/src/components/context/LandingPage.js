import React, {Component} from "react";
import {mlpClassifier} from "../../classifier/mlp"
import {disableDeviceEvents, enableDeviceEvents} from "../../Sensors";

class LandingPage extends Component {

	constructor(props) {
		super(props);
		this.classifier = mlpClassifier;
	}

	componentDidMount() {
		enableDeviceEvents("Classifying", "NoName", this.combineDeviceEvents)
	}

	componentWillUnmount() {
		disableDeviceEvents()
	}

	combineDeviceEvents = (data) => {
		// TODO store all data until time difference is reached then call method to reduce into features and classify.
	};

	render() {
		return (
			<div>
				Let's see what you are currently doing...
			</div>
		);
	}
}