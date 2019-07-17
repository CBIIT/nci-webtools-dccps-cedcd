import React, { Component } from 'react';
import UserTour from 'react-user-tour';

class CancerTour extends Component{

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
		return (
			<UserTour
				id = "trialBoxId"
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
	                title: <div style={tourTitleStyle}>Cancer Help</div>,
	                body: <div style={tourMessageStyle}>Starting with Gender, <b>specify one or more</b> participant characteristics from each category and select <b>cohorts,</b> then select <b>Submit</b> to proceed to a table of cancers across the selected cohorts.</div>,
	                position:"bottom",
	                horizontalOffset:5
	              }
	            ]}
	          />
		);
	}
}


export default CancerTour;