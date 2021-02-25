import React, { Component } from 'react';

class CollectedCancersList extends Component {

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
			category: "cancer"
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
				let cancers = result.data.list;
				if (!this.props.hasNoCancer) cancers = cancers.filter((i) => i.cancer !== "No Cancer")
				let arr = [];
				let dict = {};
				cancers.forEach(function (element) {
					arr.push({ cancer: element.cancer, id: element.id });
					dict[element.id] = { cancer: element.cancer, id: element.id };
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
		const title = this.props.title;
		const innertitle = this.props.innertitle;
		let f_list = Object.assign([], this.state.list);
		let lookup = Object.assign({}, this.state.lookup);

		let allIds = [];

		const list = f_list.map((item, idx) => {
			allIds.push(item.id);
			const key = "cancer_" + idx + 1;
			let checked = (values.indexOf(item.id) > -1);

			return (
				<li key={key}>
					<label>
						<span className="filter-component-input">
							<input type="checkbox" onClick={() => this.props.onClick(item)} checked={checked} />
						</span>
						{item.cancer}
					</label>
				</li>
			);

		});

		const displayMax = parseInt(this.props.displayMax);
		const selectedList = values.map((item, idx) => {
			const key = "s_cancer_" + idx;
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
					const cancer = lookup[item].cancer;
					return (
						<li key={key}>
							{cancer}
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
						{title}&nbsp;
				<span className="badge">{values.length}</span>
					</button>
					<div className="dropdown-menu filter-component-dropdown">
						<h4>{innertitle}</h4>
						<button className="btn btn-primary pull-right" type="button" onClick={this.handleClick}>X</button>
						<ul>
							<li>
								<label>
									<span className="filter-component-input">
										<input type="checkbox" id="cancerAll" onClick={(e) => this.props.onClick(null, allIds, e)} checked={this.props.all_cancers} />
									</span>
								All Cancers
							</label>
							</li>
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

export default CollectedCancersList;