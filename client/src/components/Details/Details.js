import React, { Component } from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PageSummary from '../PageSummary/PageSummary';
import Paging from '../Paging/Paging';
import TableHeader from '../TableHeader/TableHeader';
import SelectBox from '../SelectBox/SelectBox';
import GenderList from '../GenderList/GenderList';
import RaceList from '../RaceList/RaceList';
import EthnicityList from '../EthnicityList/EthnicityList';
import AgeList from '../AgeList/AgeList';
import CollectedDataList from '../CollectedDataList/CollectedDataList';
import CollectedSpecimensList from '../CollectedSpecimensList/CollectedSpecimensList';
import CollectedCancersList from '../CollectedCancersList/CollectedCancersList';
import DiseaseStateList from '../DiseaseStateList/DiseaseStateList';
import FloatingSubmit from './FloatingSubmit';
import TabBoard from './TabBoard';
import BoxBoard from './BoxBoard';

class Details extends Component {

	constructor(props){
		super(props);
		this.state = {
			list:[],
			filter:{
				participant:{
					gender:[],
					race:[],
					ethnicity:[],
					age:[]
				},
				collect:{
					cancer:[],
					data:[],
					specimen:[]
				},
				study:{
					state:[]
				}
			},
			orderBy:{
				column:"cohort_name",
				order:"asc"
			},
			pageInfo:{page:1,pageSize:15,total:0},
			lastPage:1,
			selected:[],
			comparasion:false,
			currTab:0
		};
	}

	gotoPage(i){
		this.filterData(i);
	}

	clearFilter = () =>{
		let i = 1;
		let orderBy = {
				column:"cohort_name",
				order:"asc"
		};
		let filter = {
			participant:{
				gender:[],
				race:[],
				ethnicity:[],
				age:[]
			},
			collect:{
				cancer:[],
				data:[],
				specimen:[]
			},
			study:{
				state:[]
			}
		};
		this.filterData(i, orderBy, filter,[]);
	}

	goBack2Filter = () => {
		this.filterData(this.state.pageInfo.page);
	}

	toFilter = () =>{
		this.filterData(1,null,null,[]);
	}

	filterData(i, orderBy, filter,selected){
		const state = Object.assign({}, this.state);
		const lastPage = state.pageInfo.page == 0 ? state.lastPage: state.pageInfo.page;
		let reqBody = {
			filter:state.filter,
			orderBy:state.orderBy,
			paging:state.pageInfo
		};
		if(i == -1){
			reqBody.paging.page = state.lastPage;
		}
		else{
			reqBody.paging.page = i;
		}
		if(orderBy){
			reqBody.orderBy = orderBy;
		}
		if(filter){
			reqBody.filter = filter;
		}
		fetch('./api/cohort/select',{
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
		        'Content-Type': 'application/json'
		    }
		})
			.then(res => res.json())
			.then(result => {
				let list = result.data.list;
				reqBody.paging.total = result.data.total;
				this.setState(prevState => (
					{
						list: list,
						filter: reqBody.filter,
						orderBy: reqBody.orderBy,
						pageInfo: reqBody.paging,
						lastPage: (i > -1? lastPage : i),
						selected:selected?selected:prevState.selected,
						comparasion:false
					}
				));
			});
	}


	handleOrderBy(column){
		let orderBy = Object.assign({}, this.state.orderBy);
		if(column == orderBy.column){
			orderBy.order = orderBy.order =="asc" ? "desc" : "asc";
		}
		else{
			orderBy.column = column;
			orderBy.order = "asc";
		}
		let pageInfo = Object.assign({}, this.state.pageInfo);
		this.filterData(pageInfo.page,orderBy);
	}

	handleSelect(id, e){
		let selected;
		if(id === -1){
			selected = [];
			if(e.target.checked){
				this.state.list.forEach(function(t){
					selected.push(t.cohort_id);
				});
			}
		}
		else{
			selected = Object.assign([], this.state.selected);
			let idx = selected.indexOf(id);
			if(idx >= 0){
				selected.splice(idx,1);
			}
			else{
				selected.push(id);
			}
		}
		this.setState({
			selected: selected
		});
	}

	handleGenderClick = (v) =>{
		const filter = Object.assign({},this.state.filter);
		let idx = filter.participant.gender.indexOf(v);

		if(idx > -1){
			//remove element
			filter.participant.gender.splice(idx,1);
		}
		else{
			//add element
			filter.participant.gender.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleRaceClick = (v) =>{
		const filter = Object.assign({},this.state.filter);
		let idx = filter.participant.race.indexOf(v);

		if(idx > -1){
			//remove element
			filter.participant.race.splice(idx,1);
		}
		else{
			//add element
			filter.participant.race.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleEthnicityClick = (v) =>{
		const filter = Object.assign({},this.state.filter);
		let idx = filter.participant.ethnicity.indexOf(v);

		if(idx > -1){
			//remove element
			filter.participant.ethnicity.splice(idx,1);
		}
		else{
			//add element
			filter.participant.ethnicity.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleAgeClick = (v) =>{
		const filter = Object.assign({},this.state.filter);
		let idx = filter.participant.age.indexOf(v);

		if(idx > -1){
			//remove element
			filter.participant.age.splice(idx,1);
		}
		else{
			//add element
			filter.participant.age.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleDataClick = (v) =>{
		const filter = Object.assign({},this.state.filter);
		let idx = filter.collect.data.indexOf(v);

		if(idx > -1){
			//remove element
			filter.collect.data.splice(idx,1);
		}
		else{
			//add element
			filter.collect.data.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleSpecimenClick = (v) =>{
		const filter = Object.assign({},this.state.filter);
		let idx = filter.collect.specimen.indexOf(v);

		if(idx > -1){
			//remove element
			filter.collect.specimen.splice(idx,1);
		}
		else{
			//add element
			filter.collect.specimen.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleCancerClick = (v,allIds,e) =>{
		let filter = Object.assign({},this.state.filter);
		if(v){
			let idx = filter.collect.cancer.indexOf(v);
			if(idx > -1){
				//remove element
				filter.collect.cancer.splice(idx,1);
			}
			else{
				//add element
				filter.collect.cancer.push(v);
			}
		}
		else{
			//click on the "all cohort"
			filter.collect.cancer = [];
			if(e.target.checked){
				filter.collect.cancer = allIds;
			}
		}
		this.setState({
			filter:filter
		});
	}

	handleCancerClick = (v) =>{
		const filter = Object.assign({},this.state.filter);
		let idx = filter.collect.cancer.indexOf(v);

		if(idx > -1){
			//remove element
			filter.collect.cancer.splice(idx,1);
		}
		else{
			//add element
			filter.collect.cancer.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleStateClick = (v) =>{
		const filter = Object.assign({},this.state.filter);
		let idx = filter.study.state.indexOf(v);

		if(idx > -1){
			//remove element
			filter.study.state.splice(idx,1);
		}
		else{
			//add element
			filter.study.state.push(v);
		}
		this.setState({
			filter:filter
		});
	}

	handleComparasion = () =>{
		this.setState({
			comparasion:true
		});
	}

	renderSelectHeader(width){
		return (
			<th id="table-select-col" width={width} title="Toggle Select All">
				<SelectBox onClick={(e) => this.handleSelect(-1,e)} />
			</th>
		);
	}

	renderTableHeader(title, width){
		return (
			<TableHeader width={width} value={title} orderBy={this.state.orderBy} onClick={() => this.handleOrderBy(title)} />
		);
	}

	componentDidMount(){
		const previousState = localStorage.getItem('informationHistory_select');
		if(previousState){
			let state = JSON.parse(previousState);
			localStorage.removeItem('informationHistory_select');
			if(state.comparasion){
				this.setState(state);
			}
			else{
				this.filterData(state.paging.page, state.orderBy, state.filter);
			}
			
		}
		else{
			this.filterData(this.state.pageInfo.page);
		}
	}

	saveHistory = () =>{
		console.log("saved!");
		const state = Object.assign({}, this.state);
		let item = {
			filter:state.filter,
			orderBy:state.orderBy,
			paging:state.pageInfo,
			lastPage:state.lastPage,
			selected:state.selected,
			comparasion:state.comparasion,
			currTab:state.currTab
		};
		localStorage.setItem('informationHistory_select', JSON.stringify(item));
	}

	handleTabClick(i){
	    this.setState({currTab: i});
	}

  render() {
  		if(this.state.comparasion){
  			return (
			<div>
				<div id="filterLabels" className="filter-block col-md-12 lockedFilter">
					<div className="content-nav">
			            <a className="back" href="javascript:void(0);" onClick={this.goBack2Filter}><span className="glyphicon glyphicon-chevron-left"></span><span>Back to filter</span></a>
					</div>
				</div>
			  	<div id="data-table" className="level2 col-md-12">
					<div id="table-header" className="">
						<div>
							<div id="cohortDetailTabs">
								<TabBoard currTab={this.state.currTab} onClick={(i) => this.handleTabClick(i)}/>
							</div>
						</div>
					</div>
					<BoxBoard saveHistory={this.saveHistory} cohorts={this.state.selected} currTab={this.state.currTab} />
				</div>
			</div>
			);
  		}
  		else{
	  		const list = this.state.list;
	  		let content = list.map((item, index) => {
	  			let id = item.cohort_id;
	  			let url = './cohort?id='+id;
	  			let website = item.cohort_web_site;
	  			if(website.trim() === ""){
	  				website = "javascript:void(0);";
	  			}
	  			return (
	  				<tr key={id}>
	  					<td headers="table-select-col">
	  						<SelectBox onClick={() => this.handleSelect(id)} checked={this.state.selected.indexOf(id) > -1}/>
	  					</td>
						<td headers="cohort_name">
							<a href={website} target="_blank">{item.cohort_name}</a>
						</td>
						<td headers="cohort_acronym"><Link to={url} onClick={this.saveHistory}>{item.cohort_acronym}</Link></td>
						<td headers="date_form_completed"><Moment format="MM/DD/YYYY">{item.update_time}</Moment></td>
					</tr>
	  			);
	  		});
	  		if(content.length === 0){
	  			content = (
	  				<tr>
						<td colSpan="3">Nothing to display</td>
					</tr>
	  			);
	  		}
			return (
				<div>
			  <div id="cedcd-home-filter" className="filter-block home col-md-12">
			    <div className="panel panel-default">
			      <div className="panel-heading">
			        <h2 className="panel-title">Filter</h2>
			      </div>
			      <div className="panel-body">
			        <div className="filter row">
			          <div className="col-sm-3 filterCol">
			            <div className="filter-component">
			              <h3>Type of Participant</h3>
			              	<GenderList hasUnknown={true} values={this.state.filter.participant.gender} displayMax="3" onClick={this.handleGenderClick}/>
			              	<RaceList values={this.state.filter.participant.race} displayMax="3" onClick={this.handleRaceClick}/>
			              	<EthnicityList values={this.state.filter.participant.ethnicity} displayMax="3" onClick={this.handleEthnicityClick}/>
			              	<AgeList values={this.state.filter.participant.age} displayMax="3" onClick={this.handleAgeClick}/>
			            </div>
			          </div>
			          <div className="filterCol col-sm-6">
			            <div className="filter-component">
			              <h3>Data and Specimens Collected</h3>
			              <div className="row">
			                <div className="col-sm-4">
			                  	<CollectedDataList values={this.state.filter.collect.data} displayMax="5" onClick={this.handleDataClick}/>
			                </div>
			                <div className="col-sm-4">
			                  	<CollectedSpecimensList values={this.state.filter.collect.specimen} displayMax="5" onClick={this.handleSpecimenClick}/>
			                </div>
			                <div className="col-sm-4">
			                  	<CollectedCancersList hasNoCancer={false} title="Cancers Collected" innertitle="Cancers Collected"  hasSelectAll={false} values={this.state.filter.collect.cancer} displayMax="5" onClick={this.handleCancerClick}/>
			                </div>
			              </div>
			            </div>
			          </div>
			          <div className="filterCol col-sm-3 last">
			            <div className="filter-component">
			              	<h3>Study Design</h3>
			              	<DiseaseStateList values={this.state.filter.study.state} displayMax="5" onClick={this.handleStateClick}/>
			            </div>
			          </div> 
			        </div>
			        <div className="row">
			          <div id="submitButtonContainer" className="col-sm-3 col-sm-offset-9">
			            <a id="filterClear" className="btn-filter" href="javascript:void(0);" onClick={this.clearFilter}><span className="glyphicon glyphicon-remove"></span> Clear All</a>
			            <input type="submit" name="filterEngage" value="Apply Filter" className="btn btn-primary bttn_submit btn-filter" onClick={this.toFilter}/>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			  <div id="cedcd-home-cohorts" className="home col-md-12">
			    <div id="cedcd-home-cohorts-inner" className="col-md-12">
			      <div className="table-inner col-md-12">
			        <div className="table-description">
			          <p>Browse the list of cohorts or use the filter options to shorten the list of cohorts according to types of participants, data, and specimens.  Then select the cohorts about which you'd like to see details and select the <b>Submit</b> button.</p>
			        </div>
			        <div className="tableTopMatter row">
			          <div id="tableControls" className="col-md-6">
			            <ul className="table-controls">
			              <PageSummary pageInfo={this.state.pageInfo} />
			            </ul>
			          </div>
			          <div id="tableExport" className="col-md-2 col-md-offset-4">
			              <a id="exportTblBtn" href="javascript:void(0);">Export Table <span className="glyphicon glyphicon-export"></span></a>
			          </div>
			        </div>
			        <div className="cedcd-table home">
			        	<div>
							<table cellSpacing="0" cellPadding="5" useaccessibleheaders="true" showheaders="true" id="cohortGridView" >
								<thead>
									<tr id="summaryHeader" className="col-header">
										{this.renderSelectHeader("5%")}
										{this.renderTableHeader("cohort_name","60%")}
										{this.renderTableHeader("cohort_acronym","20%")}
										{this.renderTableHeader("update_time","15%")}
									</tr>
								</thead>
								<tbody>
									{content}
								</tbody>
							</table>
						</div>
			        </div>
			        <Paging pageInfo={this.state.pageInfo} onClick={(i) => this.gotoPage(i)}/>
			      </div>
			      <FloatingSubmit onClick={this.handleComparasion} values={this.state.selected} />
			    </div>
			  </div>
			</div>
			);
  		}
  }
}

export default Details;