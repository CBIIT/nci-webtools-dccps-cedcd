import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Tab.css';

class Tab extends Component {

  render() {
    let name;
    let url;
    if(this.props.value === 0){
      name="Home";
      url="home";
    }
    else if(this.props.value === 1){
      name="Cohort Details";
      url="select";
    }
    else if(this.props.value === 2){
      name="Enrollment Counts";
      url="enrollment";
    }
    else if(this.props.value === 3){
      name="Cancer Counts";
      url="cancer";
    }
    else if(this.props.value === 4){
      name="Biospecimen Counts";
      url="biospecimen";
    }
    else if(this.props.value === 5){
      name="About";
      url="about";
    }
    else{
      name="Home";
      url="home";
    }
    let cls = this.props.value === this.props.currTab ? "active" : "";
    return (<li className={cls}>
        <Link to={url}  onClick={this.props.onClick}><span>{name}</span></Link>
        <span className="arrow down"></span>
      </li>);
  }
}

export default Tab;