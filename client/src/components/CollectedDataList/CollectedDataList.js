import React, { Component } from 'react';

class CollectedDataList extends Component {
	constructor(props){
		super(props);
		this.state = {
			list:[
				"Alcohol Consumption",
				"Anthropometry",
				"Cancer Treatment",
				"Cigarette Smoking",
				"Cognitive Function",
				"Complementary and Alternative Medicine",
				"Depression",
				"Dietary Intake",
				"Dietary Supplement Use",
				"Education Level",
				"Employment Status",
				"Environmental or Occupational Exposures",
				"Fatigue",
				"Genetic Information",
				"Health Insurance Status",
				"Language/Country of Origin",
				"Marital Status",
				"Non-Prescription Medication",
				"Omics Data",
				"Other Psychosocial Variables",
				"Other Tobacco Products",
				"Physical Activity",
				"Prescription Medication Use",
				"Quality of Life",
				"Reproductive History",
				"Residential Information",
				"Self-Reported Health",
				"Sleeping Habits",
				"Social Support",
				"Socio-Economic Status"
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
  		const key = "cdata_"+idx;
  		let checked = (values.indexOf(item) > -1);
  		return (
  			<li  key={key}>
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
  		const key = "s_cdata_"+idx;
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
			<div className={cls} tabIndex="4" onBlur={this.handleBlur}>
				<button className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded={expanded} type="button" onClick={this.handleClick}>
				Data Collected&nbsp;
				<span className="badge">{values.length}</span>
				</button>
				<div className="dropdown-menu filter-component-dropdown">
					<h4>Data Collected</h4>
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

export default CollectedDataList;