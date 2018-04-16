import React, { Component } from 'react';
import './Information.css';
import Moment from 'react-moment';
import qs from 'query-string';


class Information extends Component {

	constructor(props){
		super(props);
		const id = qs.parse(this.props.location.search).id;
		this.state={
			hasMounted: false,
			cohort_id: id,
			info:{},
			description:true,
			protocol:false,
			data:false
		};
	}

	goBack = () => {
		this.props.history.goBack();
	}

	descriptionClick = () => {

		this.setState({
			description:!this.state.description
		});
	}

	protocolClick = () => {
		this.setState({
			protocol:!this.state.protocol
		});
	}
	
	dataClick = () => {
		this.setState({
			data:!this.state.data
		});
	}

	renderLinks = (idx) => {
		if(idx === 0){
			if(this.state.info.attachments && this.state.info.attachments.protocols){
				const links = this.state.info.attachments.protocols.map((item, id) => {
					const uid = "protocol_"+id;
					if(item.type === 1){
						return (
							<li key={uid} className="link-pdf">
								<a href={item.url}  target="_blank">{item.name}</a>
							</li>
						);
					}
					else{
						return (
							<li key={uid} className="link-url">
								<a href={item.url} target="_blank">{item.url}</a>
							</li>
						);
					}
					
				});
				return (
					<ul className="links-list">
						{links}
					</ul>
				);
			}
			else{
				return (
					<ul>
						<li>Not Provided</li>
					</ul>
				);
			}
		}
		else if(idx === 1){
			if(this.state.info.attachments && this.state.info.attachments.questionnaires){
				const links = this.state.info.attachments.questionnaires.map((item, id) => {
					const uid = "questionnair_"+id;
					if(item.type === 1){
						return (
							<li key={uid} className="link-pdf">
								<a href={item.url}  target="_blank">{item.name}</a>
							</li>
						);
					}
					else{
						return (
							<li key={uid} className="link-url">
								<a href={item.url} target="_blank">{item.url}</a>
							</li>
						);
					}
					
				});
				return (
					<ul className="links-list">
						{links}
					</ul>
				);
			}
			else{
				return (
					<ul>
						<li>Not Provided</li>
					</ul>
				);
			}
		}
		else{
			if(this.state.info.attachments && this.state.info.attachments.policies){
				const links = this.state.info.attachments.policies.map((item, id) => {
					const uid = "policy_"+id;
					if(item.type === 1){
						return (
							<li key={uid} className="link-pdf">
								<a href={item.url}  target="_blank">{item.name}</a>
							</li>
						);
					}
					else{
						return (
							<li key={uid} className="link-url">
								<a href={item.url} target="_blank">{item.url}</a>
							</li>
						);
					}
					
				});
				return (
					<ul className="links-list">
						{links}
					</ul>
				);	
			}
			else{
				return (
					<ul>
						<li>Not Provided</li>
					</ul>
				);
			}
		}
	}
	
	componentDidMount(){
		fetch('./api/cohort/'+this.state.cohort_id)
			.then(res => res.json())
			.then(result => {
				let info = result.data;
				this.setState(prevState => (
					{
						hasMounted: true,
						cohort_id: prevState.cohort_id,
						info:info,
						description:true,
						protocol:false,
						data:false
					}
				));
			});
	}

  render() {
  	if(!this.state.hasMounted){
  		return (<div id="prof-main"></div>);
  	}
  	else{
  		const info = this.state.info;
	  	const mailto = "mailto:"+info.completed_by_email;
	  	let pis = [1,2,3,4,5,6].map((item, idx) => {
	  		let result;
	  		let prop_1 = "pi_name_"+item;
	  		let prop_2 = "pi_institution_"+item;
	  		if(info[prop_1] && info[prop_1].trim() !== ""){
	  			result = (
		  			<li key={item}>
		  				{info[prop_1]} ({info[prop_2]})
		  			</li>
		  		);
	  		}
	  		else{
	  			result = "";
	  		}
	  		return result;
	  	});
	  	let website;
	  	if(info.cohort_web_site && info.cohort_web_site.trim() !== ""){
	  		website = (
	  			<a href={info.cohort_web_site} id="cd_website" className="link-url" target="_blank">Cohort Website</a> 
	  		);
	  	}
	  	else{
	  		website = "";
	  	}
	  	let desc = "<p>"+info.cohort_description+"</p>";
	  	desc = desc.replace(/\n/g,'<br/>');
	  	let description = {
			className:"cedcd-btn " + (this.state.description?"active":""),
			expanded:this.state.description?"true":"false",
			hidden:this.state.description?"false":"true",
			style:{display:this.state.description?"block":"none"}
		};
		let protocol = {
			className:"cedcd-btn " + (this.state.protocol?"active":""),
			expanded:this.state.protocol?"true":"false",
			hidden:this.state.protocol?"false":"true",
			style:{display:this.state.protocol?"block":"none"}
		};
		let data = {
			className:"cedcd-btn " + (this.state.data?"active":""),
			expanded:this.state.data?"true":"false",
			hidden:this.state.data?"false":"true",
			style:{display:this.state.data?"block":"none"}
		};
	  	return (
	        <div id="prof-main">
	          <div id="prof-header">
	            <a className="back" href="javascript:void(0);" onClick={this.goBack}><span className="glyphicon glyphicon-chevron-left"></span><span>Back to previous page</span></a>
	            <h2 className="pg-title"><span id="cd_name">{info.cohort_name}</span> (<span id="cd_acronym">{info.cohort_acronym}</span>)</h2>
	            <div className="rightLink"> <span className="lastUpdated">Last Updated: <span id="cd_lastupdate"><Moment format="MM/DD/YYYY">{info.update_time}</Moment></span></span> </div>
	            <div id="cd_errorMsg" className="errorText"></div>
	          </div>
	          <div className="row topMatter">
	            <div className="cohortInfo col-md-6">
	              <h3>Cohort Collaboration Contact</h3>
	              <p className="profile-contact-intro" style={{fontStyle:'italic',fontSize:'.80em'}}>If interested in collaborating with the cohort on a project, please contact:</p>
	              <ul id="cd_contact">
	              <li>{info.completed_by_name} ({info.completed_by_position})</li>
	              <li className="link-email">
	              	<a href={mailto}>
	              		<span className="glyphicon glyphicon-envelope"></span> {info.completed_by_email}</a></li><li><span className="glyphicon glyphicon-phone-alt"></span> {info.completed_by_phone}</li></ul>
	            </div>
	            <div className="cohortInfo col-md-6 last">
	              <h3>Principal Investigators</h3>
	              <ul id="piList">{pis}</ul>
	              {website}
	            </div>
	          </div>
	          <div className="row bottomMatter">
	            <div id="attachments" className="cohortInfo col-md-12">
	              <button type="button" className={description.className} aria-expanded={description.expanded} aria-controls="more" onClick={this.descriptionClick}><span className="triangle"></span>Cohort Description</button>
	              <div className="cohortInfoBody" id="more" aria-hidden={description.hidden} style={description.style}>
					<div id="cd_description" dangerouslySetInnerHTML={{__html: desc}}/>
	              </div>
	              <button type="button" className={protocol.className} aria-expanded={protocol.expanded} aria-controls="protocols" onClick={this.protocolClick}><span className="triangle"></span>Protocols and Questionnaires</button>
	              <div className="cohortInfoBody" id="protocols" aria-hidden={protocol.hidden} style={protocol.style}>
	                <h3>Study Protocol</h3>
	                <div id="prot_attachments">
	                	{this.renderLinks(0)}
	                </div>
	                <h3>Cohort Questionnaires</h3>
	                <div id="quest_attachments">
	                  	{this.renderLinks(1)}
	                </div>
	              </div>
	              <button type="button" className={data.className} aria-expanded={data.expanded} aria-controls="policies" onClick={this.dataClick}><span className="triangle"></span>Data, Biospecimen, and Authorship Policies</button>
	              <div className="cohortInfoBody" id="policies" aria-hidden={data.hidden} style={data.style}>
	                <div id="pol_attachments">
	                  	{this.renderLinks(2)}
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	      );
  	}
  	
  }
}

export default Information;