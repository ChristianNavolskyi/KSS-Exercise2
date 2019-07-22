import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {App} from './App';
import {SamplingForm} from "./components/Sampling";
import {LandingPage} from "./components/context/LandingPage";
import {Walking} from "./components/context/Walking";
import {Sitting} from "./components/context/Sitting";
import {NotFound} from "./components/NotFound";
import {Route, Link, Switch, BrowserRouter as Router} from "react-router-dom";
import {Navbar, NavItem, Nav, NavLink} from "reactstrap";

const linkColor = {
	color: "gray"
};

const routing = (
	<Router>
		<div>
			<Navbar color="dark">
				<Nav>
					<NavItem>
						<Link to="/" style={linkColor}>
							<NavLink>Home</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/sampling" style={linkColor}>
							<NavLink>Sampling</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/context" style={linkColor}>
							<NavLink>Context</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/context/walking" style={linkColor}>
							<NavLink>Walking</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/context/sitting" style={linkColor}>
							<NavLink>Sitting</NavLink>
						</Link>
					</NavItem>
				</Nav>
			</Navbar>
			<Switch>
				<Route exact path="/" component={App}/>
				<Route path="/sampling" component={SamplingForm}/>
				<Route path="/context/walking" componente={Walking}/>
				<Route path="/context/sitting" componente={Sitting}/>
				<Route path="/context" component={LandingPage}/>
				<Route component={NotFound}/>
			</Switch>
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
