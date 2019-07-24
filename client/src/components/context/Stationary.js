import React, {Component} from "react"
import axios from "axios"
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from "reactstrap";

const contexts = {
	morning: {name: "Morgens", query: "stations"},
	lunchTime: {name: "Mittags", query: "restaurants"},
	evening: {name: "Abends", query: "stations"},
	night: {name: "Nachts", query: "bars"}
};

export class Stationary extends Component {

	constructor(props) {
		super(props);

		this.state = {
			key: process.env.REACT_APP_MAPS_KEY,
			lat: 0,
			lng: 0,
			accuracy: 0,
			timer: null,
			note: "",
			contextDropdownOpen: false,
			currentContext: contexts.evening,
		}
	}

	componentDidMount() {
		this.getLocation();
		this.setContextForTime();
	}

	setContextForTime() {
		const hour = new Date().getHours();
		let context;

		if (0 <= hour && hour < 9) {
			context = contexts.morning;
		} else if (9 <= hour && hour < 16) {
			context = contexts.lunchTime;
		} else if (16 <= hour && hour < 19) {
			context = contexts.evening;
		} else if (19 <= hour && hour <= 24) {
			context = contexts.night;
		}

		this.setState({
			currentContext: context
		});
	}

	toggleDropdown = () => {
		let newState = true;

		if (this.state.contextDropdownOpen) {
			newState = false;
		}

		this.setState({
			contextDropdownOpen: newState
		});
	};

	getLocation() {
		const url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + this.state.key;
		console.log("Get Location");

		axios.post(url).then(res => {
			console.log(res);
			this.setState({
				lat: res.data.location.lat,
				lng: res.data.location.lng,
				accuracy: res.data.accuracy,
				note: "Location retrieved",
			});
		}).catch(err => {
			console.log("error");
			console.log(err);
		});
	}

	changeSelectedContext(context) {
		this.setState({
			currentContext: context
		});
	}

	render() {
		const latlng = this.state.lat + "," + this.state.lng;
		const source = "https://www.google.com/maps/embed/v1/search?key=" + this.state.key + "&center=" + latlng + "&zoom=15&q=" + this.state.currentContext.query;

		let contextsToDisplay = [];

		for (let key in contexts) {
			const context = contexts[key];

			contextsToDisplay = [...contextsToDisplay, (<DropdownItem onClick={() => this.changeSelectedContext(context)} key={context.name}>{context.name}</DropdownItem>)]
		}

		return (
			<div>
				<div align="center">
					<iframe
						style={{"border": "0", "width": "100%", "height": "400px"}}
						src={source}
						title={"Map"}
						allowFullScreen>
					</iframe>
				</div>
				<Dropdown isOpen={this.state.contextDropdownOpen} toggle={this.toggleDropdown}>
					<div align="center">
						<DropdownToggle caret style={{"width": "75%"}}>
							{this.state.currentContext.name}
						</DropdownToggle>
					</div>
					<DropdownMenu>
						{contextsToDisplay}
					</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}