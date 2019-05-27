import React, {Component} from "react";
import {Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {Grid, Row, Col} from "react-flexbox-grid";
import {disableDeviceEvents, enableDeviceEvents} from "../Sensors";


class KSSForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			active: false,
			dropdownOpen: false,
			currentContext: "Context",
			activeSensors: ""
		};
	}

	selectContext = (context) => {
		this.setState({
			currentContext: context
		})
	};

	toggleDropDown = () => {
		this.setState({
			active: false,
			dropdownOpen: !this.state.dropdownOpen
		})
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

	onNameChange = (evt) => {
		this.setState({
			active: false,
			name: evt.target.value
		})
	};

	enableDeviceMotionListener = () => {
		const result = enableDeviceEvents(this.state.currentContext, this.state.name);
		let resultString = "";

		result.forEach(sensor => {
			if (sensor.active) {
				resultString = resultString + sensor.name + " ";
			}
		});

		resultString = resultString.trim();

		this.setState({
			activeSensors: resultString
		});
	};

	disableDeviceMotionListener = () => {
		disableDeviceEvents();

		this.setState({
			activeSensors: ""
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
									<DropdownItem onClick={() => this.selectContext("Walking")}>Walking</DropdownItem>
									<DropdownItem onClick={() => this.selectContext("Standing")}>Standing</DropdownItem>
									<DropdownItem onClick={() => this.selectContext("Sitting")}>Sitting</DropdownItem>
									<DropdownItem onClick={() => this.selectContext("Lying")}>Lying</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</Col>
						<Col xs>
							Sampling:<br/>
							<label className="switch">
								<input type="checkbox" onClick={this.handleChange} checked={this.state.active}/>
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

export default KSSForm;