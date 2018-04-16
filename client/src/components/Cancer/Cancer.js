import React, { Component } from 'react';
import './Cancer.css';
import GenderList from '../GenderList/GenderList';
import CohortList from '../CohortList/CohortList';
import CountsTable from '../CountsTable/CountsTable';
import CollectedCancersList from '../CollectedCancersList/CollectedCancersList';

class Cancer extends Component {

	constructor(props){
		super(props);
		this.state = {
			result:{},
			filter:{
				gender:[],
				cancer:[],
				cohort:[]
			}
		};
	}

	saveHistory = () =>{
		const state = Object.assign({}, this.state);
		let item = {
		  filter:state.filter
		};
		localStorage.setItem('informationHistory_cancer', JSON.stringify(item));
	}

	handleGenderClick = (v) =>{
		let filter = Object.assign({},this.state.filter);
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

	handleCancerClick = (v,allIds,e) =>{
		let filter = Object.assign({},this.state.filter);
		if(v){
			let idx = filter.cancer.indexOf(v);
			if(idx > -1){
				//remove element
				filter.cancer.splice(idx,1);
			}
			else{
				//add element
				filter.cancer.push(v);
			}
		}
		else{
			//click on the "all cohort"
			filter.cancer = [];
			if(e.target.checked){
				filter.cancer = allIds;
			}
		}
		this.setState({
			filter:filter
		});
	}

	handleCohortClick = (v,allIds,e) =>{
		let filter = Object.assign({},this.state.filter);
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
			cancer:[],
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
		fetch('./api/cohort/cancer',{
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
		const previousState = localStorage.getItem('informationHistory_cancer');
		if(previousState){
			let state = JSON.parse(previousState);
			localStorage.removeItem('informationHistory_cancer');
			this.filterData(state.filter);
		}
	}

  render() {
  	let content = "";
  	let exportTable = "";
  	if(this.state.result.list && this.state.result.list.length > 0){
  		const topic = ["Cancer","Gender"];
	  	let cohorts = this.state.result.cohorts;
	  	let data = Object.assign([], this.state.result.list);
	  	const others = [];
	  	const config = {
	  		blockWidth:200,
	  		blockStyle:{
	  			width:"200px"
	  		},
	  		blockClass:"table-col-400"
	  	};
	  	content = (
	  			<div className="interiorTable" style={{position:"relative"}}>
					<CountsTable saveHistory={this.saveHistory} values={data} topic={topic} cohorts={cohorts} others={others} config={config}/>
				</div>
			);
	  	exportTable = (
	  			<a href="javascript:void(0);">
	  					Export Table <span className="glyphicon glyphicon-export"></span>
	  			</a>);
  	}
      return (
        <div id="cedcd-main-content" className="row">
        <div id="filter-block" className="filter-block col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title">Specify</h2>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-4 filterCol">
                  <div id="gender_area" className="filter-component">
                    <h3>Gender</h3>
					<GenderList hasUnknown={false} values={this.state.filter.gender} displayMax="3" onClick={this.handleGenderClick}/>
                  </div>
                </div>
                <div className="col-sm-4 filterCol">
                  <h3>Cancer Type</h3>
                  <CollectedCancersList hasNoCancer={false} title="Cancer Type" innertitle="Select Cancer(s)" hasSelectAll={true} values={this.state.filter.cancer} displayMax="5" onClick={this.handleCancerClick}/>
                </div>
                <div className="col-sm-4 filterCol last">
                  <h3>Cohorts</h3>
                  <CohortList values={this.state.filter.cohort} displayMax="4" onClick={this.handleCohortClick}/>
                </div>
              </div>
              <div className="row">
                <div id="submitButtonContainer" className="col-sm-3 col-sm-offset-9">
                  <a id="filterClear" className="btn-filter" href="javascript:void(0);" onClick={this.clearFilter}><span className="glyphicon glyphicon-remove"></span> Clear All</a>
                  <input type="submit" name="submitBtn" value="Submit" id="submitBtn" className="btn btn-primary bttn_submit" onClick={this.toFilter} disabled={this.state.filter.gender.length === 0 || this.state.filter.cancer.length === 0 || this.state.filter.cohort.length === 0}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="data-table" className="level2 col-md-12">
          <div id="cedcd-cohorts-inner" className="col-md-12">
            <div className="table-inner col-md-12">
              <div className="table-description">
                <p>To display cancer counts across cohorts, specify Gender, Cancer Type(s), and Cohort(s) and then select the submit button.  All fields are required.  A table will display the number of cohort participants with the selected cancers.</p>
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
              <div className="cedcd-table">
              	{content}
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default Cancer;