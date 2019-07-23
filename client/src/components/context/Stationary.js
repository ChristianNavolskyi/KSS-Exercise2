import React, {Component} from "react"
import axios from "axios"
import Button from "reactstrap/es/Button";

export class Stationary extends Component {

	constructor(props) {
		super(props);

		this.state = {
			key: process.env.REACT_APP_MAPS_KEY,
			lat: 0,
			lng: 0,
			accuracy: 0,
			timer: null,
			note: ""
		}
	}


	componentDidMount() {
		this.startLocationIntervalTask()
	}

	componentWillUnmount() {
		this.stopLocationIntervalTask()
	}

	startLocationIntervalTask() {
		const timer = setInterval(() => this.getLocation(), 10000);

		this.getLocation();

		this.setState({
			timer
		})
	}

	stopLocationIntervalTask() {
		clearInterval(this.state.timer);

		this.setState({
			timer: null
		})
	}

	toggleRefresh() {
		if (this.state.timer === null) {
			this.startLocationIntervalTask();
			this.setNote("Now refreshing");
		} else {
			this.stopLocationIntervalTask();
			this.setNote("Stopped refreshing");
		}
	}

	setNote(text) {
		this.setState({
			note: text
		});
	}

	getLocation() {
		const url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + this.state.key;
		console.log("Get Location");

		axios.post(url).then(res => {
			console.log(res);
			this.setState({
				lat: res.data.location.lat,
				lng: res.data.location.lng,
				accuracy: res.data.accuracy,
				note: "Location retrieved"
			});
		}).catch(err => {
			console.log("error");
			console.log(err);
			this.setNote(JSON.stringify(err))
		});
	}

	render() {
		console.log("rendering");
		const latlng = this.state.lat + "," + this.state.lng;
		const source = "https://www.google.com/maps/embed/v1/view?key=" + this.state.key + "&center=" + latlng;

		return (
			<div>
				<p align="center">
					<iframe
						style={{"border": "0", "width": "80%", "height": "400px"}}
						src={source}
						title={"Map"}
						allowFullScreen>
					</iframe>
				</p>
				Location: {this.state.lng}, {this.state.lat}
				<br/>
				Note: {this.state.note}
				<br/>
				<Button onClick={() => this.toggleRefresh()}>Toggle Refresh</Button>
			</div>
		);
	}
}