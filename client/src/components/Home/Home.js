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
				column:"cohort_name",
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
			//this.search(state.paging.page, state.orderBy, state.searchText);
		}
		else{
			//this.search(this.state.pageInfo.page);
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
  			let website_content = "";
  			if(website =="Not Available"){
  				website_content = ("Not Available");
  			}
  			if(!website.startsWith("http") && !website.startsWith("www")){
  				website = "";
  			}
  			let website_label = website;
  			if(website.length > 30){
  				website_label = website.substring(0,27) + "...";
  			}
  			
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
			<img src="./assets/img/HomeHeader.jpeg" alt="Header" style={{width:"100%",  padding: "0 1.5rem", marginBottom:"2rem"}}></img>
            <p className="welcome">The Cancer Epidemiology Descriptive Cohort Database (CEDCD) contains descriptive information about cohort studies that follow groups of persons over time for cancer incidence, mortality, and other health outcomes.   The CEDCD is a searchable database that contains general study information (e.g., eligibility criteria and size), the type of data collected at baseline, cancer sites, number of participants diagnosed with cancer, and biospecimen information. All data included in this database are aggregated for each cohort; there are no individual level data. The goal of the CEDCD is to facilitate collaboration and highlight the opportunities for research within existing cohort studies.</p>
			<div className="row-for-home-grid" style={{"margin-bottom":"50px"}}>
				<div className="column-for-home-grid" style={{ "padding-left":"0px"}}>
					<Link to={"select"} className="link-text">
						<div className="animation-card" style={{"background-color":"#2868af"}} align="center">
							<div className="card-top-coloring" style={{"background-color":"5da9d3"}}>
								{/*<img src="./assets/img/Search_Cohorts_Icon.png" alt="Header" style={{width:"100%"}}></img>*/}
								<img src="./assets/img/Search_Cohorts_Icon.png" alt="Header" style={{width:"60%", paddingTop:"20px"}}></img>

							</div>
							<h2 class="card-header" align = "center" id = "ToolName1">Search Cohorts</h2>
							<p class="card-text" align = "center">Browse the full list of cohorts or search for cohorts based on eligibility requirements (e.g., gender, race, age) and/or types of data collected (e.g., smoking, diet, serum).</p>
						</div>
					</Link>
				</div>
				<div className="column-for-home-grid">
					<Link to={"enrollment"} className="link-text">
						<div className="animation-card" style={{"background-color":"#c1270e"}} align="center">
							<div className="card-top-coloring" style={{"background-color":"cf5848"}}>
							<img src="./assets/img/Enrollment_Counts_Icon.png" alt="Header" style={{width:"60%", "padding-top":"30px" }}></img>

							</div>
							<h2 class="card-header" align = "center">Enrollment Counts</h2>
							<p class="card-text" align = "center">Display enrollment counts across cohorts with the option search for specific gender, race, and ethnicity terms.</p>
						</div>
					</Link>
				</div>
				<div className="column-for-home-grid">
					<Link to={"cancer"} className="link-text">
					<div className="animation-card" style={{"background-color":"#c27600"}} align="center">
						<div className="card-top-coloring" style={{"background-color":"ffbf58"}}>
						<img src="./assets/img/Cancer_Counts_Icon.png" alt="Header" style={{width:"100%"}}></img>

						</div>
						<h2 class="card-header" align = "center">Cancer Counts</h2>
						<p class="card-text" align = "center">Display cancer counts across cohorts with the option to search for specific cancer sites and also by gender.</p>
					</div>
					</Link>
				</div>
				<div className="column-for-home-grid" style={{ "padding-right":"0px"}}>
					<Link to={"biospecimen"} className="link-text">
						<div className="animation-card" style={{"background-color":"#588c35"}} align="center">
							<div className="card-top-coloring" style={{"background-color":"99b883"}}>
							<img src="./assets/img/Biospecimen_Counts_Icon.png" alt="Header" style={{width:"100%"}}></img>

							</div>
							<h2 class="card-header" align = "center">Biospecimen Counts</h2>
							<p class="card-text"align = "center">Search biospecimens across cohorts with the option to specify the type of biospecimen and find specimens in participants diagnosed with specific cancer sites.</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
      );
  }
}

export default Home;