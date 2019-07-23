import React, { Component } from 'react';
import UserTour from 'react-user-tour';

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
		let containerStyle = {
			position:"fixed",
			left:0,
			top:0,
			zIndex:9,
			width:"100%",
			height:"100%",
			backgroundColor:"rgba(0, 0, 0, .5)"
		};
		let offset = 0;
		
		if(document.getElementById("compareButton")){
			offset = -1 * (document.getElementById("selectPage").getBoundingClientRect().height - window.innerHeight);
		}
		
		if(this.props.tourStep == 3){
			containerStyle = {
				position:"fixed",
				left:0,
				top: offset,
				zIndex:9,
				width:"100%",
				height:"2000%",
				backgroundColor:"rgba(0, 0, 0, .5)"
			};
		}
		const closeButton = (<button className="btn btn-primary pull-right tour-close" type="button">X</button>);
		return (
			<UserTour
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
	                title: <div style={tourTitleStyle}>1 of 3</div>,
	                body: <div style={tourMessageStyle}><b>Filter</b> the list of cohorts by applying a set of <b>specific criteria.</b> Each <b>category</b> can be <b>expanded by clicking on the subject header.</b>  After a selections are made, select <b>Apply Criteria,</b> to see the list of cohorts that match to the selections.</div>,
	                position:"top"
	              },
	              {
	                step: 2,
	                selector: "#cohortGridView",
	                title: <div style={tourTitleStyle}>2 of 3</div>,
	                body: <div style={tourMessageStyle}><b>Select one or more</b> cohorts <b>to compare Cohort Details</b> across cohorts. </div>,
	                position:"top"
	              },
	              {
	                step: 3,
	                selector: "#compareButton",
	                title: <div style={tourTitleStyle}>3 of 3</div>,
	                body: <div style={tourMessageStyle}>Select <b>Submit</b> to see the detail information available.</div>,
	                position:"top"
	              }
	            ]}
	          />
		);
	}
}


export default DetailsTour;