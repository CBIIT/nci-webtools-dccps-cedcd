import React, { Component } from 'react';
import UserTour from 'react-user-tour';
import ReactDOM from 'react-dom';
import RotatingFileStream from 'rotating-file-stream';

class DetailsTour extends Component{


	render(){
		const tourTitleStyle = {
			fontWeight: 700,
			fontSize: 16,
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft: 10
		};

		const tourMessageStyle = {
			fontSize: 12,
			paddingLeft: 10
		};
		let pageRect = document.getElementById("selectPage").getBoundingClientRect();
		let height = pageRect.height + 1;
		let width = pageRect.width;
		let questionPosition = document.getElementById("tourNav").getBoundingClientRect();
		let distanceLeft = -1 * questionPosition.left;
		let distanceUp = -1 * questionPosition.top - document.body.scrollTop;

		const containerStyle = {
			position:"absolute",
			left:distanceLeft,
			top:distanceUp,
			zIndex:9,
			width:width,
			height:height,
			backgroundColor:"rgba(0, 0, 0, .5)",
			//scroll-snap-type: "both mandatory"
		};
		const closeButton = (<button className="btn btn-primary pull-right tour-close" type="button">X</button>);
		let checkSwitch = document.getElementsByClassName("switchSearchButtonToAdvanced");
		let step2body;
		if(checkSwitch.length > 0	){
			step2body =  <div style={tourMessageStyle}><b>Switch</b> to <b>advanced search</b> where you can use more complex search queries.</div>;
		}
		else{
			step2body =  <div style={tourMessageStyle}><b>Switch</b> to <b>basic search</b>, the recommended way to search.</div>;
		}
		return (
			<UserTour
				id="trialboxId"
	            active={this.props.active}
	            step={this.props.tourStep}
	            onNext={(step) => this.props.toTour(step)}
	            onBack={(step) => this.props.toTour(step)}
	            onCancel={this.props.handleCancel}
	            containerStyle={containerStyle}
	            closeButtonText={closeButton}
	            steps={[
	              {
	                step: 1,
	                selector: "#filter-panel",
	                title: <div style={tourTitleStyle}>1 of 4</div>,
	                body: <div style={tourMessageStyle}><b>Filter</b> the list of cohorts by applying a set of <b>specific criteria.</b> Each <b>category</b> can be <b>expanded by clicking on the subject header.</b>  After a selections are made, select <b>Apply Criteria,</b> to see the list of cohorts that match to the selections.</div>,
	                position:"top"
				  },
				  {
					step: 2,
	                selector: "#switchSearchButton",
	                title: <div style={tourTitleStyle}>2 of 4</div>,
	                body: step2body,
	                position:"top"
				  },
	              {
	                step: 3,
	                selector: "#cohortGridView",
	                title: <div style={tourTitleStyle}>3 of 4</div>,
	                body: <div style={tourMessageStyle}><b>Select one or more</b> cohorts <b>to compare Cohort Details</b> across cohorts. </div>,
	                position:"top"
	              },
	              {
	                step: 4,
	                selector: "#compareButton",
	                title: <div style={tourTitleStyle}>4 of 4</div>,
	                body: <div style={tourMessageStyle}>Select <b>Submit</b> to see the detail information available.</div>,
	                position:"top"
	              }
	            ]}
	          />
		);
	}
}


export default DetailsTour;