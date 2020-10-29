import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PageSummary.css';

class PageSummary extends Component {

  render() {
    const total = this.props.pageInfo.total;
    //const page = this.props.pageInfo.page;
    const page = 1;
    alert("total: " + total + "page: " + page)
    let pageStart;
    let pageEnd;
    if (page === 0) {
      pageStart = 1;
      pageEnd = total;
    }
    else {
      pageStart = (page - 1) * this.props.pageInfo.pageSize + 1;
      pageEnd = pageStart + this.props.pageInfo.pageSize - 1;
      pageEnd = pageEnd > total ? total : pageEnd;
    }
    if (this.props.mid === undefined) {
      return (
        <li className="total">
          <span id="summaryCount">{pageStart}-{pageEnd} of {total}</span>
        </li>);
    }
    else {
      return (
        <span style={{ "display": "block", "textAlign": "center" }} id="summaryCount">Viewing {pageStart}-{pageEnd} of {total}</span>
      );
    }
  }

}

export default PageSummary;