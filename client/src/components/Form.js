import React, {Component} from "react";
import {Form, FormGroup, Label, Input} from "reactstrap";
import {Grid, Cell} from "styled-css-grid";
import {disableDeviceEvents, enableDeviceEvents} from "../Sensors";


class KSSForm extends Component {
	state = {
		active: false
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
		enableDeviceEvents();
		console.log("Enable listeners")
	};

	disableDeviceMotionListener = () => {
		disableDeviceEvents();
		console.log("Disable listeners")
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
						</Grid>
					</Cell>
				</Grid>
			</div>
		);
	}

}

export default KSSForm;