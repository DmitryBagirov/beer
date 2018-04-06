import React from "react";

export default class Beer extends React.Component {

	constructor() {
		super();
		this.state = {
			edit: false,
			removed: false,
			beer: {}
		};
	}

	componentDidMount() {
		this.setState({
			beer: this.props.beer
		});
	}

	edit(e) {
		this.setState({edit: true});
	}

	save(e) {
		this.setState({edit: false});
	}

	remove(e) {
		//this.props.deleteBeer(this.state.beer.id);
		this.props.deleteBeer(this.props.index);
		this.setState({
			removed: true
		});
	}

	nameChange(e) {
		let beer = this.state.beer;
		beer.name = e.target.value;
		this.setState({
			beer: beer
		});
	}

	descriptionChange(e) {
		let beer = this.state.beer;
		beer.description = e.target.value;
		this.setState({
			beer: beer
		});
	}

	render() {
		let beer = this.state.beer;
		let name = this.props.index+1 + ") " + beer.name;
		if (this.state.removed) {
			return('')
		} else
		return (
			<div style={{textAlign: "left"}}>
				<span>{name}</span>
				<button onClick={e => this.edit(e)}>Edit</button>
				<button onClick={e => this.remove(e)}>Delete</button>
				<img style = {{display: "block"}} width="50px" src={beer.image_url} alt="beer"/>
				{
					this.state.edit ?
						<div>
							<div>
								<input type="text" value={beer.name} onChange={e => this.nameChange(e)} />
							</div>
							<textarea style = {{display: "block"}}  id="" cols="30" rows="5" onChange={e => this.descriptionChange(e)} >{beer.description}</textarea>
							<button onClick={e => this.save(e)}>OK</button>
						</div>
						: ''
				}
				<div className="beerDescription">
					{beer.description}
				</div>
				<p>{beer.brewers_tips}</p>
				<br/>
			</div>
		);
	}
}