import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageSummary from '../PageSummary/PageSummary';
import Paging from '../Paging/Paging';
import TableHeaderManageUser from './TableHeaderManageUser';
import './ManageCohort.css';
import { isNull } from 'lodash';

class ManageUser extends Component {

	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			result: {},
			list: [],
			dataList: [],
			filter: {
				userRole: [],
				userNameSearch: '',
				userStatus: 'Y',
			},
			orderBy: {
				column: "name",
				order: "asc"
			},
			pageInfo: { page: 1, pageSize: 15, total: 0 },
			lastPage: 1,
			viewAllFlag: false,
		};
		this.toFocus = React.createRef()
	}

	handleuserNameSearchChange(changeEvent) {
		this.refreshDataList(null, changeEvent.target.value, null, null, null);
	}

	refreshDataList(pageIndex, userNameSearch, userStatus, pageSize, orderByColumn) {
		const state = Object.assign({}, this.state);
		let filter = state.filter;
		let orderBy = state.orderBy;
		if (!isNull(userStatus)) filter.userStatus = userStatus;
		if (!isNull(userNameSearch)) filter.userNameSearch = userNameSearch;

		let list = filter.userStatus === 'Y' ? state.dataList.filter(item => item.active_status === 'Y') : state.dataList;

		if (!['', "", undefined, null].includes(filter.userNameSearch))
			list = list.filter(function (item) {
				if ((item.name).toLowerCase().includes((filter.userNameSearch).toLowerCase())) return true;
				if ((item.email).toLowerCase().includes((filter.userNameSearch).toLowerCase())) return true;
				return false;
			}
			);

		if (!isNull(orderByColumn)) {
			if (orderByColumn == orderBy.column) {
				orderBy.order = orderBy.order === "asc" ? "desc" : "asc";
			}
			else {
				orderBy.column = orderByColumn;
				orderBy.order = "asc";
			}

		}

		if (['name', 'action'].includes(orderBy.column)) {
			list = list.sort((a, b) => {
				return orderBy.order === 'asc'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name)
			});
		} else if ('last_login'.includes(orderBy.column)) {
			list = list.sort((a, b) => {
				let [aValue, bValue] = [a[orderBy.column], b[orderBy.column]]
					.map(e => e || '');

				if (aValue == bValue) {
					return a.name.localeCompare(b.name)

				} else {

					return orderBy.order === 'asc'
						? (aValue === 'Never' ? new Date('01/01/3000').getTime() : new Date(aValue).getTime()) - (bValue === 'Never' ? new Date('01/01/3000').getTime() : new Date(bValue).getTime())
						: (bValue === 'Never' ? new Date('01/01/2000').getTime() : new Date(bValue).getTime()) - (aValue === 'Never' ? new Date('01/01/2000').getTime() : new Date(aValue).getTime())
				}
			});
		} else {
			list = list.sort((a, b) => {
				let [aValue, bValue] = [a[orderBy.column], b[orderBy.column]].map(e => e || '');

				if (aValue == bValue) {
					return a.name.localeCompare(b.name)

				} else {
					return orderBy.order === 'asc'
						? aValue.localeCompare(bValue)
						: bValue.localeCompare(aValue)
				}
			}
			);
		}

		// pageIndex=== 0 means ViewAll
		// pageIndex=== -1 means ViewLess (disable ViewAll)
		let paging = state.pageInfo;
		if (!isNull(pageIndex) && pageIndex > 0) paging.page = pageIndex;
		if (!isNull(pageSize)) {
			paging.pageSize = pageSize;
			paging.page = 1;
		}
		const lastPage = paging.page == 0 ? state.lastPage : paging.page;
		let startIndex = 0;
		let endIndex = pageIndex === 0 ? list.length : +paging.pageSize;
		if (pageIndex > 0) {
			startIndex = (paging.page - 1) * paging.pageSize;
			endIndex = paging.page * paging.pageSize;
		}else if (pageIndex === -1){
			startIndex = (lastPage - 1) * paging.pageSize;
			endIndex = lastPage * paging.pageSize;
		}
		if (list.length > 0) {
			paging.total = list.length;
		}
		if (startIndex >= paging.total) {
			startIndex = 0;
			endIndex = list.length;
		}

		paging.page = pageIndex === 0 ? 0 : pageIndex === -1 ? state.lastPage : paging.page;

		this.setState({
			filter: filter,
			viewAllFlag: pageIndex === 0,
			list: list.slice(startIndex, endIndex),
			orderBy: orderBy,
			pageInfo: paging,
			lastPage: (pageIndex > -1 ? lastPage : pageIndex)
		});

	}

	handleUserPageSizeChange = (e) => {
		this.refreshDataList(1, null, null, e.target.value, null)
	}

	componentDidMount() {
		this._isMounted = true;
		this.loadingData();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	gotoPage(i) {
		this.refreshDataList(i, null, null, null, null);
	}

	loadingData = (next) => {
		const state = Object.assign({}, this.state);
		let reqBody = {
			filter: state.filter,
			orderBy: state.orderBy,
			paging: state.pageInfo
		};
		reqBody.paging.page = -1;

		fetch('/api/managecohort/adminuserlist', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(result => {
				let allDataList = result.data.list;
				let list = state.filter.userStatus === 'Y' ? allDataList.filter(item => item.active_status === 'Y') : allDataList;
				reqBody.paging.total = list.length;
				reqBody.paging.page = 1;
				if (this._isMounted) {
					this.setState(prevState => (
						{
							list: list.slice(0, reqBody.paging.pageSize),
							dataList: allDataList,
							filter: reqBody.filter,
							pageInfo: reqBody.paging
						}
					));
				}
			});
	}


	handleOrderBy(column) {
		this.refreshDataList(this.state.pageInfo.page, null, null, null, column)
	}

	userStatusClick(e) {
		let userStatus = e.target.checked ? 'Y' : 'N';
		this.refreshDataList(this.state.pageInfo.page, null, userStatus, null, null);
	}

	renderTableHeader(title, width) {
		return (
			<TableHeaderManageUser width={width} value={title} orderBy={this.state.orderBy} onClick={() => this.handleOrderBy(title)} />
		);
	}

	render() {
		const list = this.state.list;
		let content = list.map((item, index) => {
			let id = item.id;
			//let view_url = '/cohort?id=' + id;
			let editUserLink = `/admin/edituser/${id}`;
			let editUser = "Edit";
			let newUserLink = `/admin/newuser`


			return (
				<tr key={id}>
					<td className="text-capitalize">{item.name}</td>
					<td> {item.user_name}</td>
					<td>{item.email}</td>
					<td>{item.user_role}</td>

					<td>{item.cohort_list}</td>
					<td>{item.active_status}</td>
					<td>{item.last_login}</td>
					<td style={{ textDecoration: 'underline' }}>
						<Link to={editUserLink} onClick={this.saveHistory}>{editUser}</Link>
					</td>
				</tr>
			);


		});
		if (content.length === 0) {
			content = (
				<tr>
					<td colSpan="8">Nothing to display</td>
				</tr>
			);
		}

		return (
			<div className="col-md-12 col-12">
				<h1 className="welcome pg-title">Manage Users</h1>
				<p className="welcome">The list below contains all users registered on the CEDCD website.
      		    </p><p></p>
				<div className="col-md-12 col-12" style={{ "verticalAlign": "middle", "marginBottom": "-15px", "paddingBottom": "0px" }}>
					<div className="col-lg-3 col-md-6 col-sm-5 col-8 pl-0" style={{ "paddingBottom": "0px" }}>

						<div className="input-group">
							<div className="input-group-prepend">
								<div className="input-group-text" id="btnGroupAddon2" ><i className="fa fa-search"></i>
								</div>
							</div>

							<input type="text" className="form-control" value={this.state.filter.userNameSearch} placeholder="Search User Name or Email " style={{ paddingLeft: '1rem' }}
								onChange={(e) => this.handleuserNameSearchChange(e)} />
						</div>

					</div>
					<div className="col-md-2 col-sm-5 col-4" style={{ "paddingLeft": "10px", "verticalAlign": "middle", "paddingTop": "7px", "paddingRight": "0", "paddingBottom": "0px" }}>
						<Link style={{ color: 'blue', textDecorationLine: 'underline' }} to={`/admin/newuser`} onClick={this.saveHistory}>Add New User</Link>
					</div>
					<div className="col-lg-2 col-md-4 col-sm-7 col-6" style={{ "paddingLeft": "15px ", "verticalAlign": "bottom", "paddingTop": "10px", "paddingRight": "0px", "paddingBottom": "0px", "whiteSpace": "nowrap" }}>
						<input type="checkbox" id="userActiveStatus"
							checked={this.state.filter.userStatus === 'Y'} onChange={e => this.userStatusClick(e)} />
						<label htmlFor="userActiveStatus"> &nbsp;Show Active Users Only</label>
					</div>
					<div className="col-lg-5 col-sm-12 col-12" style={{ "display": "flex", "paddingRight": "0px", float: "right", "paddingBottom": "0px", "marginBottom": "0px" }}>

						<div style={{ "marginLeft": "auto", "paddingLeft": "3px", "paddingRight": "1rem", "position": "relative", "paddingTop": "10px", "paddingBottom": "0px", "marginBottom": "0px" }}>
							<PageSummary pageInfo={this.state.pageInfo} mid="true" />
						</div>
						<div style={{ "paddingRight": "1px", "paddingTop": "5px", "position": "relative", "paddingBottom": "0px", "marginBottom": "0px" }}>
							<Paging pageInfo={this.state.pageInfo} onClick={(i) => this.gotoPage(i)} />
						</div>

					</div>
				</div>
				<div className="table-responsive col-md-12">

					<div className="cedcd-table home">
						<div>
							<table cellSpacing="0" cellPadding="5" useaccessibleheaders="true" showheaders="true" id="cohortGridView" >
								<thead>
									<tr id="summaryHeader" className="col-header">
										{this.renderTableHeader("name", "15%")}
										{this.renderTableHeader("user_name", "15%")}
										{this.renderTableHeader("email", "15%")}
										{this.renderTableHeader("user_role", "13%")}
										{this.renderTableHeader("cohort_list", "20%")}
										{this.renderTableHeader("active_status", "5%")}
										{this.renderTableHeader("last_login", "12%")}
										{this.renderTableHeader("action", "5%")}
									</tr>
								</thead>
								<tbody>
									{content}
								</tbody>
							</table>

						</div>
					</div>
				</div>

				<div className="filter-block home col-md-12 col-12" >

					<div className="row" style={{ "display": "flex", "paddingLeft": "15px", verticalAlign: 'middle' }}>
						{this.state.viewAllFlag ? '' : <div className="pageSize" style={{ verticalAlign: 'middle', "paddingTop": "2px" }}>
							Page Size: <select className="pageSizeSelect" value={this.state.pageInfo.pageSize} onChange={(e) => this.handleUserPageSizeChange(e)} >
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
							</select>
						</div>}
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
		);
	}
}

export default ManageUser;
