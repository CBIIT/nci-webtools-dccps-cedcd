import React, { Component } from 'react';

class AgeList extends Component {
	constructor(props){
		super(props);
		this.state = {
			list:[
				"0-14",
				"15-19",
				"20-24",
				"25-29",
				"30-34",
				"35-39",
				"40-44",
				"45-49",
				"50-54",
				"55-59",
				"60-64",
				"65-69",
				"70-74",
				"75-79",
				"80-85+"
			],
			open:false
		};
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleClick =() =>{
		this.setState({
			open:!this.state.open
		});
	}

	handleBlur(e){
		if(!this.state.open){
			return;
		}
		let currentTarget = e.currentTarget;

		setTimeout(() =>{
			if (!currentTarget.contains(document.activeElement)) {
				this.setState({
					open:!this.state.open
				});
			}
		}, 0);
	}

  render() {

  	const values = this.props.values;
  	const list = this.state.list.map((item, idx) => {
  		const key = "age_"+idx;
  		let checked = (values.indexOf(item) > -1);
  		return (
  			<li key={key}>
				<label>
					<span className="filter-component-input">
						<input type="checkbox" onClick={() => this.props.onClick(item)} checked={checked}/>
					</span>
					{item}
				</label>
			</li>
  		);
  	});
  	const displayMax = parseInt(this.props.displayMax);
  	const selectedList = values.map((item, idx) => {
  		const key = "s_age_"+idx;
  		if(idx >= displayMax){
  			if(idx === values.length-1 && displayMax < values.length){
	  			return (
	  				<li key={key}>
						and {values.length - displayMax} more...
					</li>
	  			);
	  		}
	  		else{
	  			return "";
	  		}
  		}
  		else{
  			return (
	  			<li key={key}>
					{item}
				</li>
	  		);
  		}
  		
  	});
  	let cls = "dropdown filter-component btn-group";
  	if(this.state.open){
  		cls = cls + " open";
  	}
  	let expanded = this.state.open? "true": "false";
    return (
		<div>
			<div className={cls} tabIndex="3" onBlur={this.handleBlur}>
				<button className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded={expanded} type="button" onClick={this.handleClick}>
				Age&nbsp;
				<span className="badge">{values.length}</span>
				</button>
				<div className="dropdown-menu filter-component-dropdown">
					<h4>Age</h4>
					<button className="btn btn-primary pull-right" type="button" onClick={this.handleClick}>X</button>
					<ul>
						{list}
					</ul>
				</div>
			</div>
			<ul className="picked-options">
				{selectedList}
			</ul>
		</div>
    );
  }
}

export default AgeList;