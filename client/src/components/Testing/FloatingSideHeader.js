import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

class FloatingSideHeader extends Component {

  render() {
    const params = this.props.params;
    const config = params.config;
    const values = params.values;
    const sideHeader = params.config.sideHeader;
    const content = values.map((item, idx) => {
        let cls = item.type == "block"? "row-header" : "body-header";
        cls += item.rows?" clickable":"";
        let style = {
          height: sideHeader[idx],
          width:config.first_column_width+"px"
        };
        if(item.type !== "block" && !item.cls){
          style.display = "none";
        }
        let key = "s_h_"+idx;
        let span = "";
        if(item.title){
          span = (
              <span>
                {item.name}&nbsp;
                <a data-tip={item.title} className="reactTooltip">&#9432;</a>
                <ReactTooltip class='customeTheme' effect='solid'/>
              </span>
          );
        }
        else{
          span = (<span>{item.name}</span>);
        }
        let expand = "";
        if(item.type == "data" && item.rows){
          let icon = values[idx+1].cls?"section-expand active":"section-expand";
          let s = {marginTop:((sideHeader[idx]/2) - 15 + 2)+"px"};
          expand = (<a className={icon} style={s}></a>);
        }
        if(item.rows){
          return (
              <div key={key} className={cls} style={style} onClick={() => this.props.expand(idx+1,item.rows)}>{span}{expand}</div>
          );
        }
        else{
          return (
              <div key={key} className={cls} style={style}>{span}{expand}</div>
          );
        }
        
    });
    const first_column_style = {height: "36px", width: config.first_column_width+"px"};
    return (
      <div className="inner-fixed-header-column">
        <div className="table-header" style={first_column_style}>Data Collected</div>
        {content}
      </div>
      );
  }
}

export default FloatingSideHeader;