import React, {Component} from "react"
import axios from "axios"

export class Walking extends Component {

	constructor(props) {
		super(props);

		this.state = {
			key: process.env.REACT_APP_MAPS_KEY,
			lat: 0,
			lng: 0,
			accuracy: 0,
		}
	}


	componentDidMount() {
		const url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + this.state.key;

		window.setInterval(() => this.getLocation(url), 10000);
	}

	getLocation(url) {
		axios.get(url).then(res => {
			console.log(res);
			this.setState({
				lat: res.location.lat,
				lng: res.location.lng,
				accuracy: res.accuracy
			});
		}).catch(err => {
			console.log("error");
			console.log(err);
		});
	}

	render() {
		const latlng = this.state.lat + "," + this.state.lng;
		const source = "https://www.google.com/maps/embed/v1/view?key=" + this.state.key + "&center=" + latlng;

		return (
			<div>
				<iframe
					width="600"
					height="450"
					style={{"border": "0"}}
					src={source}
					title={"Map"}
					allowFullScreen>
				</iframe>
			</div>
		);
	}
}