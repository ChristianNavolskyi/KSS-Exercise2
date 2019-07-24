import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {App} from './App';
import {SamplingForm} from "./components/Sampling";
import {LandingPage} from "./components/context/LandingPage";
import {Stationary} from "./components/context/Stationary";
import {Walking} from "./components/context/Walking";
import {NotFound} from "./components/NotFound";
import {Navbar, NavItem, Nav, NavLink} from "reactstrap";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

const linkColor = {
	color: "gray"
};

const routing = (
	<Router>
		<div>
			<Navbar color={"dark"}>
				<Nav>
					<NavItem>
						<Link to={"/"} style={linkColor}>
							<NavLink>App</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link to={"/sampling"} style={linkColor}>
							<NavLink>Sampling</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link to={"/context"} style={linkColor}>
							<NavLink>Context</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link to={"/context/walking"} style={linkColor}>
							<NavLink>Walking</NavLink>
						</Link>
					</NavItem>
					<NavItem>
						<Link to={"/context/stationary"} style={linkColor}>
							<NavLink>Stationary</NavLink>
						</Link>
					</NavItem>
				</Nav>
			</Navbar>
			<Switch>
				<Route exact path={"/"} component={App}/>
				<Route path={"/sampling"} component={SamplingForm}/>
				<Route exact path={"/context"} component={LandingPage}/>
				<Route path={"/context/walking"} component={Walking}/>
				<Route path={"/context/stationary"} component={Stationary}/>
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
