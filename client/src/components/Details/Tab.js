import React, { Component } from 'react';

class Tab extends Component {

  render() {
    return (
      <li role="presentation" className="active"><a id="detailTabs_btnBasic" href="javascript:__doPostBack('detailTabs$btnBasic','')">Basic Info</a></li>
      );
  }

  render() {
    let name;
    if(this.props.value === 0){
      name="Basic Info";
    }
    else if(this.props.value === 1){
      name="Baseline Data";
    }
    else if(this.props.value === 2){
      name="Followup Data";
    }
    else if(this.props.value === 3){
      name="Cancer Info";
    }
    else if(this.props.value === 4){
      name="Mortality";
    }
    else if(this.props.value === 5){
      name="Linkages and Technology";
    }
    else{
      name="Specimen Overview";
    }
    let cls = this.props.value === this.props.currTab ? "active" : "";
    return (
    	<li className={cls}>
    		<a href="javascript:void(0);" onClick={this.props.onClick}>{name}</a>
    	</li>
    	);
  }
}

export default Tab;