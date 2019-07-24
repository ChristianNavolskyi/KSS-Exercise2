import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "reactstrap/es/Button";

export class App extends Component {
	render() {
		return (
			<div>
				<div align={"center"}>
					<h1>Welcome to my context sensitive system</h1>
				</div>
				<br/>
				<div align={"center"}>
					You can choose between sampling more data to improve our classification here:
					<Link to="/sampling">
						<Button block style={{"width": "75%"}}>
							Sampling
						</Button>
					</Link>
				</div>
				<br/>
				<br/>
				<div align={"center"}>
					Or you can experience the power of a context sensitive application here:
					<Link to="/context">
						<Button block style={{"width": "75%"}}>
							Context
						</Button>
					</Link>
				</div>
			</div>
		);
	}
}
