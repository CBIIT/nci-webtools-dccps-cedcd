import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Tab.css';

class Tab extends Component {

  render() {
    let name;
    let url;
    let target;
    if(this.props.value === 0){
      name="Home";
      url="/home";
    }
    else if(this.props.value === 1){
      name="Search Cohorts";
      url="/select";
    }
    else if(this.props.value === 2){
      name="Enrollment Counts";
      url="/enrollment";
    }
    else if(this.props.value === 3){
      name="Cancer Counts";
      url="/cancer";
    }
    else if(this.props.value === 4){
      name="Biospecimen Counts";
      url="/biospecimen";
    }
    else if(this.props.value === 5){
      name="About";
      url="/about";
    }
    else if(this.props.value === 6){
      name="Contact Us";
      url="/contact"
    }
    else if(this.props.value === 7){
      name="Questionnaire"
      url = "/cohort/questionnaire"
      target = "_self"
    }
    else{
      name="Home";
      url="home";
    }
    let cls = this.props.value === this.props.currTab ? "active" : "";
    return (<li className={cls}>
        {!target && <Link to={url} id={this.props.id} onClick={this.props.onClick}><span>{name}</span></Link>}
        {target && <a href={url} target={target}><span>{name}</span></a>}
        <span className="arrow down"></span>
      </li>);
  }
}

export default Tab;