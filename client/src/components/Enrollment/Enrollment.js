import React, { Component } from 'react';
import './Enrollment.css';
import GenderList from '../GenderList/GenderList';
import RaceList from '../RaceList/RaceList';
import EthnicityList from '../EthnicityList/EthnicityList';
import CohortList from '../CohortList/CohortList';
import CountsTable from '../CountsTable/CountsTable';
import Workbook from '../Workbook/Workbook';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
class Enrollment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			originalResult: {},
			result: {},
			filter: {
				gender: [],
				race: [],
				ethnicity: [],
				cohort: [],
				allCohorts: false
			}
		};
	}

	saveHistory = () => {
		const state = Object.assign({}, this.state);
		let item = {
			filter: state.filter
		};
		sessionStorage.setItem('informationHistory_enrollment', JSON.stringify(item));
	}

	handleGenderClick = (v) => {
		let filter = Object.assign(this.state.filter);
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

	handleRaceClick = (v) => {
		let filter = Object.assign(this.state.filter);
		let idx = filter.race.indexOf(v.id);

		if (idx > -1) {
			//remove element
			filter.race.splice(idx, 1);
		}
		else {
			//add element
			filter.race.push(v.id);
		}
		this.setState({
			filter: filter
		});
	}

	handleEthnicityClick = (v) => {
		let filter = Object.assign(this.state.filter);
		let idx = filter.ethnicity.indexOf(v.id);

		if (idx > -1) {
			//remove element
			filter.ethnicity.splice(idx, 1);
		}
		else {
			//add element
			filter.ethnicity.push(v.id);
		}
		this.setState({
			filter: filter
		});
	}

	handleCohortClick = (v, allIds, e) => {
		let filter = Object.assign(this.state.filter);
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
			race: [],
			ethnicity: [],
			cohort: [],
			allCohorts: false
		};
		let resultCopy = {...this.state.originalResult}
		this.setState({
			result: resultCopy,
			filter: filter
		});

		sessionStorage.removeItem('informationHistory_enrollment');
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
		fetch('./api/cohort/enrollment', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(result => {
				let rst = result.data;
				// move "More Than One Race" and "Unknown or Not Reported" to bottom list
				//	let olist = rst.list.map(x => (x.c2 === "More Than One Race" || x.c2 === "Unknown or Not Reported") ? { ...x, c2: ('Z' + x.c2) } : x);

				//	rst.list = olist.sort((a, b) => a.c2.localeCompare(b.c2)).map(x => (x.c2 === "ZMore Than One Race" || x.c2 === "ZUnknown or Not Reported") ? { ...x, c2: x.c2.slice(1) } : x);;
				//console.dir(rst)
				/*this.setState(prevState => (
					{
						result: rst,
						filter: reqBody.filter
					}
				)); */
				let previousState = sessionStorage.getItem('informationHistory_enrollment');
				if(!previousState) {reqBody.filter.cohort = []; reqBody.filter.allCohorts = false}
				Object.keys(this.state.originalResult).length > 0 ? 
					this.setState({result: rst, filter: reqBody.filter}) : this.setState({originalResult: rst, result: rst, filter: reqBody.filter})
			});
	}


	componentDidMount() {
		let previousState = sessionStorage.getItem('informationHistory_enrollment');
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
		fetch('./api/export/enrollment', {
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
			const topic = ["Ethnicity", "Race"];
			let cohorts = this.state.result.cohorts;
			let data_group = {};
			data_group["Male"] = [];
			data_group["Female"] = [];
			data_group["Unknown"] = [];
			let data = Object.assign([], this.state.result.list);
			data.forEach(function (element) {
				data_group[element.c0].push(element);
			});
			const others = ["total"];
			const config = {
				blockWidth: 200,
				blockStyle: {
					width: "200px"
				},
				blockClass: "table-col-400"
			};
			let sections = [];
			if (data_group["Male"].length > 0) {
				sections.push("Male");
			}
			if (data_group["Female"].length > 0) {
				sections.push("Female");
			}
			if (data_group["Unknown"].length > 0) {
				sections.push("Unknown");
			}
			content = sections.map((item, idx) => {
				let key = "section_" + idx;
				let label = item === "Unknown" ? "Unknown/Not Reported" : item + "s";
				return (
					<div key={key}>
						<label>
							Enrollment: {label}
						</label>
						<div className="interiorTable" style={{ position: "relative" }}>
							<CountsTable saveHistory={this.saveHistory} values={data_group[item]} topic={topic} cohorts={cohorts} others={others} config={config} />
						</div>
					</div>
				);
			});
			let cohorts_export = cohorts.map((item, idx) => {
				const key = "export_c_" + idx;
				return (
					<Workbook.Column key={key} label={item.cohort_acronym} value={item.cohort_acronym} />
				);
			});
			exportTable = (
				<Workbook dataSource={this.loadingData} element={<a id="exportTblBtn" href="javascript:void(0);">Export Table <i className="fas fa-file-export"></i></a>}>
					<Workbook.Sheet name="Enrollment_Counts">
						<Workbook.Column label="Ethnicity" value="Ethnicity" />
						<Workbook.Column label="Race" value="Race" />
						{cohorts_export}
						<Workbook.Column label="total" value="total" />
					</Workbook.Sheet>
					<Workbook.Sheet name="Criteria">
					</Workbook.Sheet>
				</Workbook>);
		}
		return (
			<div id="cedcd-main-content">
				<input id="tourable" type="hidden" />
				<h1 className="welcome pg-title">Enrollment Counts</h1>
				<p className="welcome">Specify the Sex, Race, Ethnicity, and Cohort(s) to see a table of the number of participants enrolled.  All fields are required.  A table will display the number of participants enrolled by sex, race and ethnicity across the selected cohorts.
      		</p>
				<div id="filter-block" className="filter-block col-md-12">
					<div id="filter-panel" className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Specify</h2>
						</div>
						<div className="panel-body">
							<div className="filter row">
								<div className="col-sm-3 filterCol">
									<div id="gender" className="filter-component">
										<h3>Sex</h3>
										<GenderList hasUnknown={true} hasBoth={false} values={this.state.filter.gender} displayMax="3" onClick={this.handleGenderClick} />
									</div>
								</div>
								<div className="col-sm-3 filterCol">
									<div id="race" className="filter-component">
										<h3>Race</h3>
										<RaceList values={this.state.filter.race} displayMax="4" onClick={this.handleRaceClick} />
									</div>
								</div>
								<div className="col-sm-3 filterCol">
									<div id="ethnicity" className="filter-component">
										<h3>Ethnicity</h3>
										<EthnicityList values={this.state.filter.ethnicity} displayMax="3" onClick={this.handleEthnicityClick} />
									</div>
								</div>
								<div className="col-sm-3 filterCol last">
									<h3>Cohorts</h3>
									<CohortList values={this.state.filter.cohort} displayMax="4" onClick={this.handleCohortClick} all_cohorts={this.state.filter.allCohorts} />
								</div>
							</div>
							{/*<div className="row">
								<a id="filterClear" className="btn-filter" style={{ "marginLeft": "auto" }} href="javascript:void(0);" onClick={this.clearFilter}><i className="fas fa-times"></i> Clear All</a>
								{/*<input type="submit" name="filterEngage"  value="Search Cohorts" className="btn btn-primary mr-3" onClick={this.toFilter} /> 
								<Button 
									id="submitBtn" 
									className="mr-3" 
									variant="primary"
									disabled={this.state.filter.gender.length === 0 && this.state.filter.race.length === 0 && this.state.filter.ethnicity.length === 0 && this.state.filter.cohort.length === 0}
									onClick={this.toFilter}>
									Submit
								</Button>	
							</div> */}
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
				<div className="level2 col-md-12">
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
