import React, { Component } from 'react';

class CohortStatusList extends Component {

	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			list: [
			],
			lookup: {},
			open: props.startOpen === undefined ? false : true,
			focusThis: this.props.focusThis === undefined ? false : this.props.focusThis == "true" ? true : false,
		};

		/*if(props.startOpen){
			this.focus()
		}*/
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
		this._isMounted = true;
		let reqBody = {
			category: "cohortstatus"
		};
		fetch('/api/cohort/lookup', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(result => {
				let cohortstatuses = result.data.list;
				let arr = [];
				let dict = {};
				cohortstatuses.forEach(function (element) {
					arr.push({ cohortstatus: element.cohortstatus, id: element.id });
					dict[element.id] = { cohortstatus: element.cohortstatus, id: element.id };
				});
				if (this._isMounted) {
					this.setState({
						list: arr,
						lookup: dict
					});
				}
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const values = this.props.values;

		let lookup = Object.assign({}, this.state.lookup);

		const hasUnknown = this.props.hasUnknown;

		let f_list = Object.assign([], this.state.list);
		/*
		if(hasUnknown){
			f_list.push("Other/Unknown");
		}
		*/
		const list = f_list.map((item, idx) => {
			const key = "cohortstatus_" + item.id;
			let checked = (values.indexOf(item.id) > -1);
			let cohortstatusId = 'cohortstatus_checkbox_' + item.id;
			//console.log('gender_Id: ' + genderId);

			return (
				<li key={key}>
					<label>
						<span className="filter-component-input">
							<input id={cohortstatusId} type="checkbox" onClick={() => this.props.onClick(item)} checked={checked} />
						</span>
						{item.cohortstatus}
					</label>
				</li>
			);

		});
		const displayMax = parseInt(this.props.displayMax);

		const selectedList = values.map((item, idx) => {
			const key = "s_cohortstatus_" + idx;
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
					const cohortstatus = lookup[item].cohortstatus;
					return (
						<li key={key}>
							{cohortstatus}
						</li>
					);
				}
				else {
					return "";
				}

			}

		});

		let cls = "dropdown filter-component btn-group filter-component-div";
		if (this.state.open) {
			cls = cls + " open";
		}
		let expanded = this.state.open ? "true" : "false";
		let buttonId = ""
		if (this.state.focusThis == true && this.props.focusThis == "true") {
			buttonId = "focusMe"
		}

		let borderStyle = {};
		const rightBorderStyle = this.props.rightBorderStyle || "curve";

		if (rightBorderStyle == "straight") {
			borderStyle = {
				"borderTopRightRadius": "0px",
				"borderBottomRightRadius": "0px"
			};
		}
		return (
			<div className="filter-component-block">
				<div className={cls} tabIndex="0" onBlur={this.handleBlur}>
					<button className="btn btn-default dropdown-toggle cohortstatus-list-for-testing" style={borderStyle} id={buttonId} data-toggle="dropdown" aria-haspopup="true" aria-expanded={expanded} type="button" onClick={this.handleClick}>
						Status&nbsp;
				<span className="badge">{this.props.values.length}</span>
					</button>
					<div className="dropdown-menu filter-component-dropdown">
						<h4>Status</h4>
						<button className="btn btn-primary pull-right" type="button" onClick={this.handleClick}>X</button>
						<ul>
							{list}
						</ul>
					</div>
				</div>
				<ul className="picked-options">
					{selectedList}
				</ul>
			</div>
		);
	}
}

export default CohortStatusList;