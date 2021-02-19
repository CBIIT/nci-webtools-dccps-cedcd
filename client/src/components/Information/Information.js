import React, { Component, useState } from 'react';
import './Information.css';
import Moment from 'react-moment';
import qs from 'query-string';
import { CollapsiblePanelContainer, CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';

class Information extends Component {

	constructor(props) {
		super(props);
		const id = qs.parse(this.props.location.search).id;
		this.state = {
			hasMounted: false,
			cohort_id: id,
			info: {},
			description: true,
			protocol: false,
			data: false
		};
	}

	goBack = () => {
		this.props.history.goBack();
	}

	descriptionClick = () => {

		this.setState({
			description: !this.state.description
		});
	}

	protocolClick = () => {
		this.setState({
			protocol: !this.state.protocol
		});
	}

	dataClick = () => {
		this.setState({
			data: !this.state.data
		});
	}

	renderLinks = (idx) => {
		/*	if(idx === 0){
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
							let url = item.url;
							if(!url.startsWith("http")){
								url = "http://"+url;
							}
							return (
								<li key={uid} className="link-url">
									<a href={url} target="_blank">{item.url}</a>
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
			else */
		if (idx === 0) {
			if (this.state.info.attachments && this.state.info.attachments.questionnaires) {
				const links = this.state.info.attachments.questionnaires.map((item, id) => {
					const uid = "questionnair_" + id;
					if (item.type === 1) {
						return (
							<li key={uid} className="link-pdf">
								<a href={item.url} target="_blank">{item.name}</a>
							</li>
						);
					}
					else {
						let url = item.url;
						if (!url.startsWith("http")) {
							url = "http://" + url;
						}
						return (
							<li key={uid} className="link-url">
								<a href={url} target="_blank">{item.url}</a>
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
			else {
				return (
					<ul>
						<li>Not Provided</li>
					</ul>
				);
			}
		}// end idx ==1 
		else {

			// combination of  basic info request_procedures_web_url and attachments policies 
			let has = false;  // has == true -> not provided 
			let request_web_url = this.state.info.request_procedures_web_url;
			let return_body = []
			// check if is a valid web url
			if (!request_web_url.startsWith("http") && !request_web_url.startsWith("www") && !request_web_url.startsWith("wiki.")) {
				// nothing to do 
			} else {
				has = true
				return_body.push(
					<li className="link-url" key="request_procedures_web_url_key">
						<a href={request_web_url} target="_blank">{request_web_url}</a>
					</li>
				)
			}

			if (this.state.info.attachments && this.state.info.attachments.policies) {
				// map return 
				const links = this.state.info.attachments.policies.map((item, id) => {
					const uid = "policy_" + id;
					if (request_web_url !== "" && request_web_url.trim() == item.url.trim()) {
						return;
					}
					if (item.type === 1) {
						has = true;
						return_body.push(
							<li key={uid} className="link-pdf">
								<a href={item.url} target="_blank">{item.name}</a>
							</li>
						)
					}
					else {
						let url = item.url;
						if (!url.startsWith("http")) {
							url = "http://" + url;
						}
						has = true;
						return_body.push(
							<li key={uid} className="link-url">
								<a href={url} target="_blank">{item.url}</a>
							</li>
						)
					}
				}); // end mapping
			}
			if (!has) {
				return (
					<ul>
						<li>Not Provided</li>
					</ul>
				);
			} else {
				return <ul className="links-list"> {return_body} </ul>;
			}
		}// end else 
	}

	componentDidMount() {
		fetch('./api/cohort/' + this.state.cohort_id)
			.then(res => res.json())
			.then(result => {
				let info = result.data;
				this.setState(prevState => (
					{
						hasMounted: true,
						cohort_id: prevState.cohort_id,
						info: info,
						description: true,
						protocol: false,
						data: false
					}
				));
			});
	}

	render() {
		if (!this.state.hasMounted) {
			return (<div id="prof-main"></div>);
		}
		else {
			const info = this.state.info;
			const mailto = "mailto:" + info.collab_email;
			let pis = info.pis.map((item, idx) => {
				let result;
				let prop_1 = item.name;
				let prop_2 = item.institution;
				if (prop_1 && prop_1.trim() !== "") {
					result = (
						<li key={"pi_" + item.id}>
							{prop_1} ({prop_2})
						</li>
					);
				}
				else {
					result = "";
				}
				return result;
			});
			/*
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
			*/

			let website, proceduresite, files;
			if (info.cohort_web_site && info.cohort_web_site.trim() !== "Not Available" && info.cohort_web_site.trim() !== "") {
				website = (
					//<a href={info.cohort_web_site} id="cd_website" className="link-url" target="_blank">Cohort Website</a>
					<a href={info.cohort_web_site} target="_blank">{info.cohort_web_site}</a>
				);

			}
			/*else {
				website = <a href="#" id="cd_website" className="link-url">Cohort Website (Not Provided)</a>;
			} */

			if (info.request_procedures_web_url && info.request_procedures_web_url.trim() !== "Not Available" && info.request_procedures_web_url.trim() !== "") {
				proceduresite = (
					<li><a href={info.request_procedures_web_url} target="_blank">{info.request_procedures_web_url}</a></li>
				);

			}

			if (info.procedure_files.length > 0) {
				files = info.procedure_files.map((item, idx) => <li i key={idx} className="link-pdf"><a
					style={{ lineHeight: '2rem' }} href={`/api/download/${item}`} download={false} target="_blank">{item}</a></li>)
			}

			let desc = "<p>" + info.cohort_description + "</p>";
			desc = desc.replace(/\\n/g, '\n').replace(/\n/g, '<br/>');
			let description = {
				className: "cedcd-btn " + (this.state.description ? "active" : ""),
				expanded: this.state.description ? "true" : "false",
				hidden: this.state.description ? "false" : "true",
				style: { display: this.state.description ? "block" : "none" }
			};
			let protocol = {
				className: "cedcd-btn " + (this.state.protocol ? "active" : ""),
				expanded: this.state.protocol ? "true" : "false",
				hidden: this.state.protocol ? "false" : "true",
				style: { display: this.state.protocol ? "block" : "none" }
			};
			let data = {
				className: "cedcd-btn " + (this.state.data ? "active" : ""),
				expanded: this.state.data ? "true" : "false",
				hidden: this.state.data ? "false" : "true",
				style: { display: this.state.data ? "block" : "none" }
			};
			return (
				<div id="prof-main">
					<div id="prof-header">
						<a className="back" href="javascript:void(0);" onClick={this.goBack}><i className="fas fa-chevron-left"></i>&nbsp;<span>Back to previous page</span></a>
						<h2 className="pg-title"><span id="cd_name">{info.cohort_name}</span> (<span id="cd_acronym">{info.cohort_acronym}</span>)</h2>
						<div className="rightLink"> <span className="lastUpdated">Last Updated: <span id="cd_lastupdate"><Moment format="MM/DD/YYYY">{info.update_time}</Moment></span></span> </div>
						<div id="cd_errorMsg" className="errorText"></div>
					</div>

					<div className="row" style={{ marginBottom: '2rem' }}>
						<div className="col-md-6" style={{ borderRight: '1px solid #000' }}>
							<h3>Cohort Collaboration Contact</h3>
							<p className="profile-contact-intro" style={{ fontStyle: 'italic', fontSize: '.80em' }}>If interested in collaborating with the cohort on a project, please contact:</p>
							<ul id="cd_contact">
								<li>{info.collab_name} ({info.collab_position})</li>
								<li className="link-email">
									<a href={mailto}>
										<i className="far fa-envelope"></i> {info.collab_email}</a></li><li><i className="fas fa-phone"></i> {info.collab_phone}</li></ul>
						</div>
						<div className="col-md-6" style={{ paddingLeft: '4rem' }}>
							<h3>Principal Investigators</h3>
							<ul id="piList">{pis}</ul>
							{
								website && <div style={{ marginBottom: '12px' }}>
									<h3>Cohort Website</h3>
									{website}
								</div>
							}
							{/*<p>{proceduresite}</p>
							<ol>{files}</ol>*/}

							{
								(proceduresite || info.procedure_files.length > 0) && <div>
									<h3>Data Requesting Procedure</h3>
									<ul style={{ listStyle: 'none', paddingLeft: '0' }}>
										{proceduresite}
										{files}
									</ul>
								</div>
							}
						</div>
					</div>

					<CollapsiblePanelContainer>
						<CollapsiblePanel
							condition={this.state.description}
							panelTitle='Cohort Description'
							onClick={this.descriptionClick}>
							<div id="cd_description" dangerouslySetInnerHTML={{ __html: desc }} />
						</CollapsiblePanel>
						<CollapsiblePanel
							condition={this.state.protocol}
							panelTitle='Questionnaires'
							onClick={this.protocolClick}>
							{/*}	<h3 >Study Protocol</h3>
	                <div id="prot_attachments">
	                	{this.renderLinks(0)}
	                </div>*/}
							<h3>Cohort Questionnaires</h3>
							<div id="quest_attachments">
								{this.renderLinks(0)}
							</div>
						</CollapsiblePanel>
						<CollapsiblePanel
							condition={this.state.data}
							panelTitle='Data, Biospecimen, and Authorship Policies'
							onClick={this.dataClick}>
							<div id="pol_attachments">
								{this.renderLinks(2)}
							</div>
						</CollapsiblePanel>
					</CollapsiblePanelContainer>
				</div>
			);
		}

	}
}

export default Information;