import React, { Component } from "react";
import "./NavBar.css";
import Tab from "../Tab/Tab";
import TourBox from "../Tour/TourBox";

class NavBar extends Component {
  renderTab(i) {
    return (
      <Tab
        value={i}
        currTab={this.props.currTab}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    /*        {this.renderTab(7)}*/
    return (
      /*
      <ul id="mainNav">
        {this.renderTab(0)}
        {this.renderTab(1)}
        {this.renderTab(2)}
        {this.renderTab(3)}
        {this.renderTab(4)}
        {this.renderTab(5)}
        {this.renderTab(6)}
        <TourBox currTab={this.props.currTab}/>
      </ul>*/
      <ul id="mainNav">
        <Tab
          id="homeTab"
          value={0}
          currTab={this.props.currTab}
          onClick={() => this.props.onClick(0)}
        />
        <Tab
          id="searchCohortsTab"
          value={1}
          currTab={this.props.currTab}
          onClick={() => this.props.onClick(1)}
        />
        <Tab
          id="enrollmentCountTab"
          value={2}
          currTab={this.props.currTab}
          onClick={() => this.props.onClick(2)}
        />
        <Tab
          id="cancerCountTab"
          value={3}
          currTab={this.props.currTab}
          onClick={() => this.props.onClick(3)}
        />
        <Tab
          id="biospecimenCountTab"
          value={4}
          currTab={this.props.currTab}
          onClick={() => this.props.onClick(4)}
        />
        <Tab
          id="aboutTab"
          value={5}
          currTab={this.props.currTab}
          onClick={() => this.props.onClick(5)}
        />
        <Tab
          id="contactTab"
          value={6}
          currTab={this.props.currTab}
          onClick={() => this.props.onClick(6)}
        />
        <TourBox currTab={this.props.currTab} />
        <Tab
          id="newCohortTab"
          value={7}
          currTab={this.props.currTab}
          onClick={() => this.props.onClick(7)}
        />

        {/* use target=_self to enforce apache login rules (force normal navigation) */}
        <li className="dropdown">
          <div id="dropHeader" style={{ marginTop: "8px" }}>
            <a target="_self" href="/admin/managecohort" className="dropbtn">
              Admin
            </a>
            <div className="dropdown-content">
              <a target="_self" href="/admin/newcohort">Add New Cohort</a>
              <a target="_self" href="/admin/managecohort">Manage Cohorts</a>
              <a target="_self" href="/admin/newuser">Add Cohort Owners</a>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}

export default NavBar;
