import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './Home.css';
import PageSummary from '../PageSummary/PageSummary';
import Paging from '../Paging/Paging';
import TableHeader from '../TableHeader/TableHeader';
import Workbook from '../Workbook/Workbook';


class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			searchString:"",
			list:[],
			orderBy:{
				column:"cohort_acronym",
				order:"asc"
			},
			pageInfo:{page:1,pageSize:15,total:0},
			lastPage:1,
			data1:[]
		};
		this.changeText = this.changeText.bind(this);
		this.search = this.search.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	changeText(event){
		this.setState({
			searchString: event.target.value
		});
	}

	handleKeyPress(event){
		if(event.key == 'Enter'){
            event.preventDefault();
        	this.search(1);
        }
	}

	gotoPage(i){
		this.search(i);
	}

	toSearch = () =>{
		this.search(1);
	}

	search(i, orderBy, searchString){
		const state = Object.assign({}, this.state);
		if(searchString){
			state.searchString = searchString;
		}
		const lastPage = state.pageInfo.page;
		let reqBody = {
			searchText:state.searchString,
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
				reqBody.paging.total = result.data.total;
				this.setState(prevState => (
					{
						searchString: reqBody.searchText,
						list: list,
						orderBy: reqBody.orderBy,
						pageInfo: reqBody.paging,
						lastPage: (i > -1? lastPage : i)
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
		this.search(pageInfo.page,orderBy);
	}

	loadingData = (next) =>{
		
		const state = Object.assign({}, this.state);
		let reqBody = {
			searchText:state.searchString,
			orderBy:state.orderBy,
			paging:state.pageInfo
		};
		reqBody.paging.page = 0;
		fetch('./api/export/home',{
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

	renderTableHeader(title, percentage){
		return (
			<TableHeader width={percentage} value={title} orderBy={this.state.orderBy} onClick={() => this.handleOrderBy(title)} />
		);
	}

	componentDidMount(){
		const previousState = localStorage.getItem('informationHistory_home');
		if(previousState){
			let state = JSON.parse(previousState);
			localStorage.removeItem('informationHistory_home');
			this.search(state.paging.page, state.orderBy, state.searchText);
		}
		else{
			this.search(this.state.pageInfo.page);
		}
		
	}

	saveHistory = () =>{
		const state = Object.assign({}, this.state);
		let item = {
			searchText:state.searchString,
			orderBy:state.orderBy,
			paging:state.pageInfo
		};
		localStorage.setItem('informationHistory_home', JSON.stringify(item));
	}

  render() {
  		const list = this.state.list;
  		let content = list.map((item, index) => {
  			let id = item.cohort_id;
  			let url = "./cohort?id="+id;
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
  			return (
  				<tr key={id}>
					<td>
						<Link to={url} onClick={this.saveHistory}>{item.cohort_name}</Link>
					</td>
					<td><Link to={url} onClick={this.saveHistory}>{item.cohort_acronym}</Link></td>
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
  		
      return (
		<div>
			<input id="tourable" type="hidden" />
			<p className="welcome">Welcome! Below is the list of cohorts participating in the Cancer Epidemiology Descriptive Cohort Database (CEDCD). Search for a cohort by name or select a cohort to view a brief description and contact information. If you want to know more about one or more cohorts, select one of the options from the menu at the top.
			</p>
			<div id="cedcd-home-filter" className="home col-md-12">
			  <div className="search-wrapper col-md-12">
			  	<span className="searchField">
			    	<input name="inKeyword" type="text" aria-label="keyword" value={this.state.searchString} onChange={this.changeText} id="inKeyword" placeholder="Search for Cohorts by name or acronym" onKeyPress={this.handleKeyPress}></input>
			    </span>
			    <span className="searchBttn">
			    	<a id="btKeyword" href='javascript:void(0);' onClick={this.toSearch}>
			    		<div className="searchIcon">
			    			&#9906;
			    		</div>
			    	</a>
			    </span>
			  </div>
			</div>
			<div id="cedcd-home-cohorts" className="home col-md-12">
			  <div id="cedcd-home-cohorts-inner" className="col-md-12">
			    <div className="table-inner col-md-12">
			      <div className="tableTopMatter row">
			        <div id="tableControls" className="col-md-6">
			          <ul className="table-controls">
			          	<PageSummary pageInfo={this.state.pageInfo} />
			          </ul>
			        </div>
			        <div id="tableExport" className="col-md-2 col-md-offset-4">
			        	<Workbook dataSource={this.loadingData} element={<a id="exportTblBtn" href="javascript:void(0);">Export Table <span className="glyphicon glyphicon-export"></span></a>}>
					      <Workbook.Sheet name="Cohort_Selection">
					        <Workbook.Column label="Cohort Name" value="cohort_name"/>
					        <Workbook.Column label="Cohort Acronym" value="cohort_acronym"/>
					        <Workbook.Column label="Website" value="cohort_web_site"/>
					        <Workbook.Column label="Last Updated" value="update_time"/>
					      </Workbook.Sheet>
					      <Workbook.Sheet name="Criteria">
					      </Workbook.Sheet>
					    </Workbook>
		              
		            </div>
			      </div>
		          <div className="clearFix"></div>
		          <div className="cedcd-table home">
			        <div>
						<table cellSpacing="0" cellPadding="5" useaccessibleheaders="true" showheaders="true" id="summaryGridView" >
							<thead>
								<tr id="summaryHeader" className="col-header">
									{this.renderTableHeader("cohort_name","45%")}
									{this.renderTableHeader("cohort_acronym","20%")}
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
			  </div>
			</div>
		</div>
      );
  }
}

export default Home;