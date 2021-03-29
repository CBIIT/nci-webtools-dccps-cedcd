import React, { Component } from 'react';

class CohortList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			lookup: {},
			open: false
		};

		this.handleBlur = this.handleBlur.bind(this);
	}

	handleClick = () => {
		this.setState({
			open: !this.state.open
		});
	}

	handleBlur(e) {
		if (!this.state.open) {
			return;
		}
		let currentTarget = e.currentTarget;

		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				this.setState({
					open: !this.state.open
				});
			}
		}, 0);
	}

	componentDidMount() {
		let reqBody = {
		};
		fetch('./api/cohort/published_list', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(result => {
				let cohorts = result.data.list;
				let arr = [];
				let dict = {};
				cohorts.forEach(function (element) {
					arr.push({ cohort: element.cohort_name, id: element.id, acronym: element.cohort_acronym });
					dict[element.id] = { cohort: element.cohort_name, id: element.id, acronym: element.cohort_acronym };
				});
				this.setState({
					list: arr,
					lookup: dict
				});
			});
	}

	render() {
		const values = this.props.values;
		let cohorts = Object.assign([], this.state.list);
		let lookup = Object.assign({}, this.state.lookup);
		let selected = [];
		let allIds = [];
		const list = cohorts.map((item, idx) => {
			allIds.push(item.id);
			const key = "cohort_" + item.id;
			let checked = (values.indexOf(item.id) > -1);
			return (
				<li key={key}>
					<label>
						<span className="filter-component-input">
							<input type="checkbox" onChange={() => this.props.onClick(item)} checked={checked} />
						</span>
						{item.acronym}
					</label>
				</li>
			);
		});
		const displayMax = parseInt(this.props.displayMax);
		const selectedList = values.map((item, idx) => {
			const key = "s_cohort_" + idx;
			if (idx >= displayMax) {
				if (idx === values.length - 1 && displayMax < values.length) {
					return (
						<li key={key}>
							and {values.length - displayMax} more...
						</li>
					);
				}
				else {
					return "";
				}
			}
			else {
				if (lookup[item]) {
					const acronym = lookup[item].acronym;
					return (
						<li key={key}>
							{acronym}
						</li>
					);
				}
				else {

				}
			}

		});

		let cls = "dropdown filter-component btn-group filter-component-div";
		if (this.state.open) {
			cls = cls + " open";
		}
		let expanded = this.state.open ? "true" : "false";
		return (
			<div className="filter-component-block">
				<div className={cls} tabIndex="0" onBlur={this.handleBlur}>
					<button className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded={expanded} type="button" onClick={this.handleClick}>
						Select Cohorts&nbsp;
				<span className="badge">{this.props.values.length}</span>
					</button>
					<div className="dropdown-menu filter-component-dropdown">
						<h4>Select Cohort(s)</h4>
						<button className="btn btn-primary pull-right" type="button" onClick={this.handleClick}>X</button>
						<ul>
							<li>
								<label>
									<span className="filter-component-input">
										<input type="checkbox" onClick={(e) => this.props.onClick(null, allIds, e)} checked={this.props.hasSelectAll} />
									</span>
								All Cohorts
							</label>
							</li>
							{list}
						</ul>
					</div>
				</div>
				{this.props.hasSelectAll ? <span style={{ paddingLeft: '2rem' }}>{' '} All Cohorts</span> :
					<ul className="picked-options">
						{selectedList}
					</ul>}
			</div>
		);
	}
}

export default CohortList;