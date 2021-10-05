import React, { Component } from 'react';
import './Cancer.css';
import GenderList from '../GenderList/GenderList';
import RaceList from '../RaceList/RaceList';
import EthnicityList from '../EthnicityList/EthnicityList';
import CohortList from '../CohortList/CohortList';
import CountsTable from '../CountsTable/CountsTable';
import CollectedCancersList from '../CollectedCancersList/CollectedCancersList';
import Workbook from '../Workbook/Workbook';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { ca } from 'date-fns/locale';
class Cancer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			originalResult: {},
			result: {},
			activePanel: "Bladder",
			filter: {
				gender: [],
				race: [],
				ethnicity: [],
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

	handleCancerClick = (v, allIds, e) => {
		let filter = Object.assign({}, this.state.filter);
		if (v) {
			let idx = filter.cancer.indexOf(v.id);
			filter.allCancers = false;
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
			filter.allCancers = !filter.allCancers;
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
			if (filter.allCohorts) filter.allCohorts = false;
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
			filter.allCohorts = !filter.allCohorts;
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
			cancer: [],
			cohort: [],
			allCancers: false,
			allCohorts: false
		};
		let resultCopy = { ...this.state.originalResult }
		this.setState({
			result: resultCopy,
			filter: filter
		});
		sessionStorage.removeItem('informationHistory_cancer');
	}

	handleActivePanleChange = (v) => {
		this.setState({ activePanel: v});
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
				if (!previousState) { reqBody.filter.cohort = []; reqBody.filter.allCohorts = false }
				Object.keys(this.state.originalResult).length > 0 ?
					this.setState({ result: rst, filter: reqBody.filter }) : this.setState({ originalResult: rst, result: rst, filter: reqBody.filter })
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
		} else {
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
			let topic = ["Ethnicity", "Race"];
			let cohorts = this.state.result.cohorts;
			let cancers = Object.assign([], this.state.result.cancers);

			let alldata = Object.assign([], this.state.result.list);

			let data_per_cancer = {};
			const others = [];
			const config = {
				blockWidth: 200,
				blockStyle: {
					width: "200px"
				},
				blockClass: "table-col-400"
			};
			let resultSex = [...new Set(alldata.filter(item => item.c0 !== 'All').map(item => item.c0))];
			let isDataIncluded = true;
			if (this.state.filter.gender && this.state.filter.gender.length > 0) {
				for (const item of this.state.filter.gender) {
					if (!resultSex.includes(item === 2 ? 'Males' : (item === 1 ? 'Females' : 1))) isDataIncluded = false;
				}
			} else {
				if (resultSex.length < 2) isDataIncluded = false;
			}

			if (this.state.activePanel && this.state.activePanel != '' && !cancers.includes(this.state.activePanel)) {
				this.state.activePanel = cancers[0]
			}

			content = cancers.map(element => {
				const cancerdata = alldata.filter(item => item.cancer == element);
				const { cancer, ...data_no_cancer } = cancerdata
				data_per_cancer = Object.assign([], data_no_cancer);
				let panelTitle=  element
				let data = {};
				if (isDataIncluded) {
					if (this.state.filter.gender && this.state.filter.gender.length === 2) {
						
						return (
							<CollapsiblePanel
								condition={this.state.activePanel === element }
								onClick={() => this.handleActivePanleChange(this.state.activePanel === element ? '' : element)}
								panelTitle={panelTitle}>
								<div>
									<div key={`{element}+"-F"`}>
										<span className="mt-4 mb-1 cancerTableTitle">
											<b> Females Cancer Counts </b>
										</span>
										<div className="interiorTable" style={{ position: "relative" }}>
											<CountsTable saveHistory={this.saveHistory} values={data_per_cancer.filter((item) => item.c0 === 'Females')} topic={topic} cohorts={cohorts} others={others} config={config} />
										</div>
									</div>
									<div className='mt-4' key={`{element}+"-M"`}>
										<span className="mt-4 mb-1 cancerTableTitle">
											<b> Males Cancer Counts </b>
										</span>
										<div className="interiorTable" style={{ position: "relative" }}>
											<CountsTable saveHistory={this.saveHistory} values={data_per_cancer.filter((item) => item.c0 === 'Males')} topic={topic} cohorts={cohorts} others={others} config={config} />
										</div>
									</div>
								</div>

							</CollapsiblePanel>
						);
					} else if (this.state.filter.gender && this.state.filter.gender.length === 1) {
						let sex = +this.state.filter.gender === 2 ? 'Males' : 'Females';
			
						return (
							<CollapsiblePanel
								condition={this.state.activePanel === element}
								onClick={() => this.handleActivePanleChange(this.state.activePanel === element ? '' : element)}
								panelTitle={panelTitle}>
								<div key={element}>
									<span className="mt-4 mb-1 cancerTableTitle">
											<b> {sex} Cancer Counts </b>
										</span>

									<div className="interiorTable" style={{ position: "relative" }}>
										<CountsTable saveHistory={this.saveHistory} values={data_per_cancer.filter((item) => item.c0 ==  sex )} topic={topic} cohorts={cohorts} others={others} config={config} />
									</div>
								</div>
							</CollapsiblePanel>
						);
					}
					else {
						data = data_per_cancer.filter((item) => item.c0 === 'All');
						return (
							<CollapsiblePanel
								condition={this.state.activePanel === element}
								onClick={() => this.handleActivePanleChange(this.state.activePanel === element ? '' : element)}
								panelTitle={panelTitle}>
								<div key={element}>
									<span className="mt-4 mb-1 cancerTableTitle">
											<b> All Sexes Cancer Counts </b>
										</span>

									<div className="interiorTable" style={{ position: "relative" }}>
										<CountsTable saveHistory={this.saveHistory} values={data} topic={topic} cohorts={cohorts} others={others} config={config} />
									</div>
								</div>
							</CollapsiblePanel>
						);
					}
				} else {
					data = data_per_cancer.filter((item) => item.c0 !== 'All');
					let sex = this.state.filter.gender === 2 ? 'Males' : 'Females';
					return (
						<CollapsiblePanel
							condition={this.state.activePanel === element}
							onClick={() => this.handleActivePanleChange(this.state.activePanel === element ? '' : element)}
							panelTitle={panelTitle}>
							<div key={element}>
								<span className="mt-4 mb-1 cancerTableTitle">
											<b> {sex} Cancer Counts </b>
										</span>

								<div className="interiorTable" style={{ position: "relative" }}>
									<CountsTable saveHistory={this.saveHistory} values={data} topic={topic} cohorts={cohorts} others={others} config={config} />
								</div>
							</div>
						</CollapsiblePanel>
					);
				}

			});
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
						<Workbook.Column label="Ethnicity" value="Ethnicity" />
						<Workbook.Column label="Race" value="Race" />
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
				<p className="welcome">To display cancer counts across cohorts, please specify Sex, Race, Ethnicity, Cancer Type(s), and Cohort(s) and then click the submit button. Individual tables for each selected cancers will be displayed with the number of cohort participants.
				</p>
				<div id="filter-block" className="filter-block col-md-12">
					<div id="filter-panel" className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Search</h2>
						</div>
						<div className="panel-body">
							<div className="row">
								<div className="col-sm-7 filterCol">
									<div className="col-sm-3 filterCol">
										<div id="gender_area" className="filter-component">
											<h3>Sex</h3>
											<GenderList hasBoth={false} hasUnknown={false} hasOnly={true} values={this.state.filter.gender} displayMax="3" onClick={this.handleGenderClick} />
										</div>
									</div>
									<div className="col-sm-5 filterCol">
										<div id="race" className="filter-component">
											<h3>Race</h3>
											<RaceList values={this.state.filter.race} displayMax="4" onClick={this.handleRaceClick} />
										</div>
									</div>
									<div className="col-sm-4 filterCol last">
										<div id="ethnicity" className="filter-component">
											<h3>Ethnicity</h3>
											<EthnicityList values={this.state.filter.ethnicity} displayMax="3" onClick={this.handleEthnicityClick} />
										</div>
									</div>
								</div>
								<div className="col-sm-5 filterCol last">
									<div className="col-sm-6 filterCol">
										<h3>Cancer Type</h3>
										<CollectedCancersList hasNoCancer={false} title="Cancer Type" innertitle="Select Cancer(s)" hasSelectAll={this.state.filter.allCancers}
											values={this.state.filter.cancer} displayMax="5" onClick={this.handleCancerClick} />
									</div>
									<div className="col-sm-6 filterCol last">
										<h3>Cohorts</h3>
										<CohortList values={this.state.filter.cohort} displayMax="4" onClick={this.handleCohortClick} hasSelectAll={this.state.filter.allCohorts} />
									</div>
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
									<a className="pull-right pt-0" id="filterClear" href="javascript:void(0);" onClick={this.clearFilter}><i className="fas fa-times"></i> Clear All</a>
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
								<CollapsiblePanelContainer>
									{content}
								</CollapsiblePanelContainer>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Cancer;