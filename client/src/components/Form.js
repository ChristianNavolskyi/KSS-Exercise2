import React, {Component} from "react";
import {Form, FormGroup, Label, Input} from "reactstrap";
import {Grid, Cell} from "styled-css-grid";
import {uploadMotionData} from "../actions/sensorActions";
import Button from "reactstrap/es/Button";

const motionEvent = "devicemotion";
let motion = [];


const appendMotionData = data => {
	motion = [...motion, data];
};

const addTestData = () => {
	console.log("Adding test data");

	appendMotionData({accX: -1, accY: -1, accZ: -1, time: Date.now()});
};

function sendMotionData() {
	const dataToUpload = {motionData: [...motion]};
	motion = [];

	console.log(dataToUpload);

	uploadMotionData(dataToUpload);
}

class KSSForm extends Component {
	state = {
		active: false,
		text: ""
	};

	handleChange = () => {
		const newState = !this.state.active;

		this.setState({
			active: newState
		});

		if (newState) {
			this.enableDeviceMotionListener();
		} else {
			this.disableDeviceMotionListener();
		}
	};

	enableDeviceMotionListener = () => {
		if (window.DeviceMotionEvent) {
			window.addEventListener(motionEvent, this.handleDeviceMotion);
			this.setText("Enabled");
		} else {
			this.setText("Device motion events not supported");
		}
	};

	disableDeviceMotionListener = () => {
		if (window.DeviceMotionEvent) {
			window.removeEventListener(motionEvent, this.handleDeviceMotion);
			this.setText("Disabled");
		} else {
			this.setText("Device motion events not supported");
		}
	};

	handleDeviceMotion = (window, event) => {
		const acceleration = event.acceleration;
		const motionData = {accX: acceleration.x, accY: acceleration.y, accZ: acceleration.z, time: Date.now()};

		appendMotionData(motionData);

		if (motion.length > 20) {
			sendMotionData();
		}
	};

	setText = (text) => {
		this.setState({
			text: text
		})
	};

	render() {
		return (
			<div>
				<Grid columns={"90%"} justifyContent="center" style={{marginTop: "0.5rem"}}>
					<Cell>
						<Form>
							<FormGroup>
								<Label for="context">Context</Label>
								<Input name="context" id="context" placeholder="Type your context here"/>
							</FormGroup>
						</Form>
					</Cell>
					<Cell>
						<Grid columns={"20% 40% 40%"} justifyContent="space-between">
							<Cell>
								<label className="switch">
									<input type="checkbox" onClick={this.handleChange}/>
									<span className="slider round"/>
								</label>
							</Cell>
							<Cell>
								<Button style={{width: "100%"}} onClick={addTestData}>
									Add test motion
								</Button>
							</Cell>
							<Cell>
								<Button style={{width: "100%"}} onClick={sendMotionData}>
									Upload motion
								</Button>
							</Cell>
						</Grid>
					</Cell>
					<Cell>
						{this.state.text}
					</Cell>
				</Grid>
			</div>
		);
	}

}

export default KSSForm;