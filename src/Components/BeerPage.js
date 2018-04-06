import React from "react";
import Beer from "./Beer.js";
import {Container} from "semantic-ui-react";

export default class BeerPage extends React.Component {

	constructor() {
		super();
		this.state = {
			page: 1,
			beers: [],
			visible: false,
			name: "Next"
		};
	}

	componentDidMount() {
		this.load();
	}

	deleteBeer(index) {
		if (index > -1) {
			let beers = this.state.beers.filter(val => {
				if (val.id !== index) return val;
			});
			this.setState({beers: beers});
		}
	}

	load(e) {
		this.setState({name: "Loading..."});
		fetch(`https://api.punkapi.com/v2/beers?page=${this.state.page}&limit=25`, {
			method: "get",
			headers: {"Content-Type": "application/json"}
		}).then(res => {
			return res.json()
		}).then(data => {
			if (data.length === 0) {
				this.setState({visible: false});
				return;
			}
			let beers = this.state.beers.concat(data);
			this.setState({
				beers,
				visible: true,
				name: "Next",
				page: this.state.page + 1
			});
		}).catch(err => {
			console.log(err);
		});
	};

	render() {
		return (
			<Container>
				{
					this.state.beers.map((beer, index) => {
						return <Beer beer={beer} index={index + 1} key={beer.id} deleteBeer = {e => this.deleteBeer(e)}/>
					})
				}
				{
					this.state.visible ? <button onClick={e => this.load(e)}>{this.state.name}</button> : ""
				}
			</Container>
		)
	}
}