import React, { Component } from 'react';
import './Enrollment.css';
import GenderList from '../GenderList/GenderList';
import RaceList from '../RaceList/RaceList';
import EthnicityList from '../EthnicityList/EthnicityList';
import CohortList from '../CohortList/CohortList';
import CountsTable from '../CountsTable/CountsTable';

class Enrollment extends Component {

	constructor(props){
		super(props);
		this.state = {
			result:{},
			filter:{
				gender:[],
				race:[],
				ethnicity:[],
				cohort:[]
			}
		};
	}

	saveHistory = () =>{
		const state = Object.assign({}, this.state);
		let item = {
		  filter:state.filter
		};
		localStorage.setItem('informationHistory_enrollment', JSON.stringify(item));
	}

	handleGenderClick = (v) =>{
		let filter = Object.assign(this.state.filter);
		let idx = filter.gender.indexOf(v);

		if(idx > -1){
			//remove element
			filter.gender.splice(idx,1);
		}
		else{
			//add element
			filter.gender.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleRaceClick = (v) =>{
		let filter = Object.assign(this.state.filter);
		let idx = filter.race.indexOf(v);

		if(idx > -1){
			//remove element
			filter.race.splice(idx,1);
		}
		else{
			//add element
			filter.race.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleEthnicityClick = (v) =>{
		let filter = Object.assign(this.state.filter);
		let idx = filter.ethnicity.indexOf(v);

		if(idx > -1){
			//remove element
			filter.ethnicity.splice(idx,1);
		}
		else{
			//add element
			filter.ethnicity.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleCohortClick = (v,allIds,e) =>{
		let filter = Object.assign(this.state.filter);
		if(v){
			let idx = filter.cohort.indexOf(v);
			if(idx > -1){
				//remove element
				filter.cohort.splice(idx,1);
			}
			else{
				//add element
				filter.cohort.push(v);
			}
		}
		else{
			//click on the "all cohort"
			filter.cohort = [];
			if(e.target.checked){
				filter.cohort = allIds;
			}
		}
		this.setState({
			filter:filter
		});
	}

	clearFilter = () =>{
		let filter = {
			gender:[],
			race:[],
			ethnicity:[],
			cohort:[]
		};
		this.setState(prevState => ({
			result:{},
			filter: filter
		}));
	}

	toFilter = () =>{
		this.filterData();
	}

	filterData(filter){
		const state = Object.assign({}, this.state);
		let reqBody = {
			filter:state.filter
		};
		if(filter){
			reqBody.filter = filter;
		}
		fetch('./api/cohort/enrollment',{
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
		        'Content-Type': 'application/json'
		    }
		})
			.then(res => res.json())
			.then(result => {
				let rst = result.data;
				this.setState(prevState => (
					{
						result: rst,
						filter: reqBody.filter
					}
				));
			});
	}

	componentDidMount(){
		const previousState = localStorage.getItem('informationHistory_enrollment');
		if(previousState){
			let state = JSON.parse(previousState);
			localStorage.removeItem('informationHistory_enrollment');
			this.filterData(state.filter);
		}
	}

  render() {
  	let content = "";
  	let exportTable = "";
  	if(this.state.result.list && this.state.result.list.length > 0){
  		const topic = ["Ethnicity","Race"];
	  	let cohorts = this.state.result.cohorts;
	  	let data_group = {};
	  	data_group["Male"] = [];
	  	data_group["Female"] = [];
	  	data_group["Unknown"] = [];
	  	let data = Object.assign([], this.state.result.list);
	  	data.forEach(function(element){
	  		data_group[element.c0].push(element);
	  	});
	  	const others = ["total"];
	  	const config = {
	  		blockWidth:200,
	  		blockStyle:{
	  			width:"200px"
	  		},
	  		blockClass:"table-col-400"
	  	};
	  	let sections = [];
	  	if(data_group["Male"].length > 0){
	  		sections.push("Male");
	  	}
	  	if(data_group["Female"].length > 0){
	  		sections.push("Female");
	  	}
	  	if(data_group["Unknown"].length > 0){
	  		sections.push("Unknown");
	  	}
	  	content = sections.map((item, idx) => {
	  		let key = "section_"+idx;
	  		let label = item === "Unknown"? item : item + "s";
	  		return (
	  			<div key={key}>
		  			<label>
						Enrollment: {label}
					</label>
		  			<div className="interiorTable" style={{position:"relative"}}>
						<CountsTable saveHistory={this.saveHistory} values={data_group[item]} topic={topic} cohorts={cohorts} others={others} config={config}/>
					</div>
				</div>
			);
	  	});
	  	exportTable = (
	  			<a href="javascript:void(0);">
	  					Export Table <span className="glyphicon glyphicon-export"></span>
	  			</a>);
  	}
      return (
      	<div>
	        <div id="filter-block" className="filter-block col-md-12">
	          <div className="panel panel-default">
	            <div className="panel-heading">
	              <h2 className="panel-title">Specify</h2>
	            </div>
	            <div className="panel-body">
	              <div className="filter row">
	                <div className="col-sm-3 filterCol">
	                  <div id="gender" className="filter-component">
	                    <h3>Gender</h3>
	                    <GenderList hasUnknown={true} values={this.state.filter.gender} displayMax="3" onClick={this.handleGenderClick}/>
	                  </div>
	                </div>
	                <div className="col-sm-3 filterCol">
	                  <div id="race" className="filter-component">
	                    <h3>Race</h3>
	                    <RaceList values={this.state.filter.race} displayMax="4" onClick={this.handleRaceClick}/>
	                  </div>
	                </div>
	                <div className="col-sm-3 filterCol">
	                  <div id="ethnicity" className="filter-component">
	                    <h3>Ethnicity</h3>
	                    <EthnicityList values={this.state.filter.ethnicity} displayMax="3" onClick={this.handleEthnicityClick}/>
	                  </div> 
	                </div>
	                <div className="col-sm-3 filterCol last">
	                  	<h3>Cohorts</h3>
						<CohortList values={this.state.filter.cohort} displayMax="4" onClick={this.handleCohortClick}/>
	                </div>
	              </div>
	              <div className="row">
	                <div id="submitButtonContainer" className="col-sm-3 col-sm-offset-9">
	                  <a id="filterClear" className="btn-filter" href="javascript:void(0);" onClick={this.clearFilter}>
	                  	<span className="glyphicon glyphicon-remove"></span> Clear All
	                  </a>
	                  <input type="submit" name="submitBtn" value="Submit" id="submitBtn" className="btn btn-primary bttn_submit" onClick={this.toFilter} disabled={this.state.filter.gender.length === 0 || this.state.filter.race.length === 0 || this.state.filter.ethnicity.length === 0 || this.state.filter.cohort.length === 0}/>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	        <div className="level2 col-md-12">
	          <div id="cedcd-cohorts-inner" className="col-md-12">
	            <div className="table-inner col-md-12">
	              <div className="table-description">
	                <p>Specify the Gender, Race, Ethnicity, and Cohort(s) to see a table of the number of participants enrolled.  All fields are required.  A table will display the number of participants enrolled by gender, race and ethnicity across the selected cohorts.</p>
	              </div>
	              <div className="tableTopMatter row">
	                <div id="tableLegend" className="col-md-10">
	                  <p>N/A: Not Applicable; N/P: Not Provided</p>
	                </div>
	                <div id="tableExport" className="col-md-2">
	                	{exportTable}
	                </div>
	              </div>
	              <div className="clearFix"></div>
	              <div className="cedcd-table clearfix">
	              	{content}
            	</div>
              </div>
          	</div>
        </div>
        </div>
      );
  }
}

export default Enrollment;
