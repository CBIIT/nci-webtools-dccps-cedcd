import React, { Component } from 'react';
import UserTour from 'react-user-tour';

class EnrollmentTour extends Component{

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
		const containerStyle = {
			position:"fixed",
			left:0,
			top:0,
			zIndex:9,
			width:"100%",
			height:"100%",
			backgroundColor:"rgba(0, 0, 0, .5)"
		};
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
	                title: <div style={tourTitleStyle}>Enrollment Help</div>,
	                body: <div style={tourMessageStyle}>Starting with Gender, <b>specify one or more</b> participant characteristics from each category and select <b>cohorts,</b> then select <b>Submit</b> to proceed to a table of participants enrolled across the selected cohorts.</div>,
	                position:"top",
	                horizontalOffset:5
	              }
	            ]}
	          />
		);
	}
}


export default EnrollmentTour;