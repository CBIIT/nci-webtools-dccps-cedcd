import React, { Component } from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PageSummary from '../PageSummary/PageSummary';
import Paging from '../Paging/Paging';
import TableHeader from '../TableHeader/TableHeader';
import TableHeaderMiddle from '../TableHeader/TableHeaderMiddle'
import SelectBox from '../SelectBox/SelectBox';
import GenderList from '../GenderList/GenderList';
import RaceList from '../RaceList/RaceList';
import EthnicityList from '../EthnicityList/EthnicityList';
import AgeList from '../AgeList/AgeList';
import CollectedDataList from '../CollectedDataList/CollectedDataList';
import CollectedSpecimensList from '../CollectedSpecimensList/CollectedSpecimensList';
import CollectedCancersList from '../CollectedCancersList/CollectedCancersList';
import DiseaseStateList from '../DiseaseStateList/DiseaseStateList';
import FloatingSubmit from './FloatingSubmit';
import TabBoard from './TabBoard';
import BoxBoard from './BoxBoard';
import Workbook from '../Workbook/Workbook';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Collapse } from 'reactstrap';

class Details extends Component {

	_isMounted = false;

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			list: [],
			filter: {
				participant: {
					gender: [],
					race: [],
					ethnicity: [],
					age: []
				},
				collect: {
					cancer: [],
					data: [],
					specimen: []
				},
				study: {
					state: []
				}
			},
			advancedFilter: {
				gender: [],
				age: [],
				state: [],
				race: [],
				ethnicity: [],
				cancer: [],
				data: [],
				specimen: [],
				booleanOperationBetweenField: ["AND", "AND", "AND", "AND", "AND", "AND", "AND", "AND"],
				booleanOperationWithInField: ["OR", "OR", "OR", "OR", "OR", "OR", "OR", "OR"]
			},
			orderBy: {
				column: "cohort_name",
				order: "asc"
			},
			pageInfo: { page: 1, pageSize: 15, total: 0 },
			lastPage: 1,
			selected: [],
			comparasion: false,
			currTab: 0,
			selectAll: false,
			collapse: true,
			searchState: true,
			prevBasicParams: {},
			prevAdvancedParam: {},
			advancedCondition: "AND"
		};
		this.toFocus = React.createRef();
	}

	saveHistory = () => {
		const state = Object.assign({}, this.state);
		let item = {
			filter: state.filter,
			advancedFilter: state.advancedFilter,
			orderBy: state.orderBy
		};
		sessionStorage.setItem('informationHistory_select', JSON.stringify(item));
	}

	//Expand and collapse the filter-panel
	toggle() {
		this.setState(state => ({ collapse: !state.collapse }));
	}

	setAllToFalse() {
		this.setState(state => ({ selectAll: false }));
	}

	//Sends the information to the api to export to an excel file
	loadingData = (next) => {
		const state = Object.assign({}, this.state);
		let reqBody = {
			filter: state.filter,
			advancedFilter: state.advancedFilter,
			selectionList: state.selectionList,
			items: state.items,
			booleanStates: state.booleanStates,
			orderBy: state.orderBy,
			paging: state.pageInfo
		};
		reqBody.paging.page = 0;

		if (this.state.searchState == true) {
			fetch('./api/export/select', {
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
		else {
			fetch('./api/export/advancedSelect', {
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

	}

	gotoPage(i) {
		if (this.state.searchState == true) {
			this.pageData(i);
		}
		else {
			this.pageData(i);
		}
	}

	pageData(i, orderBy, filter, selected) {
		if (this.state.searchState == true) {
			const state = Object.assign({}, this.state);
			const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
			let reqBody = this.state.prevBasicParams;
			if (i == -1) {
				reqBody.paging.page = state.lastPage;
			}
			else {
				reqBody.paging.page = i;
			}
			fetch('./api/cohort/select', {
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
							lastPage: (i > -1 ? lastPage : i),
							selected: selected ? selected : prevState.selected,
							comparasion: false
						}
					));
				});
		}
		else {
			const state = Object.assign({}, this.state);
			const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
			let reqBody = this.state.prevAdvancedParam;
			if (i == -1) {
				reqBody.paging.page = state.lastPage;
			}
			else {
				reqBody.paging.page = i;
			}

			fetch('./api/cohort/advancedSelect', {
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
							advancedFilter: reqBody.advancedFilter,
							orderBy: reqBody.orderBy,
							pageInfo: reqBody.paging,
							lastPage: (i > -1 ? lastPage : i),
							selected: selected ? selected : prevState.selected,
							comparasion: false
						}
					));
				});
		}
	}

	clearFilter = () => {
		let i = 1;
		this.setAllToFalse();
		if (document.getElementById("cancerAll") !== null) {
			document.getElementById("cancerAll").checked = false;
		}
		let orderBy = {
			column: "cohort_name",
			order: "asc"
		};
		let filter = {
			participant: {
				gender: [],
				race: [],
				ethnicity: [],
				age: []
			},
			collect: {
				cancer: [],
				data: [],
				specimen: []
			},
			study: {
				state: []
			}
		};
		const previousState = sessionStorage.getItem('informationHistory_select');
		if (previousState) {
			let state = JSON.parse(previousState);
			let item = {
				filter: filter,
				advancedFilter: state.advancedFilter,
				orderBy: orderBy
			};
			sessionStorage.setItem('informationHistory_select', JSON.stringify(item));
		}
		this.filterData(i, orderBy, filter, []);

	}

	goBack2Filter = () => {
		if (this.state.searchState) {
			this.filterData(this.state.pageInfo.page);

		}
		else {
			this.advancedFilterData(this.state.pageInfo.page);
		}
	}

	//Handles when the filter button for the basic search is hit
	toFilter = () => {
		this.toggle();
		this.setAllToFalse();
		this.saveHistory();
		this.filterData(1, null, null, []);
	}

	//Switches between the basic and advanced search
	switchSearchType = () => {
		this.setState({
			searchState: !this.state.searchState
		});

		const previousState = sessionStorage.getItem('informationHistory_select');
		if (previousState) {

			let state = JSON.parse(previousState);
			console.log(this.state.searchState);
			if (this.state.searchState == false) {
				this.filterData(1, state.orderBy, state.filter);
			}
			else {
				this.advancedFilterData(1, state.orderBy, state.advancedFilter);
			}
		}
		else {
			if (this.state.searchState == false) {
				this.filterData(this.state.pageInfo.page);
			}
			else {
				this.advancedFilterData(this.state.pageInfo.page);
			}
		}



	}

	filterData(i, orderBy, filter, selected) {
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

		fetch('./api/cohort/select', {
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
							lastPage: (i > -1 ? lastPage : i),
							selected: selected ? selected : prevState.selected,
							comparasion: false
						}
					));
				}
			});
	}

	clearAdvancedFilter = () => {
		this.setAllToFalse();
		let orderBy = {
			column: "cohort_name",
			order: "asc"
		};
		let advancedFilter = {
			gender: [],
			age: [],
			state: [],
			race: [],
			ethnicity: [],
			cancer: [],
			data: [],
			specimen: [],
			booleanOperationBetweenField: ["AND", "AND", "AND", "AND", "AND", "AND", "AND", "AND"],
			booleanOperationWithInField: ["OR", "OR", "OR", "OR", "OR", "OR", "OR", "OR"]
		};
		const previousState = sessionStorage.getItem('informationHistory_select');
		if (previousState) {
			let state = JSON.parse(previousState);
			let item = {
				filter: state.filter,
				advancedFilter: advancedFilter,
				orderBy: orderBy
			};
			sessionStorage.setItem('informationHistory_select', JSON.stringify(item));
		}
		this.advancedFilterData(1, orderBy, advancedFilter, []);
	}

	toAdvancedFilter = () => {
		this.toggle();
		this.setAllToFalse();
		this.saveHistory();
		this.advancedFilterData(1, null, null, []);
	}

	advancedFilterData(i, orderBy, advancedFilter, selected) {
		const state = Object.assign({}, this.state);
		const lastPage = state.pageInfo.page == 0 ? state.lastPage : state.pageInfo.page;
		let reqBody = {
			advancedFilter: state.advancedFilter,
			orderBy: state.orderBy,
			paging: state.pageInfo,
			advancedCondition: state.advancedCondition
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
		if (advancedFilter) {
			reqBody.advancedFilter = advancedFilter;
		}
		this.setState({
			prevAdvancedParam: JSON.parse(JSON.stringify(reqBody)),
		})
		fetch('./api/cohort/advancedSelect', {
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
							advancedFilter: reqBody.advancedFilter,
							orderBy: reqBody.orderBy,
							pageInfo: reqBody.paging,
							lastPage: (i > -1 ? lastPage : i),
							selected: selected ? selected : prevState.selected,
							comparasion: false
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
		if (this.state.searchState == true) {
			this.filterData(pageInfo.page, orderBy);
		}
		else {
			this.advancedFilterData(pageInfo.page, orderBy)
		}

	}

	handleSelect(id, e) {
		let selected;
		if (id === -1) {
			selected = [];
			if (e.target.checked) {
				//select all cohorts
				if (this.state.searchState == true) {

					const state = Object.assign({}, this.state);
					/*let reqBody = {
						filter:state.filter,
						orderBy:state.orderBy,
						paging:{}
					};*/
					let reqBody = this.state.prevBasicParams;

					reqBody.paging.page = 0;
					fetch('./api/cohort/select', {
						method: "POST",
						body: JSON.stringify(reqBody),
						headers: {
							'Content-Type': 'application/json'
						}
					})
						.then(res => res.json())
						.then(result => {
							let list = result.data.list;
							list.forEach(function (t) {
								selected.push(t.id);
							});
							this.setState({
								selected: selected,
								selectAll: true
							});
						});
				}
				else {

					const state = Object.assign({}, this.state);
					/*let reqBody = {
						filter: state.filter,
						selectionList: state.selectionList,
						items: state.items,
						booleanStates: state.booleanStates,
						orderBy:state.orderBy,
						paging:{}
					};*/
					let reqBody = this.state.prevAdvancedParam;
					reqBody.paging.page = 0;
					fetch('./api/cohort/advancedSelect', {
						method: "POST",
						body: JSON.stringify(reqBody),
						headers: {
							'Content-Type': 'application/json'
						}
					})
						.then(res => res.json())
						.then(result => {
							let list = result.data.list;
							list.forEach(function (t) {
								selected.push(t.id);
							});
							this.setState({
								selected: selected,
								selectAll: true
							});
						});

				}
			}
			else {
				this.setState({
					selected: selected,
					selectAll: false
				});
			}
		}
		else {
			selected = Object.assign([], this.state.selected);
			let idx = selected.indexOf(id);
			if (idx >= 0) {
				selected.splice(idx, 1);
			}
			else {
				selected.push(id);
			}
			this.setState({
				selected: selected,
				selectAll: false
			});
		}

	}

	handleGenderClick = (v) => {
		const filter = Object.assign({}, this.state.filter);
		let idx = filter.participant.gender.indexOf(v.id);

		if (idx > -1) {
			//remove element
			filter.participant.gender.splice(idx, 1);
		}
		else {
			//add element
			filter.participant.gender.push(v.id);
		}
		this.setState({
			filter: filter
		});
	}

	handleRaceClick = (v) => {
		const filter = Object.assign({}, this.state.filter);
		let idx = filter.participant.race.indexOf(v.id);

		if (idx > -1) {
			//remove element
			filter.participant.race.splice(idx, 1);
		}
		else {
			//add element
			filter.participant.race.push(v.id);
		}
		this.setState({
			filter: filter
		});
	}

	handleEthnicityClick = (v) => {
		const filter = Object.assign({}, this.state.filter);
		let idx = filter.participant.ethnicity.indexOf(v.id);

		if (idx > -1) {
			//remove element
			filter.participant.ethnicity.splice(idx, 1);
		}
		else {
			//add element
			filter.participant.ethnicity.push(v.id);
		}
		this.setState({
			filter: filter
		});
	}

	handleAgeClick = (v) => {
		const filter = Object.assign({}, this.state.filter);
		let idx = filter.participant.age.indexOf(v);

		if (idx > -1) {
			//remove element
			filter.participant.age.splice(idx, 1);
		}
		else {
			//add element
			filter.participant.age.push(v);
		}
		this.setState({
			filter: filter
		});
	}

	handleDataClick = (v) => {
		const filter = Object.assign({}, this.state.filter);
		let idx = filter.collect.data.indexOf(v.id);

		if (idx > -1) {
			//remove element
			filter.collect.data.splice(idx, 1);
		}
		else {
			//add element
			filter.collect.data.push(v.id);
		}
		this.setState({
			filter: filter
		});
	}

	handleSpecimenClick = (v) => {
		const filter = Object.assign({}, this.state.filter);
		let idx = filter.collect.specimen.indexOf(v);

		if (idx > -1) {
			//remove element
			filter.collect.specimen.splice(idx, 1);
		}
		else {
			//add element
			filter.collect.specimen.push(v);
		}
		this.setState({
			filter: filter
		});
	}

	handleCancerClick = (v, allIds, e) => {
		const filter = Object.assign({}, this.state.filter);
		if (v) {
			let idx = filter.collect.cancer.indexOf(v.id);

			if (idx > -1) {
				//remove element
				filter.collect.cancer.splice(idx, 1);
			}
			else {
				//add element
				filter.collect.cancer.push(v.id);
			}
		}
		else {
			//click on the "all cohort"
			filter.collect.cancer = [];
			if (e.target.checked) {
				filter.collect.cancer = allIds;
			}
		}
		this.setState({
			filter: filter
		});

	}

	handleStateClick = (v) => {
		const filter = Object.assign({}, this.state.filter);
		let idx = filter.study.state.indexOf(v);

		if (idx > -1) {
			//remove element
			filter.study.state.splice(idx, 1);
		}
		else {
			//add element
			filter.study.state.push(v);
		}
		this.setState({
			filter: filter
		});
	}

	handleAdvancedGenderClick = (v) => {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		let idx = advancedFilter.gender.indexOf(v.id);

		if (idx > -1) {
			//remove element
			advancedFilter.gender.splice(idx, 1);
		}
		else {
			//add element
			advancedFilter.gender.push(v.id);
		}
		this.setState({
			advancedFilter: advancedFilter
		});
	}

	handleAdvancedRaceClick = (v) => {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		let idx = advancedFilter.race.indexOf(v.id);

		if (idx > -1) {
			//remove element
			advancedFilter.race.splice(idx, 1);
		}
		else {
			//add element
			advancedFilter.race.push(v.id);
		}
		this.setState({
			advancedFilter: advancedFilter
		});
	}

	handleAdvancedEthnicityClick = (v) => {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		let idx = advancedFilter.ethnicity.indexOf(v.id);

		if (idx > -1) {
			//remove element
			advancedFilter.ethnicity.splice(idx, 1);
		}
		else {
			//add element
			advancedFilter.ethnicity.push(v.id);
		}
		this.setState({
			advancedFilter: advancedFilter
		});
	}

	handleAdvancedAgeClick = (v) => {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		let idx = advancedFilter.age.indexOf(v);

		if (idx > -1) {
			//remove element
			advancedFilter.age.splice(idx, 1);
		}
		else {
			//add element
			advancedFilter.age.push(v);
		}
		this.setState({
			advancedFilter: advancedFilter
		});
	}

	handleAdvancedDataClick = (v) => {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		let idx = advancedFilter.data.indexOf(v.id);

		if (idx > -1) {
			//remove element
			advancedFilter.data.splice(idx, 1);
		}
		else {
			//add element
			advancedFilter.data.push(v.id);
		}
		this.setState({
			advancedFilter: advancedFilter
		});
	}

	handleAdvancedSpecimenClick = (v) => {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		let idx = advancedFilter.specimen.indexOf(v);

		if (idx > -1) {
			//remove element
			advancedFilter.specimen.splice(idx, 1);
		}
		else {
			//add element
			advancedFilter.specimen.push(v);
		}
		this.setState({
			advancedFilter: advancedFilter
		});
	}

	handleAdvancedCancerClick = (v, allIds, e) => {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		if (v) {
			let idx = advancedFilter.cancer.indexOf(v.id);

			if (idx > -1) {
				//remove element
				advancedFilter.cancer.splice(idx, 1);
			}
			else {
				//add element
				advancedFilter.cancer.push(v.id);
			}
		}
		else {
			//click on the "all cohort"
			advancedFilter.cancer = [];
			if (e.target.checked) {
				advancedFilter.cancer = allIds;
			}
		}
		this.setState({
			advancedFilter: advancedFilter
		});

	}

	handleAdvancedStateClick = (v) => {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		let idx = advancedFilter.state.indexOf(v);

		if (idx > -1) {
			//remove element
			advancedFilter.state.splice(idx, 1);
		}
		else {
			//add element
			advancedFilter.state.push(v);
		}
		this.setState({
			advancedFilter: advancedFilter
		});
	}

	handleComparasion = () => {
		this.setState({
			comparasion: true
		});
	}

	handleBooleanChange(e, index) {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		advancedFilter.booleanOperationBetweenField[index] = e.target.value;
		this.setState({
			advancedFilter: advancedFilter
		});
	}

	handleBooleanFilterChange(e) {
		this.setState({ advancedCondition: e.target.value })
	}

	handleBooleanWithinChange(e, index) {
		const advancedFilter = Object.assign({}, this.state.advancedFilter);
		advancedFilter.booleanOperationWithInField[index] = e.target.value;
		this.setState({
			advancedFilter: advancedFilter
		});
	}

	renderSearchFilters() {
		const { searchState } = this.state;
		if (searchState) {
			return (
				<div className="panel-body">
					<div className="filter row">
						<div className="col-sm-3 filterCol">
							<div className="filter-component">
								<h3>Eligibility Requirements</h3>
								<div className="col-sm-12">
									<GenderList hasUnknown={false} hasBoth={true} values={this.state.filter.participant.gender} displayMax="3" onClick={this.handleGenderClick} />
									<AgeList values={this.state.filter.participant.age} displayMax="3" onClick={this.handleAgeClick} />
									<DiseaseStateList values={this.state.filter.study.state} displayMax="5" onClick={this.handleStateClick} />
								</div>
							</div>
						</div>
						<div className="col-sm-3 filterCol">
							<div className="filter-component">
								<h3>Enrollments</h3>
								<div className="col-sm-12">
									<RaceList values={this.state.filter.participant.race} displayMax="3" onClick={this.handleRaceClick} />
									<EthnicityList values={this.state.filter.participant.ethnicity} displayMax="3" onClick={this.handleEthnicityClick} />
								</div>
							</div>
						</div>
						<div className="filterCol col-sm-6 last">
							<div className="filter-component">
								<h3>Data and Specimens Collected</h3>
								<div className="row">
									<div className="col-sm-12">
										<CollectedDataList values={this.state.filter.collect.data} displayMax="5" onClick={this.handleDataClick} />
									</div>
									<div className="col-sm-12">
										<CollectedSpecimensList values={this.state.filter.collect.specimen} displayMax="5" onClick={this.handleSpecimenClick} />
									</div>
									<div className="col-sm-12">
										<CollectedCancersList hasNoCancer={false} title="Cancers Collected" innertitle="Cancers Collected" hasSelectAll={true} values={this.state.filter.collect.cancer} displayMax="5" onClick={this.handleCancerClick} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row" style={{ "display": "flex" }}>
						<a id="switchSearchButton" className="switchSearchButtonToAdvanced col-sm-3 col-sm-offset-0" style={{ "marginTop": "2rem" }} href="javascript:void(0);" onClick={this.switchSearchType}>Advanced Search</a>
						<a id="filterClear" className="btn-filter" style={{ "marginLeft": "auto" }} href="javascript:void(0);" onClick={this.clearFilter}><i className="fas fa-times"></i> Clear All</a>
						<input type="submit" id="filterEngage" name="filterEngage" style={{ "marginRight": "1rem" }} value="Search Cohorts" className="btn btn-primary btn-filter" onClick={this.toFilter} />
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="panel-body">
					<div className="filter row">
						<div className="col-sm-12">
							<div className="filter-component">
								<div className="row" style={{ "marginLeft": "calc(10% + 2px)", "fontSize": "1.8rem", "marginBottom": "1rem" }}><b>Eligibility Requirements</b></div>
								<div className="row">

									<div className="col-sm-1" style={{ "width": "10%" }}></div>

									<div className="col-sm-11" style={{ "width": "90%" }}>
										<div style={{ "width": "92%", "float": "left" }}>
											<GenderList hasUnknown={false} hasBoth={true} rightBorderStyle="straight" values={this.state.advancedFilter.gender} displayMax="3" onClick={this.handleAdvancedGenderClick} />
										</div>
										<div style={{ "width": "8%", "float": "left" }}>
											<select className="btn btn-default" style={{ "borderColor": "#ccc", "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }} value={this.state.advancedFilter.booleanOperationWithInField[0]} title="Boolean operation between options in gender filter" onChange={e => this.handleBooleanWithinChange(e, 0)}>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-1" style={{ "width": "10%" }}>
										<select className="btn btn-default" value={this.state.advancedCondition} title="Boolean Operation between filters" onChange={e => this.handleBooleanFilterChange(e)}>
											<option value="AND">AND</option>
											<option value="OR">OR</option>
										</select>
									</div>
									<div className="col-sm-11" style={{ "width": "90%" }}>
										<div style={{ "width": "92%", "float": "left" }}>
											<AgeList rightBorderStyle="straight" values={this.state.advancedFilter.age} displayMax="3" onClick={this.handleAdvancedAgeClick} />
										</div>
										<div style={{ "width": "8%", "float": "left" }}>
											<select className="btn btn-default" style={{ "borderColor": "#ccc", "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }} value={this.state.advancedFilter.booleanOperationWithInField[1]} title="Boolean operation between options in age filter" onChange={e => this.handleBooleanWithinChange(e, 1)}>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-1" style={{ "width": "10%" }}>
										<select className="btn btn-default" value={this.state.advancedCondition} title="Boolean Operation between filters" disabled="disabled">
											<option value="AND">AND</option>
											<option value="OR">OR</option>
										</select>
									</div>
									<div className="col-sm-11" style={{ "width": "90%" }}>
										<div style={{ "width": "92%", "float": "left" }}>
											<DiseaseStateList rightBorderStyle="straight" values={this.state.advancedFilter.state} displayMax="5" onClick={this.handleAdvancedStateClick} />
										</div>
										<div style={{ "width": "8%", "float": "left" }}>
											<select className="btn btn-default" style={{ "borderColor": "#ccc", "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }} value={this.state.advancedFilter.booleanOperationWithInField[2]} title="Boolean operation between options in state filter" onChange={e => this.handleBooleanWithinChange(e, 2)}>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="filter row">
						<div className="col-sm-12">
							<div className="filter-component">
								<div className="row" style={{ "marginLeft": "calc(10% + 2px)", "fontSize": "1.8rem", "marginBottom": "1rem" }}><b>Enrollments</b></div>
								<div className="row">
									<div className="col-sm-1" style={{ "width": "10%" }}>
										<select className="btn btn-default" value={this.state.advancedCondition} title="Boolean Operation between filters" disabled="disabled">
											<option value="AND">AND</option>
											<option value="OR">OR</option>
										</select>
									</div>
									<div className="col-sm-11" style={{ "width": "90%" }}>
										<div style={{ "width": "92%", "float": "left" }}>
											<RaceList rightBorderStyle="straight" values={this.state.advancedFilter.race} displayMax="3" onClick={this.handleAdvancedRaceClick} />
										</div>
										<div style={{ "width": "8%", "float": "left" }}>
											<select className="btn btn-default" style={{ "borderColor": "#ccc", "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }} value={this.state.advancedFilter.booleanOperationWithInField[3]} title="Boolean operation between options in race filter" onChange={e => this.handleBooleanWithinChange(e, 3)}>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-1" style={{ "width": "10%" }}>
										<select className="btn btn-default" value={this.state.advancedCondition} title="Boolean Operation between filters" disabled="disabled">
											<option value="AND">AND</option>
											<option value="OR">OR</option>
										</select>
									</div>
									<div className="col-sm-11" style={{ "width": "90%" }}>
										<div style={{ "width": "92%", "float": "left" }}>
											<EthnicityList rightBorderStyle="straight" values={this.state.advancedFilter.ethnicity} displayMax="3" onClick={this.handleAdvancedEthnicityClick} />
										</div>
										<div style={{ "width": "8%", "float": "left" }}>
											<select className="btn btn-default" style={{ "borderColor": "#ccc", "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }} value={this.state.advancedFilter.booleanOperationWithInField[4]} title="Boolean operation between options in ethnicity filter" onChange={e => this.handleBooleanWithinChange(e, 4)}>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="filter row">
						<div className="col-sm-12">
							<div className="filter-component">
								<div className="row" style={{ "marginLeft": "calc(10% + 2px)", "fontSize": "1.8rem", "marginBottom": "1rem" }}><b>Data and Specimens Collected</b></div>
								<div className="row">
									<div className="col-sm-1" style={{ "width": "10%" }}>
										<select className="btn btn-default" value={this.state.advancedCondition} title="Boolean Operation between filters" disabled="disabled">
											<option value="AND">AND</option>
											<option value="OR">OR</option>
										</select>
									</div>
									<div className="col-sm-11" style={{ "width": "90%" }}>
										<div style={{ "width": "92%", "float": "left" }}>
											<CollectedDataList rightBorderStyle="straight" values={this.state.advancedFilter.data} displayMax="5" onClick={this.handleAdvancedDataClick} />
										</div>
										<div style={{ "width": "8%", "float": "left" }}>
											<select className="btn btn-default" style={{ "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }} value={this.state.advancedFilter.booleanOperationWithInField[5]} title="Boolean operation between options in Data filter" onChange={e => this.handleBooleanWithinChange(e, 5)}>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-1" style={{ "width": "10%" }}>
										<select className="btn btn-default" value={this.state.advancedCondition} title="Boolean Operation between filters" disabled="disabled">
											<option value="AND">AND</option>
											<option value="OR">OR</option>
										</select>
									</div>
									<div className="col-sm-11" style={{ "width": "90%" }}>
										<div style={{ "width": "92%", "float": "left" }}>
											<CollectedSpecimensList rightBorderStyle="straight" values={this.state.advancedFilter.specimen} displayMax="5" onClick={this.handleAdvancedSpecimenClick} />
										</div>
										<div style={{ "width": "8%", "float": "left" }}>
											<select className="btn btn-default" style={{ "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }} value={this.state.advancedFilter.booleanOperationWithInField[6]} title="Boolean operation between options in biospecimens filter" onChange={e => this.handleBooleanWithinChange(e, 6)}>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-1" style={{ "width": "10%" }}>
										<select className="btn btn-default" value={this.state.advancedCondition} title="Boolean Operation between filters" disabled="disabled">
											<option value="AND">AND</option>
											<option value="OR">OR</option>
										</select>
									</div>
									<div className="col-sm-11" style={{ "width": "90%" }}>
										<div style={{ "width": "92%", "float": "left" }}>
											<CollectedCancersList rightBorderStyle="straight" hasNoCancer={false} title="Cancers Collected" innertitle="Cancers Collected" hasSelectAll={true} values={this.state.advancedFilter.cancer} displayMax="5" onClick={this.handleAdvancedCancerClick} />
										</div>
										<div style={{ "width": "8%", "float": "left" }}>
											<select className="btn btn-default" style={{ "borderTopLeftRadius": "0px", "borderBottomLeftRadius": "0px" }} value={this.state.advancedFilter.booleanOperationWithInField[7]} title="Boolean operation between options in cancers filter" onChange={e => this.handleBooleanWithinChange(e, 7)}>
												<option value="AND">AND</option>
												<option value="OR">OR</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row" style={{ "display": "flex" }}>
						<a id="switchSearchButton" className="switchSearchButtonToBasic col-sm-3 col-sm-offset-0" style={{ "marginTop": "2rem" }} href="javascript:void(0);" onClick={this.switchSearchType}>Basic Search</a>
						<a id="filterClear" className="btn-filter" href="javascript:void(0);" style={{ "marginLeft": "auto" }} onClick={this.clearAdvancedFilter}><i className="fas fa-times"></i> Clear All</a>
						<input type="submit" id="filterEngage" name="filterEngage" value="Search Cohorts" className="btn btn-primary btn-filter" style={{ "marginRight": "1rem" }} onClick={this.toAdvancedFilter} />
					</div>
				</div>
			)
		}
	}

	renderSelectHeader(width) {
		return (
			<th id="table-select-col" width={width} title="Select / Deselect All Cohorts">
				<SelectBox id="select_all" label="Select / Deselect All Cohorts" onClick={(e) => this.handleSelect(-1, e)} checked={this.state.selectAll} />
			</th>
		);
	}

	renderTableHeader(title, width) {
		return (
			<TableHeader width={width} value={title} orderBy={this.state.orderBy} onClick={() => this.handleOrderBy(title)} />
		);
	}

	renderTableHeaderMiddle(title, width) {
		return (
			<TableHeaderMiddle width={width} align="center" value={title} orderBy={this.state.orderBy} onClick={() => this.handleOrderBy(title)} />
		);
	}

	componentDidMount() {
		this._isMounted = true;
		const previousState = sessionStorage.getItem('informationHistory_select');
		if (previousState) {
			let state = JSON.parse(previousState);
			if (this._isMounted) {
				this.setState({
					filter: state.filter,
					advancedFilter: state.advancedFilter,
					orderBy: state.orderBy
				});
			}

			if (this.state.searchState == true) {
				this.filterData(1, state.orderBy, state.filter);
			}
			else {

				this.advancedFilterData(1, state.orderBy, state.advancedFilter);
			}
		}
		else {
			if (this.state.searchState == true) {
				this.filterData(this.state.pageInfo.page);
			}
			else {
				this.advancedFilterData(this.state.pageInfo.page);
			}
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleTabClick(i) {
		this.setState({ currTab: i });
	}

	numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	render() {
		if (this.state.comparasion) {
			return (
				<div>
					<div id="filterLabels" className="filter-block col-md-12 lockedFilter">
						<div className="content-nav">
							<a className="back" href="javascript:void(0);" onClick={this.goBack2Filter}><i className="fas fa-chevron-left"></i>&nbsp;<span>Back to filter</span></a>
						</div>
					</div>
					<div className="table-description">
						<p>The Cohort Overview compares the cohort design and the types of data and specimens collected across the cohorts you selected. To view more information about a specific cohort, select the acronym of the cohort at the top of the table.</p>
					</div>
					<div id="data-table" className="level2 col-md-12">
						<div id="table-header" className="">
							<div>
								<div id="cohortDetailTabs">
									<TabBoard currTab={this.state.currTab} onClick={(i) => this.handleTabClick(i)} />
								</div>
							</div>
						</div>
						<BoxBoard saveHistory={this.saveHistory} cohorts={this.state.selected} currTab={this.state.currTab} />
					</div>
				</div>
			);
		}
		else {
			const list = this.state.list;
			let content = list.map((item, index) => {
				let id = item.id;
				let url = './cohort?id=' + id;
				let website = item.cohort_web_site;
				if (!website.startsWith("http") && !website.startsWith("www")) {
					website = "";
				}
				let website_label = website;
				if (website.length > 30) {
					website_label = website.substring(0, 27) + "...";
				}
				let website_content = "";
				if (website !== "") {
					website_content = (<a href={website} title={website} target="_blank">{website_label}</a>);
				}
				let select_id = "select_" + id;
				return (
					<tr key={id}>
						<td>
							<SelectBox id={select_id} label={id} onClick={() => this.handleSelect(id)} checked={this.state.selected.indexOf(id) > -1} />
						</td>
						<td>
							<Link to={url} onClick={this.saveHistory}>{item.cohort_name}</Link>
						</td>
						<td><Link to={url} onClick={this.saveHistory}>{item.cohort_acronym}</Link></td>
						<td align="center">{item.enrollment_total > -1 ? this.numberWithCommas(item.enrollment_total) : 0}</td>
						<td>{website_content}</td>
						<td><Moment format="MM/DD/YYYY">{item.update_time}</Moment></td>
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
					<input id="tourable" type="hidden" />
					<h1 className="welcome pg-title">Search Cohorts</h1>
					<p className="welcome">Browse the list of cohorts or use the filter options to shorten the list of cohorts according to types of participants, data, and specimens.  Then select the cohorts about which you'd like to see details and select the Submit button.
					</p>
					<div id="cedcd-home-filter" className="filter-block col-md-12">
						<div id="filter-panel" className="panel panel-default">
							<div className="panel-heading" onClick={this.toggle}>
								<h2 className="panel-title">Variables Collected in Cohort Study</h2>

								<span className={`pull-right d-inline-block ${this.state.collapse ? 'toggle-up' : 'toggle-down'}`}>
									<i className="fas fa-chevron-up" id="toggle-switch"></i>
								</span>
								<p className={`pull-right d-inline-block padded-string`}>
									{this.state.collapse ? "Click to Collapse" : "Click to Expand"}
								</p>
							</div>
							<Collapse isOpen={this.state.collapse}>
								{this.renderSearchFilters()}
							</Collapse>
						</div>
					</div>
					<div className="filter-block home col-md-12">
						<div className="row" style={{ "display": "flex" }}>
							<div id="tableControls" className="" style={{ "paddingLeft": "15px" }}>
								<ul className="table-controls">
									<FloatingSubmit onClick={this.handleComparasion} align="true" values={this.state.selected} />
								</ul>
							</div>
							<div id="tableExport" style={{ "paddingLeft": "1rem", "paddingTop": "7px" }}>
								<Workbook dataSource={this.loadingData} element={<a id="exportTblBtn" href="javascript:void(0);">Export Table <i className="fas fa-file-export"></i></a>}>
									<Workbook.Sheet name="Cohort_Selection">
										<Workbook.Column label="Cohort Name" value="cohort_name" />
										<Workbook.Column label="Cohort Acronym" value="cohort_acronym" />
										<Workbook.Column label="Total Enrollments (n=)" value="enrollment_total" />
										<Workbook.Column label="Website" value="cohort_web_site" />
										<Workbook.Column label="Last Updated" value="update_time" />
									</Workbook.Sheet>
									<Workbook.Sheet name="Criteria">
									</Workbook.Sheet>
								</Workbook>
							</div>
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
											{this.renderSelectHeader("5%")}
											{this.renderTableHeader("cohort_name", "30%")}
											{this.renderTableHeader("cohort_acronym", "10%")}
											{this.renderTableHeaderMiddle("enrollment_total", "20%")}
											<th className="sortable" width="20%" scope="col">
												<a href="javascript:void(0);" style={{ cursor: 'default' }}>Website
												</a>
											</th>
											{this.renderTableHeader("update_time", "15%")}
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
							<div id="tableControls" className="" style={{ "paddingLeft": "15px" }}>
								<ul className="table-controls">
									<FloatingSubmit onClick={this.handleComparasion} align="true" values={this.state.selected} />
								</ul>
							</div>
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
}
export default Details;