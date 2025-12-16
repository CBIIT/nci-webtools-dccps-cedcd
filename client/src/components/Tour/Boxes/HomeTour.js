import React, { Component } from "react";
import UserTour from "react-user-tour";

class HomeTour extends Component {
  render() {
    const tourTitleStyle = {
      fontWeight: 700,
      fontSize: 16,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
    };

    const tourMessageStyle = {
      fontSize: 12,
      paddingLeft: 10,
    };
    const containerStyle = {
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 9,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, .5)",
    };
    const closeButton = (
      <button className="btn btn-primary pull-right tour-close" type="button">
        X
      </button>
    );
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
            selector: "#summaryGridView",
            title: <div style={tourTitleStyle}>1 of 3</div>,
            body: (
              <div style={tourMessageStyle}>
                This table lists all the <b>participating cohorts,</b> which can be{" "}
                <b>sorted by cohort name or acronym.</b>
              </div>
            ),
          },
          {
            step: 2,
            selector: "#inKeyword",
            title: <div style={tourTitleStyle}>2 of 3</div>,
            body: (
              <div style={tourMessageStyle}>
                You can also <b>search</b> for a specific cohort <b>by name or acronym.</b>
              </div>
            ),
            position: "bottom",
          },
          {
            step: 3,
            selector: "#exportTblBtn",
            title: <div style={tourTitleStyle}>3 of 3</div>,
            body: (
              <div style={tourMessageStyle}>
                <b>Table data</b> can be <b>exported</b> in an <b>Excel</b> format. This is available on every table.
              </div>
            ),
          },
        ]}
      />
    );
  }
}

export default HomeTour;
