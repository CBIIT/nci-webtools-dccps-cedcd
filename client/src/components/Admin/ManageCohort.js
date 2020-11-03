import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageSummary from '../PageSummary/PageSummary';
import Paging from '../Paging/Paging';
import CohortStatusList from './CohortStatusList';
import TableHeaderManageCohort from './TableHeaderManageCohort';
import './ManageCohort.css';
import { filter, size } from 'lodash';

class ManageCohort extends Component {

	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			result: {},
			list: [],
			filter: {
				cohortstatus: [],
				cohortSearch: '',
			},
			orderBy: {
				column: "id",
				order: "desc"
			},
			pageInfo: { page: 1, pageSize: 10, total: 0 },
			lastPage: 1,
			prevBasicParams: {}
		};
		this.toFocus = React.createRef()
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
		this.filterData(1, null, null);
	}

	handleCohortSearchChange(changeEvent) {
		let filter = Object.assign(this.state.filter);
		filter.cohortSearch = changeEvent.target.value;
		this.setState({
			filter: filter
		});
		this.filterData(1, null, null);
	}

	handleCohortPageSizeChange = (e) => {
		this.pageData(1, null, null, e.target.value);
	}

	clearFilter = () => {
		let filter = {
			cohortstatus: [],
			cohortSearch: ''
		};

		this.filterData(1, null, filter);
	}

	toFilter = () => {

		this.filterData(1, null, null);

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
				let list = result.data.list;
				reqBody.paging.total = result.data.total;
				if (this._isMounted) {
					this.setState(prevState => (
						{
							list: list,
							filter: reqBody.filter,
							orderBy: reqBody.orderBy,
							pageInfo: reqBody.paging,
							lastPage: (i > -1 ? lastPage : i)
						}
					));
				}
			});
	}

	componentDidMount() {
		//console.dir(this.props)
		this._isMounted = true;
		this.props.setAdmin(1);

		this.filterData(1, this.state.orderBy, this.state.filter);

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	gotoPage(i) {
		this.pageData(i);
	}

	pageData(i, orderBy, filter, pagesize = -1) {

		const state = Object.assign({}, this.state);
		const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
		let reqBody = this.state.prevBasicParams;

		if (pagesize != -1) {
			reqBody.paging.pageSize = pagesize;
		}

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
			let id = item.id;
			let view_url = '/cohort?id=' + id;
			let review_url = '/cohort/questionnaire';
			let view = "View";
			let review = "Review";

			let select_id = "select_" + id;
			if (item.status === 'published' || item.status === 'draft') {
				return (
					<tr key={id}>
						<td>
							<Link to={view_url} onClick={this.saveHistory}>{item.name}</Link>
						</td>
						<td><Link to={view_url} onClick={this.saveHistory}>{item.acronym}</Link></td>
						<td class="text-capitalize">{item.status}</td>
						<td>{item.create_by}</td>
						<td>{item.update_time}</td>
						<td>
							<Link to={view_url} onClick={this.saveHistory}>{view}</Link>
						</td>
					</tr>
				);
			} else {
				return (
					<tr key={id}>
						<td>{item.name}</td>
						<td>{item.acronym}</td>
						<td class="text-capitalize">{item.status}</td>
						<td>{item.create_by}</td>
						<td>{item.update_time}</td>
						<td>
							<Link to={review_url} onClick={this.saveHistory}>{item.status != 'new' ? review : null}</Link>
						</td>
					</tr>
				);

			}
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
				<div className="filter-block col-md-12">
					<div className="col-sm-4 ">
						<div class="form-group has-feedback has-search">
							<span class="glyphicon glyphicon-search form-control-feedback"></span>
							<input type="text" class="form-control" value={this.state.filter.cohortSearch} placeholder="Search with key word " onChange={(e) => this.handleCohortSearchChange(e)} />
						</div>
					</div>
					<div className="col-sm-3 ">
						<div id="cohortstatus" className="filter-component">
							<CohortStatusList hasUnknown={true} values={this.state.filter.cohortstatus} displayMax="3" onClick={this.handleCohortStatusClick} />
						</div>
					</div>
					<div className="col-sm-3 ">
						<a id="filterClear" className="btn-filter" href="javascript:void(0);" onClick={this.clearFilter}>
							<i className="fas fa-times"></i> Clear All </a>

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
						<div class="pageSize">
							Page Size: <select name="pageSizeSelect" value={this.state.pageInfo.pageSize} onChange={(e) => this.handleCohortPageSizeChange(e)} >
								<option>Page Size</option>
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
							</select>
						</div>
						<div style={{ "marginLeft": "auto", "paddingRight": "1rem", "paddingTop": "7px" }}>

							<div>
								<PageSummary pageInfo={this.state.pageInfo} mid="true" />
							</div>

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
