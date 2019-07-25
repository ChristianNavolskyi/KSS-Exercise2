import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {App} from './App';
import {SamplingForm} from "./components/Sampling";
import {LandingPage} from "./components/context/LandingPage";
import {Stationary} from "./components/context/Stationary";
import {Walking} from "./components/context/Walking";
import {NotFound} from "./components/NotFound";
import {NavbarBrand, Navbar, NavItem, Nav, NavbarToggler, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {BrowserRouter as Router, Route, Switch, NavLink, Link} from "react-router-dom";

const linkColor = {
	color: "white"
};

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		}
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	};

	render() {
		return (
			<div>
				<Router>
					<div>
						<Navbar color={"dark"} dark expand={"md"}>
							<Link to={"/"} style={linkColor}>
								<NavbarBrand>
									Context App
								</NavbarBrand>
							</Link>
							<NavbarToggler onClick={this.toggle}/>
							<Collapse isOpen={this.state.isOpen} style={{"color": "white"}} navbar>
								<Nav className={"ml-auto"} navbar>
									<NavItem>
										<NavLink to={"/sampling"} onClick={this.toggle} style={linkColor} activeClassName={"active"} className={"nav-link"}>Sampling</NavLink>
									</NavItem>
									<NavItem>
										<NavLink to={"/context"} onClick={this.toggle} style={linkColor} activeClassName={"active"} className={"nav-link"}>Context</NavLink>
									</NavItem>
									<UncontrolledDropdown nav inNavbar>
										<DropdownToggle nav caret style={linkColor}>
											Static Context Pages
										</DropdownToggle>
										<DropdownMenu style={{"background": "grey"}}>
											<DropdownItem>
												<NavLink to={"/context/walking"} onClick={this.toggle} style={linkColor} activeClassName={"active"} className={"nav-link"}>Walking</NavLink>
											</DropdownItem>
											<DropdownItem>
												<NavLink to={"/context/stationary"} onClick={this.toggle} style={linkColor} activeClassName={"active"} className={"nav-link"}>Stationary</NavLink>
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledDropdown>
								</Nav>
							</Collapse>
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
			</div>
		);
	}
}

const page = (
	<MainPage/>
);

ReactDOM.render(page, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
