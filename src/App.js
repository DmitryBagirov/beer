import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap-css';
import { BrowserRouter, Route } from 'react-router-dom';
//import { Layout } from './Components/Layout';
import { routes } from './routing';

export default class App extends React.Component{
	render() {
		return (
			<BrowserRouter>
				<div>
					{
						routes.map(route => (
							<Route path={route.path} component={route.component} exact key={route.path}/>
						))
					}
				</div>
			</BrowserRouter>
		);
	}
};
