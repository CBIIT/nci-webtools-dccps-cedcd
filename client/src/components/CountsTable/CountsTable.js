import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CountsTable extends Component {

	constructor(props){
		super(props);
	}

  render() {
  	const values = this.props.values;
  	const topic = this.props.topic;
  	const cohorts = this.props.cohorts;
  	const others = this.props.others;
  	const config = this.props.config;
	  const data_columns = [];

  	const cohort_columns = cohorts.map((item, idx) => {
  		const key = "th_cohort_"+item.cohort_id;
  		data_columns.push("c_"+item.cohort_id);
      let url = './cohort?id='+item.cohort_id;
  		return (
  			<th className="table-col-150 sortable" key={key}>
          <Link to={url} onClick={this.props.saveHistory}>{item.cohort_acronym}</Link>
			</th>			
  		);
  	});

  	const other_columns = others.map((item, idx) => {
  		const key = "th_other_"+idx;
  		data_columns.push(item);
  		return (<th key={key} className="">{item}</th>);
  	});
  	let column_1 = [];
  	let column_2 = [];
  	let column_2_tmp = [];
  	const list = values.map((item, idx) => {
  		const key = "data_" + idx;
  		if(column_1.indexOf(item.c1) == -1){
  			column_1.push(item.c1);
  		}
  		if(column_2_tmp.indexOf(item.c2) == -1){
  			column_2_tmp.push(item.c2);
  		}
  		const content = data_columns.map((item_1, idx_1) => {
  			let key = "td_"+idx+"_"+idx_1;
  			return (
  				<td key={key}>{item[item_1]}</td>
  			);
  		});
  		return (
  			<tr key={key}>
				<td></td>
				{content}
			</tr>
  		);
  		
  	});

    const c_len = column_2_tmp.length;
  	
  	const column_1_content = column_1.map((item, idx) => {
  		const key = "c_1_"+idx;
  		let style = {};
  		style.height = (c_len * 36)+"px";
  		style.width = config.blockWidth+"px";
  		column_2 = column_2.concat(column_2_tmp);
      let text = item;
      if(c_len ==1 && text.length >= 38){
        text = text.substring(0,35) + "...";
        text = (<div title={item}>{text}</div>);
      }
  		return (<div key={key} className="column__cell-1" style={style}>{text}</div>);
  	});

  	const column_2_content = column_2.map((item, idx) => {
  		const key = "c_2_"+idx;
  		let style = {};
  		style.height = "36px";
  		style.width = config.blockWidth+"px";
  		style.borderRight = "1px #B7B5B0 solid";
      let text = item;
      if(text.length >= 38){
        text = text.substring(0,35) + "...";
        text = (<div title={item}>{text}</div>);
      }
  		return (<div key={key} className="column__cell-2" style={style}>{text}</div>);
  	});

    return (
			<div className="tableArea">
				<table className="enrollTbl" cellSpacing="0" rules="all" has_results="true" border="1" id="enrollTblMales" style={{borderCollapse:"collapse"}}>
					<thead>
						<tr className="col-header">
							<th className={config.blockClass}></th>
							{cohort_columns}
							{other_columns}
						</tr>
					</thead>
					<tbody>
						{list}
					</tbody>
				</table>
				<div className="fixed-header-column fixed-header-column--double fixed-header-column--enroll" aria-hidden="true">
					<div className="header-column__half" style={config.blockStyle}>
						<div className="table-header" data-text="Ethnicity" style={{height:"51px",width:"100%"}}>{topic[0]}</div>
						{column_1_content}
					</div>
					<div className="header-column__half" style={config.blockStyle}>
						<div className="table-header" data-text="Race" style={{height:"51px",width:"100%",borderRight:"1px #B7B5B0 solid"}}>{topic[1]}</div>
						{column_2_content}
					</div>
				</div>
			</div>	
    );
  }
}

export default CountsTable;