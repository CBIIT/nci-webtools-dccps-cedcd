import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TableHeaderManageCohort.css";

class TableHeaderManageCohort extends Component {
  render() {
    let name;
    if (this.props.value === "name") {
      name = "Cohort Name";
    } else if (this.props.value === "cohort_id") {
      name = "id";
    } else if (this.props.value === "acronym") {
      name = "Acronym";
    } else if (this.props.value === "type") {
      name = "Cohort Type";
    } else if (this.props.value === "status") {
      name = "Status";
    } else if (this.props.value === "ver") {
      name = "Questionnaire Version";
    } else if (this.props.value === "submit_by") {
      name = "Submitted By";
    } else if (this.props.value === "update_time") {
      name = "Last Updated";
    } else {
      name = "Action";
    }
    let cls;
    if (this.props.value === this.props.orderBy.column) {
      if (this.props.orderBy.order === "asc") {
        cls = <img src="/assets/img/arrow-up.png" className="tableArrow" alt="change the sort order to [Z-A] "></img>;
      } else {
        cls = <img src="/assets/img/arrow-down.png" className="tableArrow" alt="change the sort order to [A-Z] "></img>;
      }
    } else {
      cls = "";
    }
    return (
      <th className="sortable" width={this.props.width} scope="col">
        <a href="javascript:void(0);" onClick={this.props.onClick}>
          {name}
          {cls}
        </a>
      </th>
    );
  }
}

export default TableHeaderManageCohort;
