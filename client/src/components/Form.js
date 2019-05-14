import React, {Component} from "react";
import {Form, FormGroup, Label, Input} from "reactstrap";
import {Grid, Cell} from "styled-css-grid";


const motionEvent = "devicemotion";

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
			window.addEventListener(motionEvent, this.handleDeviceOrientation);
			this.setText("Enabled");
		} else {
			this.setText("Device motion events not supported");
		}
	};

	disableDeviceMotionListener = () => {
		if (window.DeviceMotionEvent) {
			window.removeEventListener(motionEvent, this.handleDeviceOrientation);
			this.setText("Disabled");
		} else {
			this.setText("Device motion events not supported");
		}
	};

	handleDeviceOrientation = (window, event) => {
		document.trigger(motionEvent);
		this.setText(event.acceleration.x);
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
						<label className="switch">
							<input type="checkbox" onClick={this.handleChange}/>
							<span className="slider round"/>
						</label>
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