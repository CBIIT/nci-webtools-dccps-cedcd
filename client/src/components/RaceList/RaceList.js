import React, { Component } from 'react';

class RaceList extends Component {
	constructor(props){
		super(props);
		this.state = {
			list:[
				"American Indian / Alaska Native",
				"Asian",
				"Black or African-American",
				"Native Hawaiian or Other Pacific Islander",
				"White",
				"Other/Unknown",
				"More than one race"
			],
			open:props.startOpen === undefined?false:true,
			focusThis:this.props.focusThis === undefined?false:this.props.focusThis == "true"?true:false,

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
  		const key = "race_"+idx;
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
  		const key = "s_race_"+idx;
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
  	let cls = "dropdown filter-component btn-group filter-component-div";
  	if(this.state.open){
  		cls = cls + " open";
  	}
	  let expanded = this.state.open? "true": "false";
	  let buttonId = ""
	  if(this.state.focusThis == true && this.props.focusThis == "true"){ 
		buttonId = "focusMe"
	  }
    return (
		<div className="filter-component-block">
			<div className={cls} tabIndex="0" onBlur={this.handleBlur}>
				<button className="btn btn-default dropdown-toggle" id={buttonId} data-toggle="dropdown" aria-haspopup="true" aria-expanded={expanded} type="button" onClick={this.handleClick}>
				Race&nbsp;
				<span className="badge">{values.length}</span>
				</button>
				<div className="dropdown-menu filter-component-dropdown">
					<h4>Race</h4>
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

export default RaceList;