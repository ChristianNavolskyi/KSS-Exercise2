import React, {Component} from "react";
import ReactPlayer from "react-player";

export class Walking extends Component {
	render() {
		return (
			<div align={"center"}>
				<b>Have fun walking and look up ahead.</b>
				<br/>
				<ReactPlayer width="100%" url={"https://www.youtube.com/watch?v=uRWxcCEtEuc"} playing/>
			</div>
		)
	}
}
