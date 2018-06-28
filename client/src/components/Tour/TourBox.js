import React, { Component } from 'react';
import UserTour from 'react-user-tour';
import HomeTour from './Boxes/HomeTour';
import DetailsTour from './Boxes/DetailsTour';
import EnrollmentTour from './Boxes/EnrollmentTour';
import CancerTour from './Boxes/CancerTour';
import BiospecimenTour from './Boxes/BiospecimenTour';

class TourBox extends Component{

	constructor(props){
		super(props);
		this.state = {
			isTourActive:false,
      		tourStep:1,
      		selector:[["summaryGridView","inKeyword","exportSpan"],
      				["filter-panel","cohortGridView","compareButton"],
      				["filter-panel"],
      				["filter-panel"],
      				["filter-panel"]
      				]
		};
	}

	showHelp = () =>{
		if(document.getElementById('tourable')){
			document.body.scrollTop = 0;
    		document.documentElement.scrollTop = 0;
			document.getElementById("selectPage").style.overflowY = "hidden";
			let selector = this.state.selector[this.props.currTab][this.state.tourStep-1];
			document.getElementById(selector).style.zIndex = 10000;
			document.getElementById(selector).style.position = "relative";
			document.getElementById(selector).style.background = "white";
			this.setState({
				isTourActive:!this.state.isTourActive
			});
	    }
	}

	toTour = (i) =>{
		let selector = this.state.selector[this.props.currTab][this.state.tourStep -1];
		document.getElementById(selector).style.cssText = "remove-css";
		selector = this.state.selector[this.props.currTab][i-1];
		document.getElementById(selector).style.zIndex = 10000;
		document.getElementById(selector).style.position = "relative";
		document.getElementById(selector).style.background = "white";
		this.setState({
			tourStep:i
		});
	}

	handleCancel = () =>{
	  	let selector = this.state.selector[this.props.currTab][this.state.tourStep-1];
		document.getElementById(selector).style.cssText = "remove-css";
		document.getElementById("selectPage").style.overflowY = "";
		this.setState({
			isTourActive:!this.state.isTourActive,
			tourStep:1
		});
	}

	render(){
		let content = "";
		if(this.props.currTab == 0){
			content = (<HomeTour active={this.state.isTourActive} tourStep={this.state.tourStep} toTour={this.toTour} handleCancel={this.handleCancel}/>);
		}
		else if(this.props.currTab == 1){
			content = (<DetailsTour active={this.state.isTourActive} tourStep={this.state.tourStep} toTour={this.toTour} handleCancel={this.handleCancel}/>);
		}
		else if(this.props.currTab == 2){
			content = (<EnrollmentTour active={this.state.isTourActive} tourStep={this.state.tourStep} toTour={this.toTour} handleCancel={this.handleCancel}/>);
		}
		else if(this.props.currTab == 3){
			content = (<CancerTour active={this.state.isTourActive} tourStep={this.state.tourStep} toTour={this.toTour} handleCancel={this.handleCancel}/>);
		}
		else if(this.props.currTab == 4){
			content = (<BiospecimenTour active={this.state.isTourActive} tourStep={this.state.tourStep} toTour={this.toTour} handleCancel={this.handleCancel}/>);
		}
		else{
			content = "";
		}
		return (
			<li>
				<a onClick={this.showHelp}>
					<i className="fas fa-question-circle"></i>
				</a>
	          	{content}
	        </li>
		);
	}
}


export default TourBox;