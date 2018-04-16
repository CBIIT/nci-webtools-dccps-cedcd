import React, { Component } from 'react';

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

        if ((toTop-scrollDistance+tableHeight) > screenHeight) {
          document.getElementById('floatingSubmitButtonContainer').className = "row col-md-12 clearfix floatingFixed";
        }
        else{
          document.getElementById('floatingSubmitButtonContainer').className = "row col-md-12 clearfix atHome";
        }
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }


  render() {
    return (
      <div id="floatingSubmitButtonContainer" className="row col-md-12 clearfix floatingFixed" style={{width: "1170px"}}>
        <div className="submit-button">
          <input type="submit" name="submitBtn" value="Submit Cohort(s)" className="btn btn-primary bttn_submit btn-filter" onClick={this.props.onClick} disabled={this.props.values.length == 0}/>
        </div>
      </div>);
  }
}

export default FloatingSubmit;