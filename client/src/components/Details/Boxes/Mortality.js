import React, { Component } from 'react';
import DetailsTable from '../DetailsTable';
import FloatingSideHeader from '../FloatingSideHeader';
import FloatingHeader from '../FloatingHeader';
import moment from 'moment';
import Workbook from '../../Workbook/Workbook';

class Mortality extends Component {

	constructor(props){
		super(props);
		this.state = {
			list:[],
			cohorts:[]
		};
	}

	handleExpand = (from, len) =>{
		let list = Object.assign([],this.state.list);
		for(let i = from; i< from + len ; i++){
			const pos = list[i].parent_pos;
			if(pos){
				if((i+pos) == (from -1)){
					list[i].cls = !list[i].cls;
				}
				else{
					list[i].cls = list[i+pos].cls && list[i].cls; 
				}
			}
			else{
				list[i].cls = !list[i].cls;
			}
		}
		this.setState({
			list: list
		});
	}

	handleScroll(event){
		let left = event.target.scrollLeft;
		document.getElementById("floatingRow").style.marginLeft = 0-left;
	}

	componentDidMount(){
		let reqBody = {};
		reqBody.cohorts = this.props.cohorts;
		fetch('./api/cohort/details/mortality',{
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
		        'Content-Type': 'application/json'
		    }
		})
		.then(res => res.json())
		.then(result => {
			let list = result.data.list;
			//initial display
			let curr_block = 0;
			list.forEach(function(l){
				if(l.type === "block"){
					curr_block++;
					l.cls = true;
				}
				else{
					if(curr_block <= 1){
						l.cls = true && l.parent_pos === undefined;
					}
					else{
						l.cls = false;
					}
				}
			});
			let cohort_info = result.data.cohorts
			this.setState(
				{
					list: list,
					cohorts:cohort_info
				}
			);
		});
	}

	loadingData = (next) =>{
		const state = Object.assign({}, this.state);
		const ds = moment().format('YYYYMMDD');
		const dt = moment().format('MM/DD/YYYY');
		const filename = "compare_Mortality_"+ds+".xlsx";
		const data = {};
		data.filename = filename;
		data.list = {};
		data.list["Mortality"] = {};
		data.list["Mortality"].header = [["Cohort Data Export Generated from the CEDCD Website (cedcd.nci.nih.gov)"],
							["Table Name:","Cohort Overview Tab: Mortality"],
							["Export Date:",dt],
							[],
							[]];
		let rows = [];
		//generate rows
		state.list.forEach(function(l){
			if(l.type == "data"){
				let tmp = {};
				tmp["Data Collected"] = l.name;
				state.cohorts.forEach(function(c){
					tmp[c.cohort_acronym] = l["c_"+c.cohort_id];
				});
				rows.push(tmp);
			}
		});
		data.list["Mortality"].rows = rows;
		next(data);
	}

  render() {
  	let width = document.getElementById('cedcd-main-content').clientWidth;
    let params = {};
  	params.values = this.state.list;
  	params.cohorts = this.state.cohorts;
  	params.config = {};
  	params.config.width = width - 90;
  	params.config.header = [];
  	params.config.f_header = [];
  	params.config.first_column_width = 400;
  	let len = params.cohorts.length;
  	width = width - 92 - params.config.first_column_width;
  	if(width > 200*len){
  		let w = Math.floor(width/len);
  		let mod = width%len;
  		for(let i = 0; i< len ; i++){
  			if(i == len -1){
  				params.config.header.push(w+mod);
  				params.config.f_header.push(w+mod);
  			}
  			else{
  				params.config.header.push(w);
  				params.config.f_header.push(w+1);
  			}
  		}
  	}
  	else{
  		for(let i = 0; i< len ; i++){
  			params.config.header.push(200);
  			params.config.f_header.push(200+1);
  		}
  	}
  	params.config.sideHeader = [48,55,36,36,131,36,36,36,36,36,112];
  	let cohorts_export = params.cohorts.map((item, idx) => {
  		const key = "export_c_"+idx;
  		return (
  			<Workbook.Column key={key} label={item.cohort_acronym} value={item.cohort_acronym}/>
  		);
  	});
  	let exportTable = (
  				<Workbook dataSource={this.loadingData} element={<a id="exportTblBtn" href="javascript:void(0);">Export Table <span className="glyphicon glyphicon-export"></span></a>}>
			      <Workbook.Sheet name="Mortality">
			        <Workbook.Column label="Data Collected" value="Data Collected"/>
			        {cohorts_export}
			      </Workbook.Sheet>
			    </Workbook>);
    return (
    <div>
      	<div id="table-intro" className="col-md-12">
		  <h2 className="table-title">
		  	<span id="tabLabel" className="subtitle">Mortality</span>
		  </h2>
		  <div className="table-description">
		    <p>The Cohort Overview compares the cohort design and the types of data and specimens collected across the cohorts you selected. To view more information about a specific cohort, select the acronym of the cohort at the top of the table.</p>
		  </div>
		</div>
		<div id="cedcd-cohorts-inner" className="col-md-12 activeArea">
			<div className="table-inner col-md-12">
				<div className="table-legend col-sm-9"> <span className="">N/A: Not Applicable; N/P: Not Provided</span> </div>
				<div className="table-export col-sm-3">
					{exportTable}
				</div>
				<div className="clearFix"></div>
				<div className="cedcd-table" onScroll={(e) => this.handleScroll(e)}>
					<DetailsTable expand={this.handleExpand} params={params}/>
					<FloatingSideHeader expand={this.handleExpand} params={params}/>
					<FloatingHeader saveHistory={this.props.saveHistory} params={params}/>
	            </div> 
	        </div>
	    </div>
	</div>);
  }
}

export default Mortality;