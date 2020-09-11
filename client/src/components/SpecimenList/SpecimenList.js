import React, { Component } from 'react';

class SpecimenList extends Component {

	_isMounted = false;

	constructor(props){
		super(props);
		this.state = {
			list:[
			],
			lookup:{},
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

	componentDidMount(){
		this._isMounted = true;
		let reqBody = {
			category:"specimen"
		};
		fetch('./api/cohort/lookup',{
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
		        'Content-Type': 'application/json'
		    }
		})
		.then(res => res.json())
		.then(result => {
			let specimens = result.data.list;
			let arr = [];
			let dict = {};
			specimens.forEach(function(element){
				arr.push({specimen:element.specimen,id:element.id});
				dict[element.id] = {specimen:element.specimen,id:element.id};
			});
			if (this._isMounted) {
				this.setState({
					list: arr,
					lookup: dict
				});
			}
		});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

  render() {
  	const values = this.props.values;
	  //let f_list = Object.assign([],this.state.list);
	let f_list = [...this.state.list].sort((s1, s2)=>{
		let specimen1 = s1.specimen.toLowerCase()
		let specimen2 = s2.specimen.toLowerCase()
		return specimen1 != specimen2 ? specimen1 > specimen2 ? 1 : - 1 : 0
	})
  	let lookup = Object.assign({},this.state.lookup);
  	let allIds = [];
  	const list = f_list.map((item, idx) => {
  		const key = "specimen_"+idx;
  		allIds.push(item.id);
  		let checked = (values.indexOf(item.id) > -1);
  		return (
  			<li key={key}>
				<label>
					<span className="filter-component-input">
						<input type="checkbox" onClick={() => this.props.onClick(item)} checked={checked}/>
					</span>
					{item.specimen}
				</label>
			</li>
  		);
  	});
  	const displayMax = parseInt(this.props.displayMax);
  	
  	const selectedList = values.map((item, idx) => {
  		const key = "s_specimen_"+idx;
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
  			if(lookup[item]){
  				const specimen = lookup[item].specimen;
	  			return (
		  			<li key={key}>
						{specimen}
					</li>
		  		);
  			}
  			else{
  				return "";
  			}
  			
  		}
  		
  	});

  	let cls = "dropdown filter-component btn-group filter-component-div";
  	if(this.state.open){
  		cls = cls + " open";
  	}
  	let expanded = this.state.open? "true": "false";

  	let borderStyle = {};
	const rightBorderStyle = this.props.rightBorderStyle || "curve";

	if(rightBorderStyle == "straight"){
		borderStyle = {
			"borderTopRightRadius": "0px",
			"borderBottomRightRadius": "0px"
		};
	}
    return (
		<div className="filter-component-block">
			<div className={cls} tabIndex="0" onBlur={this.handleBlur}>
				<button className="btn btn-default dropdown-toggle" style={borderStyle} data-toggle="dropdown" aria-haspopup="true" aria-expanded={expanded} type="button" onClick={this.handleClick}>
				Specimen Type&nbsp;
				<span className="badge">{this.props.values.length}</span>
				</button>
				<div className="dropdown-menu filter-component-dropdown">
					<h4>Select Specimen Type(s)</h4>
					<button className="btn btn-primary pull-right" type="button" onClick={this.handleClick}>X</button>
					<ul>
						<li>
							<label>
								<span className="filter-component-input">
									<input type="checkbox" onClick={(e) => this.props.onClick(null,allIds,e)}/>
								</span>
								All Types
							</label>
						</li>
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

export default SpecimenList;