import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Button from "reactstrap/es/Button";

export class App extends Component {
	render() {
		return (
			<div>
				<h1>Welcome to my context sensitive system</h1>
				You can choose between sampling more data to improve our classification here:
				<Link to="/sampling">
					<Button>
						Sampling
					</Button>
				</Link>
				<br/>
				Or you can experience the power of a context sensitive application here:
				<Link to="/context">
					<Button>
						Context
					</Button>
				</Link>
			</div>
		);
	}
}
