import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageSummary from '../PageSummary/PageSummary';
import Paging from '../Paging/Paging';
import CohortStatusList from './CohortStatusList';
import TableHeaderManageCohort from './TableHeaderManageCohort';

class ManageCohort extends Component {

	constructor(props) {
		super(props);
		this.state = {
			result: {},
			list: [],
			filter: {
				cohortstatus: [],
				allCohorts: false
			},
			orderBy: {
				column: "cohort_id",
				order: "desc"
			},
			pageInfo: { page: 1, pageSize: 15, total: 0 },
			lastPage: 1,
			prevBasicParams: {}
		};
		this.toFocus = React.createRef();
	}

	saveHistory = () => {
		const state = Object.assign({}, this.state);
		let item = {
			filter: state.filter,
			orderBy: state.orderBy
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
		this.setState({
			prevBasicParams: JSON.parse(JSON.stringify(reqBody)),
		})

		fetch('/api/managecohort/admincohortlist', {
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

	gotoPage(i) {
		this.pageData(i);
	}

	pageData(i, orderBy, filter, selected) {

		const state = Object.assign({}, this.state);
		const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
		let reqBody = this.state.prevBasicParams;
		if (i == -1) {
			reqBody.paging.page = state.lastPage;
		}
		else {
			reqBody.paging.page = i;
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
				let list = result.data.list;
				reqBody.paging.total = result.data.total;
				this.setState(prevState => (
					{
						list: list,
						filter: reqBody.filter,
						orderBy: reqBody.orderBy,
						pageInfo: reqBody.paging,
						lastPage: (i > -1 ? lastPage : i)
					}
				));
			});

	}


	loadingData = (next) => {
		const state = Object.assign({}, this.state);
		let reqBody = {
			filter: state.filter,
			items: state.items,
			orderBy: state.orderBy,
			paging: state.pageInfo
		};
		reqBody.paging.page = 0;
	}

	handleOrderBy(column) {
		let orderBy = Object.assign({}, this.state.orderBy);
		if (column == orderBy.column) {
			orderBy.order = orderBy.order == "asc" ? "desc" : "asc";
		}
		else {
			orderBy.column = column;
			orderBy.order = "asc";
		}
		let pageInfo = Object.assign({}, this.state.pageInfo);
		this.filterData(pageInfo.page, orderBy);
	}


	renderTableHeader(title, width) {
		return (
			<TableHeaderManageCohort width={width} value={title} orderBy={this.state.orderBy} onClick={() => this.handleOrderBy(title)} />
		);
	}

	render() {
		const list = this.state.list;
		let content = list.map((item, index) => {
			let id = item.cohort_id;
			let view_url = '/cohort?id=' + id;
			let review_url = '/managecohort';
			let view = "View";
			let review = "Review";

			let select_id = "select_" + id;
			return (
				<tr key={id}>
					<td>
						<Link to={view_url} onClick={this.saveHistory}>{item.name}</Link>
					</td>
					<td><Link to={view_url} onClick={this.saveHistory}>{item.acronym}</Link></td>
					<td>{item.status}</td>
					<td>{item.create_by}</td>
					<td>{item.update_time}</td>
					<td>
						<Link to={view_url} onClick={this.saveHistory}>{item.status === 'published' ? view : review}</Link>
					</td>
				</tr>
			);
		});
		if (content.length === 0) {
			content = (
				<tr>
					<td colSpan="3">Nothing to display</td>
				</tr>
			);
		}
		return (
			<div>
				<h1 className="welcome pg-title">Manage Cohorts</h1>
				<p className="welcome">Browse the list of cohorts or use the filter options to search cohorts according to cohort status.
				Then select the cohorts about which one you'd like to see the details or select the proper action to take on the cohort.
      		    </p>
				<div id="filter-block" className="filter-block col-md-12">
					<div id="filter-panel" className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Specify Filter Criteria</h2>
						</div>
						<div className="panel-body">
							<div className="filter row">
								<div className="col-sm-3 filterCol">
									<div id="cohortstatus" className="filter-component">
										<h3>Status</h3>
										<CohortStatusList hasUnknown={true} values={this.state.filter.cohortstatus} displayMax="3" onClick={this.handleCohortStatusClick} />
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
				<div className="filter-block home col-md-12">
					<div className="row" style={{ "display": "flex" }}>
						<div style={{ "marginLeft": "auto", "paddingLeft": "10px", "paddingRight": "1rem", "position": "relative", "paddingTop": "7px" }}>
							<PageSummary pageInfo={this.state.pageInfo} mid="true" />
						</div>
						<div style={{ "paddingRight": "15px", "paddingTop": "5px" }}>
							<Paging pageInfo={this.state.pageInfo} onClick={(i) => this.gotoPage(i)} />
						</div>
					</div>
				</div>

				<div className="table-inner col-md-12">
					<div className="cedcd-table home">
						<div>
							<table cellSpacing="0" cellPadding="5" useaccessibleheaders="true" showheaders="true" id="cohortGridView" >
								<thead>
									<tr id="summaryHeader" className="col-header">
										{this.renderTableHeader("name", "30%")}
										{this.renderTableHeader("acronym", "10%")}
										{this.renderTableHeader("status", "15%")}
										{this.renderTableHeader("create_by", "20%")}
										{this.renderTableHeader("update_time", "15%")}
										{this.renderTableHeader("action", "10%")}
									</tr>
								</thead>
								<tbody>
									{content}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="filter-block home col-md-12">
					<div className="row" style={{ "display": "flex" }}>
						<div style={{ "marginLeft": "auto", "paddingRight": "1rem", "paddingTop": "7px" }}>
							<PageSummary pageInfo={this.state.pageInfo} mid="true" />
						</div>

						<div style={{ "paddingRight": "15px", "paddingTop": "5px" }}>
							<Paging pageInfo={this.state.pageInfo} onClick={(i) => this.gotoPage(i)} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ManageCohort;