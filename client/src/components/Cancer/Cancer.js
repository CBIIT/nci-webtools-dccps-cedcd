import React, { Component } from 'react';
import './Cancer.css';
import GenderList from '../GenderList/GenderList';
import CohortList from '../CohortList/CohortList';
import CountsTable from '../CountsTable/CountsTable';
import CollectedCancersList from '../CollectedCancersList/CollectedCancersList';
import Workbook from '../Workbook/Workbook';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
class Cancer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			originalResult: {},
			result: {},
			filter: {
				gender: [],
				cancer: [],
				cohort: [],
				allCancers: false,
				allCohorts: false
			}
		};
	}

	saveHistory = () => {
		const state = Object.assign({}, this.state);
		let item = {
			filter: state.filter
		};
		sessionStorage.setItem('informationHistory_cancer', JSON.stringify(item));
	}

	handleGenderClick = (v) => {
		let filter = Object.assign({}, this.state.filter);
		let idx = filter.gender.indexOf(v.id);

		if (idx > -1) {
			//remove element
			filter.gender.splice(idx, 1);
		}
		else {
			//add element
			filter.gender.push(v.id);
		}
		this.setState({
			filter: filter
		});
	}

	handleCancerClick = (v, allIds, e) => {
		let filter = Object.assign({}, this.state.filter);
		if (v) {
			let idx = filter.cancer.indexOf(v.id);
			if (idx > -1) {
				//remove element
				filter.cancer.splice(idx, 1);
			}
			else {
				//add element
				filter.cancer.push(v.id);
			}
		}
		else {
			//click on the "all cohort"
			filter.allCancers = !this.state.filter.allCancers;
			filter.cancer = [];
			if (e.target.checked) {
				filter.cancer = allIds;
			}
		}
		this.setState({
			filter: filter
		});
	}

	handleCohortClick = (v, allIds, e) => {
		let filter = Object.assign({}, this.state.filter);
		if (v) {
			let idx = filter.cohort.indexOf(v.id);
			if (idx > -1) {
				//remove element
				filter.cohort.splice(idx, 1);
			}
			else {
				//add element
				filter.cohort.push(v.id);
			}
		}
		else {
			//click on the "all cohort"
			filter.allCohorts = !this.state.filter.allCohorts;
			filter.cohort = [];
			if (e.target.checked) {
				filter.cohort = allIds;
			}
		}
		this.setState({
			filter: filter
		});
	}

	clearFilter = () => {
		let filter = {
			gender: [],
			cancer: [],
			cohort: [],
			allCancers: false,
			allCohorts: false
		};
		let resultCopy = {...this.state.originalResult}
		this.setState({
			result: resultCopy,
			filter: filter
		});
		sessionStorage.removeItem('informationHistory_cancer');
	}

	toFilter = () => {
		this.saveHistory();
		this.filterData();
	}

	filterData(filter) {
		const state = Object.assign({}, this.state);
		let reqBody = {
			filter: state.filter
		};
		if (filter) {
			reqBody.filter = filter;
		}
		fetch('./api/cohort/cancer', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(result => {
				let rst = result.data;
				let previousState = sessionStorage.getItem('informationHistory_cancer');
				if(!previousState) {reqBody.filter.cohort = []; reqBody.filter.allCohorts = false}
				Object.keys(this.state.originalResult).length > 0 ? 
					this.setState({result: rst, filter: reqBody.filter}) : this.setState({originalResult: rst, result: rst, filter: reqBody.filter})
				/*this.setState(prevState => (
					{
						result: rst,
						filter: reqBody.filter
					}
				)); */
			});
	}

	componentDidMount() {
		const previousState = sessionStorage.getItem('informationHistory_cancer');
		if (previousState) {
			let state = JSON.parse(previousState);
			this.filterData(state.filter);
		}else{
			this.filterData(this.state.filter)
		}
	}

	loadingData = (next) => {

		const state = Object.assign({}, this.state);
		let reqBody = {
			filter: state.filter
		};
		fetch('./api/export/cancer', {
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

	render() {
		let content = "";
		let exportTable = "";
		if (this.state.result.list && this.state.result.list.length > 0) {
			const topic = ["Cancer", "Sex"];
			let cohorts = this.state.result.cohorts;
			let data = Object.assign([], this.state.result.list);
			const others = [];
			const config = {
				blockWidth: 200,
				blockStyle: {
					width: "200px"
				},
				blockClass: "table-col-400"
			};
			content = (
				<div className="interiorTable" style={{ position: "relative" }}>
					<CountsTable saveHistory={this.saveHistory} values={data} topic={topic} cohorts={cohorts} others={others} config={config} />
				</div>
			);
			let cohorts_export = cohorts.map((item, idx) => {
				const key = "export_c_" + idx;
				return (
					<Workbook.Column key={key} label={item.cohort_acronym} value={item.cohort_acronym} />
				);
			});
			exportTable = (
				<Workbook dataSource={this.loadingData} element={<a id="exportTblBtn" href="javascript:void(0);">Export Table <i className="fas fa-file-export"></i></a>}>
					<Workbook.Sheet name="Cancer_Counts">
						<Workbook.Column label="Cancer" value="Cancer" />
						<Workbook.Column label="Gender" value="Gender" />
						{cohorts_export}
					</Workbook.Sheet>
					<Workbook.Sheet name="Criteria">
					</Workbook.Sheet>
				</Workbook>);
		}
		return (
			<div id="cedcd-main-content" className="row">
				<input id="tourable" type="hidden" />
				<h1 className="welcome pg-title">Cancer Counts</h1>
				<p className="welcome">To display cancer counts across cohorts, specify Sex, Cancer Type(s), and Cohort(s) and then select the submit button.  All fields are required.  A table will display the number of cohort participants with the selected cancers.
        </p>
				<div id="filter-block" className="filter-block col-md-12">
					<div id="filter-panel" className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Specify</h2>
						</div>
						<div className="panel-body">
							<div className="row">
								<div className="col-sm-4 filterCol">
									<div id="gender_area" className="filter-component">
										<h3>Sex</h3>
										<GenderList hasBoth={false} hasUnknown={false} hasOnly={true} values={this.state.filter.gender} displayMax="3" onClick={this.handleGenderClick} />
									</div>
								</div>
								<div className="col-sm-4 filterCol">
									<h3>Cancer Type</h3>
									<CollectedCancersList hasNoCancer={false} title="Cancer Type" innertitle="Select Cancer(s)" hasSelectAll={true} values={this.state.filter.cancer} displayMax="5" onClick={this.handleCancerClick} all_cancers={this.state.filter.allCancers} />
								</div>
								<div className="col-sm-4 filterCol last">
									<h3>Cohorts</h3>
									<CohortList values={this.state.filter.cohort} displayMax="4" onClick={this.handleCohortClick} all_cohorts={this.state.filter.allCohorts} />
								</div>
							</div>
						{/*}	<div className="row">
								<a id="filterClear" className="btn-filter" style={{ "marginLeft": "auto" }} href="javascript:void(0);" onClick={this.clearFilter}><i className="fas fa-times"></i> Clear All</a>
								{/*<input type="submit" name="filterEngage"  value="Search Cohorts" className="btn btn-primary mr-3" onClick={this.toFilter} />	
								<Button 
									id="submitBtn" 
									className="mr-3" 
									variant="primary"
									disabled={this.state.filter.gender.length === 0 && this.state.filter.cancer.length === 0 && this.state.filter.cohort.length === 0}
									onClick={this.toFilter}>
									Submit
								</Button>	
							</div>	*/}	
							<Row xs={12} className="mr-0 pr-0">
								<Col className="mr-0 pr-0">
									<Button 
										className="pull-right"
										variant="primary"
										onClick={this.toFilter}>
										Submit
									</Button>
									<a className="pull-right pt-0" id="filterClear"  href="javascript:void(0);" onClick={this.clearFilter}><i className="fas fa-times"></i> Clear All</a>	
								</Col>
							</Row>					
						</div>
					</div>
				</div>
				<div id="data-table" className="level2 col-md-12">
					<div id="cedcd-cohorts-inner" className="col-md-12">
						<div className="table-inner col-md-12">
							<div className="tableTopMatter row">
								<div id="tableLegend" className="col-md-10">
									<p>{/* N/A: Not Applicable; N/P: Not Provided */} </p>
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