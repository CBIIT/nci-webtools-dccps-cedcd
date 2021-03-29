import React, { Component } from 'react';

class CollectedDataList extends Component {

	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			lookup: {},
			open: props.startOpen === undefined ? false : true,
			focusThis: this.props.focusThis === undefined ? false : this.props.focusThis == "true" ? true : false,
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
		this._isMounted = true;
		let reqBody = {
			category: "data_category"
		};
		fetch('./api/cohort/lookup', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(result => {
				let categoryList = result.data.list;
				let arr = [];
				let dict = {};

				categoryList.forEach(function (element) {
					arr.push({ data_category: element.data_category, id: element.id });
					dict[element.id] = { data_category: element.data_category, id: element.id };
				});
				if (this._isMounted) {
					this.setState({
						list: [...arr].sort(this.compareDomains),
						lookup: dict
					});
				}
			});
	}

	compareDomains(d1, d2) {
		let data_categoryA = d1.data_category.toLowerCase()
		let data_categoryB = d2.data_category.toLowerCase()
		return (data_categoryA != data_categoryB) ? data_categoryA > data_categoryB ? 1 : -1 : 0
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {

		const values = this.props.values;
		let lookup = Object.assign({}, this.state.lookup);

		const list = this.state.list.map((item, idx) => {
			const key = "cdata_" + idx;
			let checked = (values.indexOf(item.id) > -1);

			return (
				<li key={key}>
					<label>
						<span className="filter-component-input">
							<input type="checkbox" onClick={() => this.props.onClick(item)} checked={checked} />
						</span>
						{item.data_category}
					</label>
				</li>
			);

		});
		const displayMax = parseInt(this.props.displayMax);
		const selectedList = values.map((item, idx) => {
			const key = "s_cdata_" + idx;
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
					const data_category = lookup[item].data_category;
					return (
						<li key={key}>
							{data_category}
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
					<button className="btn btn-default dropdown-toggle" style={borderStyle} id={buttonId} data-toggle="dropdown" aria-haspopup="true" aria-expanded={expanded} type="button" onClick={this.handleClick}>
						Categories of Data Collected&nbsp;
				<span className="badge">{values.length}</span>
					</button>
					<div className="dropdown-menu filter-component-dropdown">
						<h4>Data Collected</h4>
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

export default CollectedDataList;