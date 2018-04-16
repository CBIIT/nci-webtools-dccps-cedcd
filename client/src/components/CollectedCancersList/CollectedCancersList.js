import React, { Component } from 'react';

class CollectedCancersList extends Component {
	constructor(props){
		super(props);
		this.state = {
			list:[
				"Bladder",
				"Bone",
				"Brain",
				"Breast",
				"Cervix",
				"Colon",
				"Corpus, body of uterus",
				"Esophagus",
				"Gall bladder and extrahepatic bile duct",
				"Kidney and other unspecified urinary organs including renal pelvis, ureter, urethra",
				"Leukemia",
				"Liver and intrahepatic bile ducts",
				"Lymphoma (HL and NHL)",
				"Melanoma (excluding genital organs)",
				"Myeloma",
				"Oropharyngeal",
				"Ovary, fallopian tube, broad ligament",
				"Pancreas",
				"Prostate",
				"Rectum and anus",
				"Small intestine",
				"Stomach",
				"Thyroid",
				"Trachea, bronchus, and lung",
				"All Other Cancers"
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
  	const title = this.props.title;
  	const innertitle = this.props.innertitle;
  	const hasNoCancer = this.props.hasNoCancer;
  	let f_list = Object.assign([],this.state.list);
  	if(hasNoCancer){
  		f_list.push("No Cancer");
  	}
  	let selectAll = "";
  	if(this.props.hasSelectAll){
  		selectAll = (
	  		<li>
				<label>
					<span className="filter-component-input">
						<input type="checkbox" onClick={(e) => this.props.onClick(null,f_list,e)}/>
					</span>
					All Cancer
				</label>
			</li>
		);
  	}
  	const list = f_list.map((item, idx) => {
  		const key = "cancer_"+idx;
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
  		const key = "s_cancer_"+idx;
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
			<div className={cls} tabIndex="6" onBlur={this.handleBlur}>
				<button className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded={expanded} type="button" onClick={this.handleClick}>
				{title}&nbsp;
				<span className="badge">{values.length}</span>
				</button>
				<div className="dropdown-menu filter-component-dropdown">
					<h4>{innertitle}</h4>
					<button className="btn btn-primary pull-right" type="button" onClick={this.handleClick}>X</button>
					<ul>
						{selectAll}
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

export default CollectedCancersList;