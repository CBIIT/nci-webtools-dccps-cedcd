import React, { Component } from 'react';
import CohortStatusList from './CohortStatusList';
import CountsTable from '../CountsTable/CountsTable';
import Workbook from '../Workbook/Workbook';

class ManageCohort extends Component {

	constructor(props) {
		super(props);
		this.state = {
			result: {},
			filter: {
				cohortstatus: [],
				allCohorts: false
			},
			orderBy: {
				column: "cohort_id",
				order: "desc"
			},
			pageInfo: { page: 1, pageSize: 15, total: 0 },
			lastPage: 1
		};
	}

	saveHistory = () => {
		const state = Object.assign({}, this.state);
		let item = {
			filter: state.filter
		};
		sessionStorage.setItem('informationHistory_adminmanage', JSON.stringify(item));
	}

	handleCohortStatusClick = (v) => {
		let filter = Object.assign(this.state.filter);
		let idx = filter.cohortstatus.indexOf(v.id);

		if (idx > -1) {
			//remove element
			filter.cohortstatus.splice(idx, 1);
		}
		else {
			//add element
			filter.cohortstatus.push(v.id);
		}
		this.setState({
			filter: filter
		});
	}

	clearFilter = () => {
		let filter = {
			cohortstatus: [],
			allCohorts: false
		};

		this.setState({
			result: {},
			filter: filter
		});

		sessionStorage.removeItem('informationHistory_adminmanage');
	}

	toFilter = () => {
		this.saveHistory();
		this.filterData();
	}

	filterData(i, orderBy, filter) {
		const state = Object.assign({}, this.state);
		const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
		let reqBody = {
			filter: state.filter,
			orderBy: state.orderBy,
			paging: state.pageInfo
		};
		if (i == -1) {
			reqBody.paging.page = state.lastPage;
		}
		else {
			reqBody.paging.page = i;
		}
		if (orderBy) {
			reqBody.orderBy = orderBy;
		}
		if (filter) {
			reqBody.filter = filter;
		}
		fetch('/api/managecohort/admincohortlist', {
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
						filter: reqBody.filter,
						orderBy: reqBody.orderBy,
						pageInfo: reqBody.paging,
						lastPage: (i > -1 ? lastPage : i)
					}
				));
			});
	}

	componentDidMount() {
		const previousState = sessionStorage.getItem('informationHistory_adminmanage');
		if (previousState) {
			let state = JSON.parse(previousState);
			this.filterData(state.filter);
		}
	}

	loadingData = (next) => {

		const state = Object.assign({}, this.state);
		let reqBody = {
			filter: state.filter
		};
		fetch('/api/export/enrollment', {
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
				let label = item === "Unknown" ? item : item + "s";
				return (
					<div key={key}>
						<label>
							Cohort List: {label}
						</label>
						<div className="interiorTable" style={{ position: "relative" }}>
							<CountsTable saveHistory={this.saveHistory} values={data_group[item]} topic={topic} cohorts={cohorts}
								others={others} config={config} />
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

		}
		return (
			<div>
				<input id="tourable" type="hidden" />
				<h1 className="welcome pg-title">Manage Cohorts</h1>
				<p className="welcome">Browse the list of cohorts or use the filter options to search cohorts according to cohort status.
				Then select the cohorts about which one you'd like to see the details or select the proper action to take on the cohort.
      		</p>
				<div id="filter-block" className="filter-block col-md-12">
					<div id="filter-panel" className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Specify</h2>
						</div>
						<div className="panel-body">
							<div className="filter row">
								<div className="col-sm-3 filterCol">
									<div id="cohortstatus" className="filter-component">
										<h3>Status</h3>
										<CohortStatusList hasUnknown={true} values={this.state.filter.cohortstatus} displayMax="3"
											onClick={this.handleCohortStatusClick} />
									</div>
								</div>
							</div>
							<div className="row">
								<div id="submitButtonContainer" className="col-sm-3 col-sm-offset-9">
									<a id="filterClear" className="btn-filter" href="javascript:void(0);" onClick={this.clearFilter}>
										<i className="fas fa-times"></i> Clear All </a>
									<input type="submit" name="submitBtn" value="Submit" id="submitBtn" className="btn btn-primary"
										onClick={this.toFilter} disabled={this.state.filter.cohortstatus.length === 0} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="level2 col-md-12">
					<div id="cedcd-cohorts-inner" className="col-md-12">
						<div className="table-inner col-md-12">
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

export default ManageCohort;
