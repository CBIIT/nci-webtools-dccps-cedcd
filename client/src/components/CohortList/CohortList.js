import React, { Component } from 'react';

class CohortList extends Component {

	constructor(props){
		super(props);
		this.state = {
			dict:{},
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
		let reqBody = {
			searchText:"",
			orderBy:{
				column:"cohort_acronym",
				order:"asc"
			},
			paging:{page:0,pageSize:15,total:0}
		};
		fetch('./api/cohort/list',{
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
		        'Content-Type': 'application/json'
		    }
		})
		.then(res => res.json())
		.then(result => {
			let list = result.data.list;
			let dict = {};
			list.forEach(function(element){
				dict[element.cohort_acronym] = {cohort_name:element.cohort_name,cohort_id:element.cohort_id};
			});
			this.setState({
					dict: dict
			});
		});
	}

  render() {
  	const values = this.props.values;
  	const dict = this.state.dict;
  	let selected = [];
  	let allIds = [];
  	const list = Object.keys(dict).map((item, idx) => {
  		const cohort_id = dict[item].cohort_id;
  		allIds.push(cohort_id);
  		const key = "cohort_"+cohort_id;
  		let checked = (values.indexOf(cohort_id) > -1);
  		if(checked){
  			selected.push(item);
  		}
  		return (
  			<li key={key}>
				<label>
					<span className="filter-component-input">
						<input type="checkbox" onChange={() => this.props.onClick(cohort_id)} checked={checked}/>
					</span>
					{item}
				</label>
			</li>
  		);
  	});
  	const displayMax = parseInt(this.props.displayMax);
  	const len = selected.length;
  	const selectedList = selected.map((item, idx) => {
  		const key = "s_cohort_"+idx;
  		if(idx >= displayMax){
  			if(idx === len-1 && displayMax < len){
	  			return (
	  				<li key={key}>
						and {len - displayMax} more...
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
			<div className={cls} tabIndex="0" onBlur={this.handleBlur}>
				<button className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded={expanded} type="button" onClick={this.handleClick}>
				Select Cohorts&nbsp;
				<span className="badge">{this.props.values.length}</span>
				</button>
				<div className="dropdown-menu filter-component-dropdown">
					<h4>Select Cohort(s)</h4>
					<button className="btn btn-primary pull-right" type="button" onClick={this.handleClick}>X</button>
					<ul>
						<li>
							<label>
								<span className="filter-component-input">
									<input type="checkbox" onClick={(e) => this.props.onClick(null,allIds,e)}/>
								</span>
								All Cohorts
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

export default CohortList;