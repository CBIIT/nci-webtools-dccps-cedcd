import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FloatingHeader extends Component {

  handleScroll = () =>{
    let screenHeight = window.innerHeight;
    let obj = document.getElementById('compareGridView');
    let box = obj.getBoundingClientRect();
    if(box.top > 0){
      document.getElementById('floatingHeader').className = "fixed-header-row-wrapper";
    }
    else{
      document.getElementById('floatingHeader').className = "fixed-header-row-wrapper floatingFixedTop";
    }
    
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }


  render() {
    const params = this.props.params;
    const cohorts = params.cohorts;
    const config = params.config;
    
    const cohort_columns = cohorts.map((item, idx) => {
      const key = "f_th_cohort_"+item.cohort_id;
      let url = './cohort?id='+item.cohort_id;
      let style = {height: "39px",width:config.header[idx]+"px",overlay:{zIndex: 1000}};
      return (
        <div className="fixed-row__cell" style={style} key={key}>
          <Link to={url} onClick={this.props.saveHistory}>{item.cohort_acronym}</Link>
        </div>   
      );
    });
    let stl = {width:config.width};
    let first_column_style = {height: "39px",width: config.first_column_width+"px"};
    return (
      <div id="floatingHeader" className="fixed-header-row-wrapper" style={stl}>
          <div className="xingFloating" style={first_column_style}>Data Collected</div>
          <div id="floatingRow" className="fixed-header-row">
            <div className="fixed-row__cell" style={first_column_style}>Data Collected</div>
            {cohort_columns}
          </div>
        </div>
      );
  }
}

export default FloatingHeader;