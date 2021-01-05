import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageSummary from '../PageSummary/PageSummary';
import Paging from '../Paging/Paging';
import TableHeaderManageUser from './TableHeaderManageUser';
import { UserSessionContext } from '../../index';
import Unauthorized from '../Unauthorized/Unauthorized';
import './ManageCohort.css';

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
			},
			orderBy: {
				column: "name",
				order: "asc"
			},
			pageInfo: { page: 1, pageSize: 15, total: 0 },
			lastPage: 1,
		};
		this.toFocus = React.createRef()
	}



	handleuserNameSearchChange(changeEvent) {
		const state = Object.assign({}, this.state);
		let filter = state.filter;
		let list = state.dataList;
		let paging = state.pageInfo;

		filter.userNameSearch = changeEvent.target.value;

		if (changeEvent.target.value)
			list = list.filter(function (item) {
				if ((item.name).toLowerCase().includes((filter.userNameSearch).toLowerCase())) return true;
				if ((item.email).toLowerCase().includes((filter.userNameSearch).toLowerCase())) return true;
				return false;
			}
			);

		paging.total = list.length;
		console.log("paging total " + paging.total)

		this.setState({
			filter: filter,
			list: list.slice(0, paging.pageSize),
			pageInfo: paging
		});

	}

	handleUserPageSizeChange = (e) => {
		this.pageData(1, null, null, e.target.value);
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

		fetch('/api/managecohort/adminuserlist', {
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
		this.props.setAdmin(1);

		this.loadingData();

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
		let reqBody = {
			filter: state.filter,
			orderBy: state.orderBy,
			paging: state.pageInfo
		};

		console.log(reqBody)

		if (pagesize != -1) {
			reqBody.paging.pageSize = pagesize;
		}

		if (i == -1) {
			reqBody.paging.page = state.lastPage;
		}
		else {
			reqBody.paging.page = i;
		}
		fetch('/api/managecohort/adminuserlist', {
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

		fetch('/api/managecohort/adminuserlist', {
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
					<td colSpan="3">Nothing to display</td>
				</tr>
			);
		}

		return <UserSessionContext.Consumer>
			{userSession => (
				!(process.env.NODE_ENV === 'development2' || (userSession && userSession.role === 'SystemAdmin')) &&
				<Unauthorized /> ||
				<div className="col-md-12 col-12">
					<h1 className="welcome pg-title">Manage Users</h1>
					<p className="welcome">The list below contains all users registered on the CEDCD website.
      		    </p><p></p>
					<div className="col-md-12 col-12" style={{ "verticalAlign": "middle", "marginBottom": "0", "paddingBottom": "0px" }}>
						<div className="col-md-4 col-8" style={{ "paddingBottom": "0px" }}>
							<div className="form-group has-feedback has-search" style={{ "paddingBottom": "0px", "marginBottom": "0" }}>
								<span className="glyphicon glyphicon-search form-control-feedback"></span>
								<input type="text" className="form-control" value={this.state.filter.userNameSearch} placeholder="Search User Name or Email "
									onChange={(e) => this.handleuserNameSearchChange(e)} />
							</div>
						</div>
						<div className="col-md-2 col-4" style={{ "paddingLeft": "0", "verticalAlign": "middle", "paddingTop": "7px", "paddingRight": "0", "paddingBottom": "0px" }}>
							<Link style={{ color: 'blue', textDecorationLine: 'underline' }} to={`/admin/newuser`} onClick={this.saveHistory}>Add New User</Link>
						</div>

						<div className="col-md-6 col-12" style={{ "display": "flex", "paddingRight": "0px", float: "right", "paddingBottom": "0px", "marginBottom": "0px" }}>

							<div style={{ "marginLeft": "auto", "paddingLeft": "3px", "paddingRight": "1rem", "position": "relative", "paddingTop": "7px", "paddingBottom": "0px", "marginBottom": "0px" }}>
								<PageSummary pageInfo={this.state.pageInfo} mid="true" />
							</div>
							<div style={{ "paddingRight": "1px", "paddingTop": "5px", "position": "relative", "paddingBottom": "0px", "marginBottom": "0px" }}>
								<Paging pageInfo={this.state.pageInfo} onClick={(i) => this.gotoPage(i)} />
							</div>

						</div>
					</div>
					<div className="table-responsive">
						<div className="table-inner col-md-12">
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
					</div>

					<div className="filter-block home col-md-12 col-12" >

						<div className="row" style={{ "display": "flex", "paddingLeft": "15px", verticalAlign: 'middle' }}>
							<div className="pageSize" style={{ verticalAlign: 'middle', "paddingTop": "2px" }}>
								Page Size: <select className="pageSizeSelect" value={this.state.pageInfo.pageSize} onChange={(e) => this.handleUserPageSizeChange(e)} >
									<option>Page Size</option>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="20">20</option>
								</select>
							</div>
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
			)}</UserSessionContext.Consumer>;
	}
}

export default ManageUser;
