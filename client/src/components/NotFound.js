import React, {Component} from "react";

export class NotFound extends Component {
	render() {
		const gifStyle = {
			width: "100%",
			height: "0",
			"padding-bottom": "89%",
			position: "relative"
		};

		return (
			<div>
				<div style={gifStyle}>
					<iframe src="https://giphy.com/embed/3osxYk30y7aTinMNs4" width="50%" height="50%" style={{"position": "absolute"}} className="giphy-embed" allowFullScreen/>
				</div>
				<p><a href="https://giphy.com/gifs/aprilfools-3osxYk30y7aTinMNs4">via GIPHY</a></p>
			</div>
		);
	}
}