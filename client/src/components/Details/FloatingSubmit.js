import React, { Component } from 'react';
import './FloatingSubmit.css';

class FloatingSubmit extends Component {

  handleScroll(event){
    let screenHeight = window.innerHeight;
    let obj = document.getElementById('cohortGridView');
    let box = obj.getBoundingClientRect();
      let body = document.body;
      let docEl = document.documentElement;
      let scrollDistance = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      let clientTop = docEl.clientTop || body.clientTop || 0;
      let toTop  = box.top +  scrollDistance - clientTop;
        let tableHeight = obj.clientHeight+1;
/*
        Makes the bar with the button float on the screen 
        if ((toTop-scrollDistance+tableHeight) > screenHeight) {
          document.getElementById('floatingSubmitButtonContainer').className = "row col-md-12 clearfix floatingFixed";
        }
        else{
          document.getElementById('floatingSubmitButtonContainer').className = "row col-md-12 clearfix atHome";
        }*/
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }


  render() {
    /* Puts it inside of a bar 
    <div id="floatingSubmitButtonContainer" className="row col-md-12 clearfix floatingFixed" style={{align:"center", width: "100%"}}>
    */
    return (
        <div align="center" className="submit-button">
          <input id="compareButton" type="submit" name="submitBtn" value="Go to Cohort Description for Selected Studies" className="btn btn-primary btn-filter btn-cohort-des-coloring" onClick={this.props.onClick} disabled={this.props.values.length == 0}/>
        </div>);
  }
}

export default FloatingSubmit;