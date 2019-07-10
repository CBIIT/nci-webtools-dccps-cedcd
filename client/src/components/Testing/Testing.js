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
import Workbook from '../Workbook/Workbook';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Collapse} from 'reactstrap';

class Details extends Component {

	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
      list:[],
      selectionList:[[],[],[]],
      booleanStates:[
        'AND',
        'AND',
        'AND'
      ],
      items: [
        'Select',
        'Select',
        'Select'
      ],
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
			currTab:0,
			selectAll:false,
			collapse: true,
		};
  }
  
  
  removeItem(index) {
    const { items, booleanStates, selectionList } = this.state;
    if(items.length > 1){
      items.splice(index, 1);
      booleanStates.splice(index, 1);
      selectionList.splice(index, 1);
      this.setState({ 
        items: items,
        booleanStates: booleanStates,
        selectionList: selectionList
      });
    }
  }

  addItem(index) {
	const { items, booleanStates, selectionList } = this.state;
  items.splice(index,0,'Select');
  booleanStates.splice(index,0,'AND');
  selectionList.splice(index,0,[]);
  console.log(items);
  console.log(booleanStates);
  console.log("selectionList");
  for(var i = 0; i < selectionList.length; i++){
    console.log(selectionList[i]);
  }
    this.setState({
      items: items,
      booleanStates:booleanStates,
      selectionList: selectionList
    });
    this.itemInput = null;
  }

  handleSelectChange(e, index){
      const { items, selectionList } = this.state;
      items[index]= e.target.value;
      const currSelect = selectionList[index];
      currSelect.splice(0, currSelect.length);
      selectionList[index] = currSelect;
      this.setState({
        items: items,
        selectionList: selectionList
      });
  }

  handleGeneralListClick(v, index){
    const {selectionList} = this.state;
    const currList = selectionList[index];
    let idx = selectionList[index].indexOf(v);
    
		if(idx > -1){
			//remove element
			currList.splice(idx,1);
		}
		else{
			//add element
			currList.push(v);
    }
    selectionList[index] = currList;
		this.setState({
			selectionList: selectionList
    });
    
  }
  
	handleCancerClick (v,allIds,e,index){
		const {selectionList} = this.state;
    	const currList = selectionList[index];
   
    
		if(v){
      		let idx = selectionList[index].indexOf(v);
			if(idx > -1){
        		//remove element
        		currList.splice(idx,1);
      		}
      		else{
        		//add element
        		currList.push(v);
      		}
		}
		else{
			//click on the "all cohort"
			currList.splice(0,currList.length);
			if(e.target.checked){
        		allIds.forEach(function(element){
          			currList.push(element );
        		});
			}
    }
    selectionList[index] = currList;
		this.setState({
			selectionList: selectionList
		});
  }

  createSelectItems(index) {

    const {items} = this.state;
    const currItem = items[index];
    if(currItem == "Gender"){
      return <GenderList class="select-box" hasUnknown={true} values={this.state.selectionList[index]} displayMax="3" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Race"){
      return <RaceList class="select-box" values={this.state.selectionList[index]} displayMax="3" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Ethnicity"){
      return <EthnicityList class="select-box" values={this.state.selectionList[index]} displayMax="3" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Age"){
      return <AgeList class="select-box" values={this.state.selectionList[index]} displayMax="3" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "State"){
      return <DiseaseStateList class="select-box" values={this.state.selectionList[index]} displayMax="5" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Categories"){
      return <CollectedDataList class="select-box" values={this.state.selectionList[index]} displayMax="5" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Biospecimen"){
      return <CollectedSpecimensList class="select-box" values={this.state.selectionList[index]} displayMax="5" onClick={v => this.handleGeneralListClick(v, index)}/>;
    }
    else if(currItem == "Cancers"){
      return <CollectedCancersList class="select-box" hasNoCancer={false} title="Cancers Collected" innertitle="Cancers Collected"  hasSelectAll={true} values={this.state.selectionList[index]} displayMax="5" onClick={(v,allIds,e) => this.handleCancerClick(v, allIds, e, index)}/>;
    }

    return <div class="select-box"></div>;

  }

  createBoolean(index){
    const { booleanStates } = this.state;
    if(index > 0){
      return <select class="boolean-selector" value = {booleanStates[index]} onChange={e => this.handleBooleanChange(e,index)}>
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>
    }
    return <p class = "boolean-selector"></p>;
  }

  createSelector(index){
	  if(index > 0){
		return <select class="type-selector" value={this.state.items[index]} onChange={e => this.handleSelectChange(e,index)}>
          <option value="Select" selected disabled hidden>-Select type-</option>
          <option value="Gender">Gender</option>
          <option value="Race">Race</option>
          <option value="Ethnicity">Ethnicity</option>
          <option value="Age">Age at Baseline</option>
          <option value="State">Study Population</option>
          <option value="Categories">Categories of Data Collected</option>
          <option value="Biospecimen">Types of Biospecimens Collected</option>
          <option value="Cancers">Cancers Collected</option>
        </select>
	  }
	  return <select class="type-selector" value={this.state.items[index]} onChange={e => this.handleSelectChange(e,index)}>
		<option value="Select" selected disabled hidden>-Select type-</option>
	  	<option value="Gender">Gender</option>
	  	<option value="Race">Race</option>
	  	<option value="Ethnicity">Ethnicity</option>
	  	<option value="Age">Age at Baseline</option>
	  	<option value="State">Study Population</option>
	  	<option value="Categories">Categories of Data Collected</option>
	  	<option value="Biospecimen">Types of Biospecimens Collected</option>
	  	<option value="Cancers">Cancers Collected</option>
	  </select>
  }

  handleBooleanChange(e, index){
    const { booleanStates } = this.state;
    booleanStates[index] = e.target.value;
    this.setState({
      booleanStates:booleanStates
    });
  }


	toggle() {
		this.setState(state => ({ collapse: !state.collapse }));
	}

	loadingData = (next) =>{
		const state = Object.assign({}, this.state);
		let reqBody = {
			filter:state.filter,
			orderBy:state.orderBy,
			paging:state.pageInfo
		};
		reqBody.paging.page = 0;
		fetch('./api/export/select',{
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
		        'Content-Type': 'application/json'
		    }
		})
			.then(res => res.json())
			.then(result => {
				let list = result.data;
				next(list);
			});
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
		this.toggle();
		this.filterData(1,null,null,[]);
	}

	filterData(i, orderBy, filter,selected){
		const state = Object.assign({}, this.state);
		const lastPage = state.pageInfo.page == 0 ? state.lastPage: state.pageInfo.page;
		let reqBody = {
			filter: state.filter,
			selectionList: state.selectionList,
			items: state.items,
			booleanStates: state.booleanStates,
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
		/*if(filter){
			reqBody.filter = filter;
		}*/
		fetch('./api/cohort/testSelect',{
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
		        'Content-Type': 'application/json'
		    }
		})
			.then(res => res.json())
			.then(result => {
				console.log(result.data.list);
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
				//select all cohorts
				const state = Object.assign({}, this.state);;
				let reqBody = {
					filter:state.filter,
					selectionList: state.selectionList,
					booleanStates: state.booleanStates,
					items: state.items,
					orderBy:state.orderBy,
					paging:{}
				};
				reqBody.paging.page = 0;
				console.log(state.filter.participant.gender);
				fetch('./api/cohort/testSelect',{
					method: "POST",
					body: JSON.stringify(reqBody),
					headers: {
				        'Content-Type': 'application/json'
				    }
				})
					.then(res => res.json())
					.then(result => {
						let list = result.data.list;
						list.forEach(function(t){
							selected.push(t.cohort_id);
						});
						this.setState({
							selected: selected,
							selectAll:true
						});
					});
			}
			else{
				this.setState({
					selected: selected,
					selectAll:false
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
			this.setState({
				selected: selected
			});
		}
		
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
			<th id="table-select-col" width={width} title="Select / Deselect All Cohorts">
				<SelectBox id="select_all" label="Select / Deselect All Cohorts" onClick={(e) => this.handleSelect(-1,e)} checked={this.state.selectAll}/>
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

	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

  render() {
  		if(this.state.comparasion){
  			return (
			<div>
				<div id="filterLabels" className="filter-block col-md-12 lockedFilter">
					<div className="content-nav">
			            <a className="back" href="javascript:void(0);" onClick={this.goBack2Filter}><i className="fas fa-chevron-left"></i>&nbsp;<span>Back to filter</span></a>
					</div>
				</div>
				<div className="table-description">
					<p>The Cohort Overview compares the cohort design and the types of data and specimens collected across the cohorts you selected. To view more information about a specific cohort, select the acronym of the cohort at the top of the table.</p>
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
				if(!website.startsWith("http") && !website.startsWith("www")){
					website = "";
				}
				let website_label = website;
				if(website.length > 30){
					website_label = website.substring(0,27) + "...";
				}
				let website_content = "";
	  			if(website !== ""){
	  				website_content = (<a href={website} title={website} target="_blank">{website_label}</a>);
	  			}
	  			let select_id = "select_"+id;
	  			return (
	  				<tr key={id}>
	  					<td>
	  						<SelectBox  id={select_id} label={id} onClick={() => this.handleSelect(id)} checked={this.state.selected.indexOf(id) > -1}/>
	  					</td>
						<td>
							<Link to={url} onClick={this.saveHistory}>{item.cohort_name}</Link>
						</td>
						<td><Link to={url} onClick={this.saveHistory}>{item.cohort_acronym}</Link></td>
						<td align="center">{item.race_total_total > -1 ? this.numberWithCommas(item.race_total_total) : 0}</td>
						<td>{website_content}</td>
						<td><Moment format="MM/DD/YYYY">{item.update_time}</Moment></td>
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
        const { items, itemText } = this.state;
    const itemList = items.map((item, index) => (
      <div class="grid-container">

		{this.createBoolean(index)}
		{this.createSelector(index)}
        
        <button class="add-button"onClick={e => this.addItem(index+1)}>
          +
        </button>
        <button class="remove-button" onClick={e => this.removeItem(index)}>
          &times;
        </button>
		<p class = "boolean-selector"></p>
        {this.createSelectItems(index)}
	    	
      </div>
    ));
			return (
				<div>
				<input id="tourable" type="hidden" />
				<p className="welcome">Browse the list of cohorts or use the filter options to shorten the list of cohorts according to types of participants, data, and specimens.  Then select the cohorts about which you'd like to see details and select the Submit button.
				</p>
			  <div id="cedcd-home-filter" className="filter-block home col-md-12">
			    <div id="filter-panel" className="panel panel-default">
					<div className="panel-heading" onClick={this.toggle}>
						<h2 className="panel-title">Variables Collected in Cohort Study</h2>
						<span className={`pull-right d-inline-block ${this.state.collapse ? 'toggle-up' : 'toggle-down'}`}>
							<i class="fas fa-chevron-up" id="toggle-switch"></i>
						</span>
					</div>
					<Collapse isOpen={this.state.collapse}>
			      <div className="panel-body">
              {itemList}
			        <div className="row">
			          <div id="submitButtonContainer" className="col-sm-3 col-sm-offset-9">
			            <a id="filterClear" className="btn-filter" href="javascript:void(0);" onClick={this.clearFilter}><i className="fas fa-times"></i> Clear All</a>
			            <input type="submit" id="filterEngage" name="filterEngage" value="Search Cohorts" className="btn btn-primary btn-filter" onClick={this.toFilter}/>
			          </div>
			        </div>
			      </div>
				  </Collapse>
			    </div>
			  </div>
			  <div id="cedcd-home-cohorts" className="home col-md-12">
			    <div id="cedcd-home-cohorts-inner" className="col-md-12">
			      <div className="table-inner col-md-12">
			        <div className="tableTopMatter row">
			          <div id="tableControls" className="col-md-6">
			            <ul className="table-controls">
			              <PageSummary pageInfo={this.state.pageInfo}/>
			            </ul>
			          </div>
			          <div id="tableExport" className="col-md-2 col-md-offset-4">
			          	<Workbook dataSource={this.loadingData} element={<a id="exportTblBtn" href="javascript:void(0);">Export Table <i className="fas fa-file-export"></i></a>}>
					      <Workbook.Sheet name="Cohort_Selection">
					        <Workbook.Column label="Cohort Name" value="cohort_name"/>
					        <Workbook.Column label="Cohort Acronym" value="cohort_acronym"/>
					        <Workbook.Column label="Total Enrollment" value="race_total_total"/>
					        <Workbook.Column label="Website" value="cohort_web_site"/>
					        <Workbook.Column label="Last Updated" value="update_time"/>
					      </Workbook.Sheet>
					      <Workbook.Sheet name="Criteria">
					      </Workbook.Sheet>
					    </Workbook>
			          </div>
			        </div>
			        <div className="cedcd-table home">
			        	<div>
							<table cellSpacing="0" cellPadding="5" useaccessibleheaders="true" showheaders="true" id="cohortGridView" >
								<thead>
									<tr id="summaryHeader" className="col-header">
										{this.renderSelectHeader("5%")}
										{this.renderTableHeader("cohort_name","30%")}
										{this.renderTableHeader("cohort_acronym","10%")}
										{this.renderTableHeader("race_total_total","20%")}
										<th className="sortable" width="20%" scope="col">
											<a href="javascript:void(0);" style={{cursor:'default'}}>Website
											</a>
										</th>
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