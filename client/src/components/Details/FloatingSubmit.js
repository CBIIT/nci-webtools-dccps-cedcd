import React, { Component } from 'react';
import Reminder from '../Tooltip/Tooltip'
import './FloatingSubmit.css';

class FloatingSubmit extends Component {

  handleScroll(event) {
    let screenHeight = window.innerHeight;
    let obj = document.getElementById('cohortGridView');
    let box = obj.getBoundingClientRect();
    let body = document.body;
    let docEl = document.documentElement;
    let scrollDistance = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let clientTop = docEl.clientTop || body.clientTop || 0;
    let toTop = box.top + scrollDistance - clientTop;
    let tableHeight = obj.clientHeight + 1;
    /*
            Makes the bar with the button float on the screen 
            if ((toTop-scrollDistance+tableHeight) > screenHeight) {
              document.getElementById('floatingSubmitButtonContainer').className = "row col-md-12 clearfix floatingFixed";
            }
            else{
              document.getElementById('floatingSubmitButtonContainer').className = "row col-md-12 clearfix atHome";
            }*/
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  render() {
    /* Puts it inside of a bar 
    <div id="floatingSubmitButtonContainer" className="row col-md-12 clearfix floatingFixed" style={{align:"center", width: "100%"}}>
    */
    if (this.props.align === undefined) {
      return (
        <div align="center" >
          <Reminder info={true} message="Click to view selected cohort data when one or multiple check-boxes are checked">
            <span style={{ fontSize: 18 }}>
              <button id="compareButton" type="submit" name="submitBtn" value="View Cohort Data"
                className="btn btn-link compare-button" onClick={this.props.onClick} style={{ fontSize: 18 }}
                disabled={this.props.values.length === 0} style={this.props.values.length === 0 ? { pointerEvents: "none" } : {}} >
                View Cohort Data <i className="fas fa-file-alt"></i>
              </button>
            </span>
          </Reminder>

        </div >);
    }
    else {
      return (
        <div align="" >
          <Reminder info={true} message="Click to view selected cohort data when one or multiple check-boxes are checked">
            <span style={{ fontSize: 18 }}>
              <button id="compareButton" type="submit" name="submitBtn" value="View Cohort Data"
                className="btn btn-link compare-button" onClick={this.props.onClick} style={{ fontSize: 18 }}
                disabled={this.props.values.length === 0} style={this.props.values.length === 0 ? { pointerEvents: "none" } : {}} >
                View Cohort Data <i className="fas fa-file-alt"></i>
              </button>
            </span>
          </Reminder>
        </div >);
    }
  }
}

export default FloatingSubmit;