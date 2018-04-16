import React, { Component } from 'react';
import './Biospecimen.css';
import SpecimenList from '../SpecimenList/SpecimenList';
import CohortList from '../CohortList/CohortList';
import CountsTable from '../CountsTable/CountsTable';
import CollectedCancersList from '../CollectedCancersList/CollectedCancersList';

class Biospecimen extends Component {

	constructor(props){
		super(props);
		this.state = {
			result:{},
			filter:{
				specimen:[],
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
		localStorage.setItem('informationHistory_specimen', JSON.stringify(item));
	}

	handleSpecimenClick = (v) =>{
		let filter = Object.assign({},this.state.filter);
		let idx = filter.specimen.indexOf(v);

		if(idx > -1){
			//remove element
			filter.specimen.splice(idx,1);
		}
		else{
			//add element
			filter.specimen.push(v);
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
			specimen:[],
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
		fetch('./api/cohort/specimen',{
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
		const previousState = localStorage.getItem('informationHistory_specimen');
		if(previousState){
			let state = JSON.parse(previousState);
			localStorage.removeItem('informationHistory_specimen');
			this.filterData(state.filter);
		}
	}

  render() {
  	let content = "";
  	let exportTable = "";
  	if(this.state.result.list && this.state.result.list.length > 0){
  		const topic = ["Specimens Type","Cancer"];
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
                    <h3>Specimen Type</h3>
					<SpecimenList values={this.state.filter.specimen} displayMax="4" onClick={this.handleSpecimenClick}/>
                  </div>
                </div>
                <div className="col-sm-4 filterCol">
                  <h3>Cancer Type</h3>
                  <CollectedCancersList hasNoCancer={true} title="Cancer Type" innertitle="Select Cancer(s)" hasSelectAll={true} values={this.state.filter.cancer} displayMax="5" onClick={this.handleCancerClick}/>
                </div>
                <div className="col-sm-4 filterCol last">
                  <h3>Cohorts</h3>
                  <CohortList values={this.state.filter.cohort} displayMax="4" onClick={this.handleCohortClick}/>
                </div>
              </div>
              <div className="row">
                <div id="submitButtonContainer" className="col-sm-3 col-sm-offset-9">
                  <a id="filterClear" className="btn-filter" href="javascript:void(0);" onClick={this.clearFilter}><span className="glyphicon glyphicon-remove"></span> Clear All</a>
                  <input type="submit" name="submitBtn" value="Submit" id="submitBtn" className="btn btn-primary bttn_submit" onClick={this.toFilter} disabled={this.state.filter.specimen.length === 0 || this.state.filter.cancer.length === 0 || this.state.filter.cohort.length === 0}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="data-table" className="level2 col-md-12">
          <div id="cedcd-cohorts-inner" className="col-md-12">
            <div className="table-inner col-md-12">
              <div className="table-description">
                <p>To display biospecimens across cohorts, specify the Specimen Type, one or more Cancer Type/All Cancers/No Cancer, and Cohort(s) and then select the submit button. All fields are required. A table will display the number of biospecimens across the selected cohorts by cancer type.</p>
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

export default Biospecimen;