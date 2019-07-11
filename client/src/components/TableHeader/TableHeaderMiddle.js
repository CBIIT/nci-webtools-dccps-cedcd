import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TableHeader.css';

class TableHeaderMiddle extends Component {

  render() {
    let name;
    if(this.props.value === "cohort_name"){
      name="Cohort Name";
    }
    else if(this.props.value === "cohort_acronym"){
      name="Cohort Acronym";
    }
    else if(this.props.value === "race_total_total"){
      name="Total Enrollment (n=)";
    }
    else if(this.props.value === "update_time"){
      name="Last Updated";
    }
    else{
      name="Cohort Name";
    }
    let cls;
    if(this.props.value === this.props.orderBy.column){
      if(this.props.orderBy.order ==='asc'){
          cls = (<img src="./assets/img/arrow-up.png" className="tableArrow" alt="change the sort order to [Z-A] "></img>);
      }
      else{
          cls = (<img src="./assets/img/arrow-down.png" className="tableArrow" alt="change the sort order to [A-Z] "></img>);
      }
    }
    else{
        cls = "";
    }
    return (
      <th className="sortable" width={this.props.width} scope="col">
        <a href="javascript:void(0);" onClick={this.props.onClick}><p className="top-padded-header" align="center">Total Enrollment
          <br />(n=){cls}
        </p>
        </a>
      </th>
    );
  }
}

export default TableHeaderMiddle;