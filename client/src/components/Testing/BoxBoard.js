import React, { Component } from 'react';
import Baseline from './Boxes/Baseline';
import BasicInfo from './Boxes/BasicInfo';
import Cancer from './Boxes/Cancer';
import Followup from './Boxes/Followup';
import Linkages from './Boxes/Linkages';
import Mortality from './Boxes/Mortality';
import Specimen from './Boxes/Specimen';


class BoxBoard extends Component {

  render() {
  	let content;
  	let currTab = this.props.currTab;
  	if(currTab === 0){
  		content = (
  			<BasicInfo cohorts={this.props.cohorts} saveHistory={this.props.saveHistory}/>
  		);
  	}
  	else if(currTab === 1){
  		content = (
  			<Baseline cohorts={this.props.cohorts} saveHistory={this.props.saveHistory}/>
  		);
  	}
  	else if(currTab === 2){
  		content = (
  			<Followup cohorts={this.props.cohorts} saveHistory={this.props.saveHistory}/>
  		);
  	}
  	else if(currTab === 3){
  		content = (
  			<Cancer cohorts={this.props.cohorts} saveHistory={this.props.saveHistory}/>
  		);
  	}
  	else if(currTab === 4){
  		content = (
  			<Mortality cohorts={this.props.cohorts} saveHistory={this.props.saveHistory}/>
  		);
  	}
  	else if(currTab === 5){
  		content = (
  			<Linkages cohorts={this.props.cohorts} saveHistory={this.props.saveHistory}/>
  		);
  	}
  	else{
  		content = (
  			<Specimen cohorts={this.props.cohorts} saveHistory={this.props.saveHistory}/>
  		);
  	}
    return content;
  }
}

export default BoxBoard;