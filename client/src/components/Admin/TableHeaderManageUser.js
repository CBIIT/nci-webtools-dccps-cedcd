import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TableHeaderManageCohort.css';

class TableHeaderManageUser extends Component {

  render() {
    let name;
    if (this.props.value === "name") {
      name = "Name";
    } else if (this.props.value === "id") {
      name = "id";
    }
    // else if (this.props.value === "user_name") {
    //   name = "User Account";
    // }
    else if (this.props.value === "email") {
      name = "Account Email";
    }
    else if (this.props.value === "login_type") {
      name = "Login Type";
    }
    else if (this.props.value === "user_role") {
      name = "Role";
    }
    else if (this.props.value === "cohort_list") {
      name = "Cohort";
    }
    else if (this.props.value === "active_status") {
      name = "Active";
    }
    else if (this.props.value === "last_login") {
      name = "Last Login Date";
    }
    else {
      name = "Action";
    }
    let cls;
    if (this.props.value === this.props.orderBy.column) {
      if (this.props.orderBy.order === 'asc') {
        cls = (<img src="/assets/img/arrow-up.png" className="tableArrow" alt="change the sort order to [Z-A] "></img>);
      }
      else {
        cls = (<img src="/assets/img/arrow-down.png" className="tableArrow" alt="change the sort order to [A-Z] "></img>);
      }
    }
    else {
      cls = "";
    }
    return (
      <th className="sortable text-nowrap" width={this.props.width} scope="col">
        <a href="javascript:void(0);" onClick={this.props.onClick} style={{ textDecoration: "none" }}>{name}
          {cls}
        </a>
      </th>
    );
  }
}

export default TableHeaderManageUser;