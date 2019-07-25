import React, {Component} from "react";
import {Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {Grid, Row, Col} from "react-flexbox-grid";
import {disableDeviceEvents, enableDeviceEvents} from "../Sensors";
import {uploadData} from "../actions/sensorActions";


const contexts = ["Sitting", "Standing", "Walking", "Lying", "Testing"];
const defaultContext = "Context";

export class SamplingForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			active: false,
			dropdownOpen: false,
			currentContext: defaultContext,
			activeSensors: ""
		};
	}

	selectContext = (context) => {
		if (this.state.active) {
			this.disableDeviceMotionListener();
		}

		this.setState({
			currentContext: context
		});
	};

	toggleDropDown = () => {
		if (this.state.active) {
			this.disableDeviceMotionListener();
		}

		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	};

	handleChange = () => {
		const newState = !this.state.active;

		if (newState && this.state.currentContext !== defaultContext && this.state.name !== "") {
			this.enableDeviceMotionListener();
		} else {
			this.disableDeviceMotionListener();
		}
	};

	onNameChange = (evt) => {
		if (this.state.active) {
			this.disableDeviceMotionListener();
		}

		this.setState({
			name: evt.target.value
		});
	};

	enableDeviceMotionListener = () => {
		const result = enableDeviceEvents(this.state.currentContext, this.state.name, uploadData);
		let resultString = "";

		result.forEach(sensor => {
			if (sensor.active) {
				resultString = resultString + sensor.name + " ";
			}
		});

		resultString = resultString.trim();

		this.setState({
			activeSensors: resultString,
			active: true
		});
	};

	disableDeviceMotionListener = () => {
		disableDeviceEvents();

		this.setState({
			activeSensors: "",
			active: false
		});
	};

	render() {
		return (
			<div style={{marginTop: "2rem"}}>
				<Grid fluid>
					<Row center={"xs"}>
						<Col xs={10} lg={10}>
							<Label for="name">
								Name:
								<Input name="name" id="name" placeholder="Type your name here" value={this.state.name} onChange={this.onNameChange}/>
							</Label>
						</Col>
					</Row>
					<Row center={"xs"}>
						<Col xs>
							Context:
							<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
								<DropdownToggle caret>
									{this.state.currentContext}
								</DropdownToggle>
								<DropdownMenu>
									{contexts.map(context => {
										return (<DropdownItem onClick={() => this.selectContext(context)} key={context}>{context}</DropdownItem>)
									})}
								</DropdownMenu>
							</Dropdown>
						</Col>
						<Col xs>
							Sampling:<br/>
							<label className="switch">
								<input type="checkbox" onChange={this.handleChange} checked={this.state.active}/>
								<span className="slider round"/>
							</label>
						</Col>
					</Row>
					<Row center={"xs"}>
						<Col xs>
							Sampling: {this.state.activeSensors}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}