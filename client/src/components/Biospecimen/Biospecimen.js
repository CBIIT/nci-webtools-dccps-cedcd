import React, { Component } from 'react';
import './Biospecimen.css';
import SpecimenList from '../SpecimenList/SpecimenList';
import CohortList from '../CohortList/CohortList';
import CountsTable from '../CountsTable/CountsTable';
import CollectedCancersList from '../CollectedCancersList/CollectedCancersList';
import Workbook from '../Workbook/Workbook';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
class Biospecimen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			originalResult: {},
			result: {},
			filter: {
				allTyps: false,
				allCancers: false,
				allCohorts: false,
				specimen: [],
				cancer: [],
				cohort: []
			}
		};
	}

	saveHistory = () => {
		const state = Object.assign({}, this.state);
		let item = {
			filter: state.filter
		};
		sessionStorage.setItem('informationHistory_specimen', JSON.stringify(item));
	}

	handleSpecimenClick = (v, allIds, e) => {
		let filter = Object.assign({}, this.state.filter);
		if (v) {
			let idx = filter.specimen.indexOf(v.id);
			if (filter.allTypes) filter.allTypes = false;

			if (idx > -1) {
				//remove element
				filter.specimen.splice(idx, 1);
			}
			else {
				//add element
				filter.specimen.push(v.id);
			}
		}
		else {
			//click on the "all Types"\
			filter.allTypes = !filter.allTypes;
			filter.specimen = [];
			if (e.target.checked) {
				filter.specimen = allIds;
			}
		}
		this.setState({
			filter: filter
		});
	}

	handleCancerClick = (v, allIds, e) => {
		let filter = Object.assign({}, this.state.filter);
		if (v) {
			let idx = filter.cancer.indexOf(v.id);
			if (filter.allCancers) filter.allCancers = false;
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
			allTypes: false,
			allCancers: false,
			allCohorts: false,
			specimen: [],
			cancer: [],
			cohort: []
		};
		let resultCopy = { ...this.state.originalResult }
		this.setState({
			result: resultCopy,
			filter: filter
		});
		sessionStorage.removeItem('informationHistory_specimen');
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
		fetch('./api/cohort/specimen', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(result => {
				let rst = result.data;
				// move "All Other Cancers" and "No Cancer" to bottom list
				let olist = rst.list.map(x => (x.c2 === "All Other Cancers" || x.c2 === "No Cancer") ? { ...x, c2: ('Z' + x.c2) } : x);

				rst.list = olist.sort((a, b) => a.c1.localeCompare(b.c1) || a.c2.localeCompare(b.c2)).map(x => (x.c2 === "ZAll Other Cancers" || x.c2 === "ZNo Cancer") ? { ...x, c2: x.c2.slice(1) } : x);;
				let previousState = sessionStorage.getItem('informationHistory_specimen');
				if (!previousState) { reqBody.filter.cohort = []; reqBody.filter.allCohorts = false }
				Object.keys(this.state.originalResult).length > 0 ?
					this.setState({ result: rst, filter: reqBody.filter }) : this.setState({ originalResult: rst, result: rst, filter: reqBody.filter })
				/*this.setState(prevState => (
					{
						result: rst,
						filter: reqBody.filter
					}
				));*/
			});
	}

	componentDidMount() {
		const previousState = sessionStorage.getItem('informationHistory_specimen');
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
		fetch('./api/export/biospecimen', {
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
			const topic = ["Specimens Type", "Cancer"];
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
					<Workbook.Sheet name="Biospecimen_Counts">
						<Workbook.Column label="Specimens Type" value="Specimens Type" />
						<Workbook.Column label="Cancer" value="Cancer" />
						{cohorts_export}
					</Workbook.Sheet>
					<Workbook.Sheet name="Criteria">
					</Workbook.Sheet>
				</Workbook>);
		}
		return (
			<div id="cedcd-main-content" className="row">
				<input id="tourable" type="hidden" />
				<h1 className="welcome pg-title">Biospecimen Counts</h1>
				<p className="welcome">To display biospecimens across cohorts, specify the Specimen Type, one or more Cancer Type/All Cancers/No Cancer, and Cohort(s) and then select the submit button. All fields are required. A table will display the number of biospecimens across the selected cohorts by cancer type.
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
										<h3>Specimen Type</h3>
										<SpecimenList values={this.state.filter.specimen} hasSelectAll={this.state.filter.allTypes} displayMax="4" onClick={this.handleSpecimenClick} />
									</div>
								</div>
								<div className="col-sm-4 filterCol">
									<h3>Cancer Type</h3>
									<CollectedCancersList hasNoCancer={true} title="Cancer Type" innertitle="Select Cancer(s)" hasSelectAll={this.state.filter.allCancers}
										values={this.state.filter.cancer} displayMax="5" onClick={this.handleCancerClick} />
								</div>
								<div className="col-sm-4 filterCol last">
									<h3>Cohorts</h3>
									<CohortList values={this.state.filter.cohort} displayMax="4" onClick={this.handleCohortClick} hasSelectAll={this.state.filter.allCohorts} />
								</div>
							</div>
							{/*<div className="row">
								<div id="submitButtonContainer" className="col-sm-3 col-sm-offset-9">
									<a id="filterClear" className="btn-filter" href="javascript:void(0);" onClick={this.clearFilter}><i className="fas fa-times"></i> Clear All</a>
									<input type="submit" name="submitBtn" value="Submit" id="submitBtn" className="btn btn-primary" onClick={this.toFilter} disabled={this.state.filter.specimen.length === 0 && this.state.filter.cancer.length === 0 && this.state.filter.cohort.length === 0} />
								</div>
							</div> */}
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