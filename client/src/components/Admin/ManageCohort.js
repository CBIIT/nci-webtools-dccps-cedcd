import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageSummary from '../PageSummary/PageSummary';
import Paging from '../Paging/Paging';
import CohortStatusList from './CohortStatusList';
import TableHeaderManageCohort from './TableHeaderManageCohort';
import RequireAuthorization from '../RequireAuthorization/RequireAuthorization';

import './ManageCohort.css';
import { filter, size } from 'lodash';

class ManageCohort extends Component {

	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			result: {},
			list: [],
			dataList: [],
			filter: {
				cohortstatus: [],
				cohortSearch: '',
			},
			orderBy: {
				column: "acronym",
				order: "asc"
			},
			pageInfo: { page: 1, pageSize: 15, total: 0 },
			lastPage: 1,
			viewAllFlag: false
		};
		this.toFocus = React.createRef()
	}


	handleCohortStatusClick = (v) => {
		const state = Object.assign({}, this.state);
		let filter = state.filter;
		let list = state.dataList;
		let paging = state.pageInfo;
		let idx = filter.cohortstatus.indexOf(v.id);

		if (idx > -1) {
			//remove element
			filter.cohortstatus.splice(idx, 1);
		}
		else {
			//add element
			filter.cohortstatus.push(v.id);
		}

		list = list.filter(function (item) {
			if (filter.cohortstatus.length > 0 && !filter.cohortstatus.includes(item.status_id)) return false;
			if (!filter.cohortSearch || (item.name).toLowerCase().includes((filter.cohortSearch).toLowerCase())) return true;
			if (!filter.cohortSearch || (item.acronym).toLowerCase().includes((filter.cohortSearch).toLowerCase())) return true;
			return false;
		}
		);

		paging.total = list.length;

		this.setState({
			filter: filter,
			list: list.slice(0, paging.pageSize),
			pageInfo: paging
		});

	}

	handleCohortSearchChange(changeEvent) {
		const state = Object.assign({}, this.state);
		let filter = state.filter;
		let list = state.dataList;
		let paging = state.pageInfo;

		filter.cohortSearch = changeEvent.target.value;
		if (changeEvent.target.value)
			list = list.filter(function (item) {
				if (filter.cohortstatus.length > 0 && !filter.cohortstatus.includes(item.status_id)) return false;
				if ((item.name).toLowerCase().includes((filter.cohortSearch).toLowerCase())) return true;
				if ((item.acronym).toLowerCase().includes((filter.cohortSearch).toLowerCase())) return true;
				return false;
			}
			);

		paging.total = list.length;

		this.setState({
			filter: filter,
			list: list.slice(0, paging.pageSize),
			pageInfo: paging
		});

	}

	handleCohortPageSizeChange = (e) => {
		this.pageData(1, null, null, e.target.value);
	}

	clearFilter = () => {
		const state = Object.assign({}, this.state);

		let list = state.dataList;
		let filter = {
			cohortstatus: [],
			cohortSearch: ''
		};
		let paging = state.pageInfo;
		paging.total = list.length;
		paging.page = 1;
		this.setState({
			filter: filter,
			list: list.slice(0, paging.pageSize),
			pageInfo: paging
		});
	}


	filterData(i, orderBy, filter) {
		const state = Object.assign({}, this.state);
		const lastPage = state.pageInfo.page === 0 ? state.lastPage : state.pageInfo.page;
		let reqBody = {
			filter: state.filter,
			orderBy: state.orderBy,
			paging: state.pageInfo
		};
		if (i === -1) {
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
		this._isMounted = true;

		this.loadingData();

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	gotoPage(i) {
		this.pageData(i);
		if (i === 0) {
			this.setState({ viewAllFlag: true })
		} else {
			this.setState({ viewAllFlag: false })
		}
	}

	pageData(i, orderBy, filter, pagesize = -1) {

		const state = Object.assign({}, this.state);
		const lastPage = state.pageInfo.page === 0 ? state.lastPage : state.pageInfo.page;
		let reqBody = {
			filter: state.filter,
			orderBy: state.orderBy,
			paging: state.pageInfo
		};

		if (pagesize != -1) {
			reqBody.paging.pageSize = pagesize;
		}

		if (i === -1) {
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
			orderBy: state.orderBy,
			paging: state.pageInfo
		};

		reqBody.paging.page = -1;

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
				reqBody.paging.page = 1;
				if (this._isMounted) {
					this.setState(prevState => (
						{
							list: list.slice(0, reqBody.paging.pageSize),
							dataList: list,
							filter: reqBody.filter,
							pageInfo: reqBody.paging
						}
					));
				}
			});
	}


	handleOrderBy(column) {
		let orderBy = Object.assign({}, this.state.orderBy);
		if (column === orderBy.column) {
			orderBy.order = orderBy.order === "asc" ? "desc" : "asc";
		}
		else {
			orderBy.column = column;
			orderBy.order = "asc";
		}
		let pageInfo = Object.assign({}, this.state.pageInfo);
		this.filterData(pageInfo.page, orderBy);
	}

	resetCohortStatus = (cohortID, currStatus) => {
		if (['submitted'].includes(currStatus.toLowerCase())) {
			let nextStatus = 'in review'
			fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}`, {
				method: "POST"
			}).then(res => res.json())
				.then(result => {
					if (result && result.status === 200) {
						return true
					}
				})
		}
	}

	reviewCohort = (e, id, status) => {
		e.preventDefault();
		let review_url = `/admin/viewcohort/${id}`;
		if (['submitted'].includes(status.toLowerCase())) (this.resetCohortStatus(id, status))

		window.location.assign(window.location.origin + review_url);
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
			return (
				<tr key={id}>
					<td><Link to={`/admin/activitylog/${item.acronym}`}>{item.name}</Link></td>
					<td><Link to={`/admin/activitylog/${item.acronym}`}>{item.acronym}</Link></td>
					<td className="text-capitalize">{item.status}</td>
					<td>{item.submit_by}</td>
					<td>{item.update_time}</td>
					<td>
						<Link onClick={(e) => { this.reviewCohort(e, id, item.status) }}>{['submitted', 'in review'].includes(item.status.toLowerCase()) ? 'Review' : 'View'}</Link>
					</td>
				</tr>
			);
		});
		if (content.length === 0) {
			content = (
				<tr>
					<td colSpan="6">Nothing to display</td>
				</tr>
			);
		}

		return <RequireAuthorization role="SystemAdmin" >
			<div>
				<h1 className="welcome pg-title">Manage Cohorts</h1>
				<p className="welcome">The list below contains all the published and unpublished cohorts currently registered on the CEDCD website.
      		    </p><p></p>
				<div className="col-md-12" style={{ verticalAlign: 'middle', marginBottom: '-15px' }}>
					<div className="col-xl-3 col-sm-4 col-6 p-0" >
						<div className="input-group">
							<div className="input-group-prepend">
								<div className="input-group-text" id="btnGroupAddon2" ><i className="fa fa-search"></i>
								</div>
							</div>
							<input type="text" className="form-control" style={{ paddingLeft: '1rem' }}
								value={this.state.filter.cohortSearch} placeholder="Search with key word " onChange={(e) => this.handleCohortSearchChange(e)} />
						</div>
					</div>
					<div className="col-xl-2 col-sm-3 col-6">
						<div id="cohortstatus" className="filter-component">
							<CohortStatusList hasUnknown={true} values={this.state.filter.cohortstatus} displayMax="3" onClick={this.handleCohortStatusClick} />
						</div>
					</div>
					<div className="col-xl-2 col-sm-3 col-12" style={{ "paddingLeft": "0" }}>
						<div className="manageCohortClearAll" style={{ "verticalAlign": "middle", "paddingTop": "7px", "paddingRight": "0", "paddingLeft": "0" }}>
							<a id="filterClear" className="btn-filter" href="javascript:void(0);" onClick={this.clearFilter} style={{ "marginLeft": "0" }}>
								<i className="fas fa-times" ></i> Clear </a>

							<Link style={{ color: 'blue', textDecorationLine: 'underline', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} to={`/admin/newcohort`} onClick={this.saveHistory}>Add New Cohort</Link>
						</div>

					</div>
					<div className="col-xl-5 col-sm-12 col-12">
						<div className="row" style={{ "display": "flex", "paddingRight": "0px" }}>
							<div style={{ "marginLeft": "auto", "paddingLeft": "3px", "paddingRight": "1rem", "position": "relative", "paddingTop": "7px" }}>
								<PageSummary pageInfo={this.state.pageInfo} mid="true" />
							</div>
							<div style={{ "paddingRight": "1px", "paddingTop": "5px", "position": "relative" }}>
								<Paging pageInfo={this.state.pageInfo} onClick={(i) => this.gotoPage(i)} />
							</div>
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
										{this.renderTableHeader("publish_by", "20%")}
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

				<div className="filter-block home col-md-12" >

					<div className="row" style={{ "display": "flex", "paddingLeft": "15px", verticalAlign: 'middle' }}>
						{this.state.viewAllFlag ? '' : <div className="pageSize" style={{ verticalAlign: 'middle', "paddingTop": "2px" }}>
							Page Size: <select className="pageSizeSelect" value={this.state.pageInfo.pageSize} onChange={(e) => this.handleCohortPageSizeChange(e)} >
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
							</select>

						</div>
						}
						<div style={{ "marginLeft": "auto", "paddingRight": "1rem", "paddingTop": "4px" }}>

							<div>
								<PageSummary pageInfo={this.state.pageInfo} mid="true" />
							</div>

						</div>

						<div style={{ "paddingRight": "15px", "paddingTop": "0px" }}>
							<Paging pageInfo={this.state.pageInfo} onClick={(i) => this.gotoPage(i)} />
						</div>
					</div>
				</div>
			</div>
		</RequireAuthorization>;
	}
}


export default ManageCohort;
