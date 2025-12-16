import React, { Component, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Information.css";
import Moment from "react-moment";
import qs from "query-string";
import Reminder from "../Tooltip/Tooltip";
import { CollapsiblePanelContainer, CollapsiblePanel } from "../controls/collapsable-panels/collapsable-panels";
import ViewCohortData from "../ViewCohortData/ViewCohortData";

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
      data: false,
      viewCohortData: false,
      piShowMoreFlag: false,
      piShowCnt: 2,
    };
    this.showMorePi = this.showMorePi.bind(this);
  }

  showMorePi = () => {
    this.state.piShowCnt === 2
      ? this.setState({ piShowCnt: 10, piShowMoreFlag: true })
      : this.setState({ piShowCnt: 2, piShowMoreFlag: false });
  };

  goBack = () => {
    this.props.history.push("/select");
  };

  descriptionClick = () => {
    this.setState({
      description: !this.state.description,
    });
  };

  protocolClick = () => {
    this.setState({
      protocol: !this.state.protocol,
    });
  };

  dataClick = () => {
    this.setState({
      data: !this.state.data,
    });
  };

  handleViewCohortClick = () => {
    this.setState({
      viewCohortData: !this.state.viewCohortData,
    });
  };

  updateUrl = (newCohortID) => {
    if (newCohortID) {
      this.props.history.push({
        pathname: "/cohort",
        search: new URLSearchParams({ id: newCohortID }).toString(),
      });
    }
  };

  renderLinks = (idx) => {
    if (idx === 0) {
      if (this.state.info.attachments && this.state.info.attachments.questionnaires) {
        const links = this.state.info.attachments.questionnaires.map((item, id) => {
          const uid = "questionnair_" + id;
          if (item.type === 1) {
            return (
              <li key={uid} className="link-pdf">
                <a href={item.url} target="_blank">
                  {item.name}
                </a>
              </li>
            );
          } else {
            let url = item.url;
            if (!url.startsWith("http")) {
              url = "http://" + url;
            }
            return (
              <li key={uid} className="link-url">
                <a href={url} target="_blank">
                  {item.url}
                </a>
              </li>
            );
          }
        });
        return <ul className="links-list">{links}</ul>;
      } else {
        return (
          <ul>
            <li>Not Provided</li>
          </ul>
        );
      }
    } // end idx ==1
    else {
      // combination of  basic info request_procedures_web_url and attachments policies
      let has = false; // has == true -> not provided
      let return_body = [];
      if (this.state.info.attachments && this.state.info.attachments.policies) {
        // map return
        const links = this.state.info.attachments.policies.map((item, id) => {
          const uid = "policy_" + id;
          /*		if (request_web_url !== "" && request_web_url.trim() == item.url.trim()) {
								return;
							}
					*/
          if (item.type === 1) {
            has = true;
            return_body.push(
              <li key={uid} className="link-pdf">
                <a href={item.url} target="_blank">
                  {item.name}
                </a>
              </li>,
            );
          } else {
            let url = item.url;
            if (!url.startsWith("http")) {
              url = "http://" + url;
            }
            has = true;
            return_body.push(
              <li key={uid} className="link-url">
                <a href={url} target="_blank">
                  {item.url}
                </a>
              </li>,
            );
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
    } // end else
  };

  async loadData() {
    const response = await fetch("./api/cohort/" + this.state.cohort_id);
    const result = await response.json();
    if (result) {
      let info = result.data;
      if (info && info.cohort_id.toString() !== this.state.cohort_id) {
        this.updateUrl(info.cohort_id.toString());
      }
      this.setState((prevState) => ({
        hasMounted: true,
        cohort_id: prevState.cohort_id,
        info: info,
        description: true,
        protocol: false,
        data: false,
      }));
    } else {
      this.setState((prevState) => ({
        hasMounted: true,
        info: {},
        description: true,
        protocol: false,
        data: false,
        loadingStatus: false,
      }));
    }
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    if (!this.state.hasMounted) {
      return (
        <div id="prof-main" className="col-12">
          {" "}
          Loading data ...{" "}
        </div>
      );
    } else {
      if (!this.state.info) {
        return (
          <div id="prof-main" className="col-12">
            {" "}
            <p className="welcome"> {this.state.cohort_id} is an invalid Cohort ID. </p>{" "}
          </div>
        );
      } else {
        if (this.state.viewCohortData) {
          return (
            <div>
              <div className="content-nav" style={{ marginLeft: "3rem" }}>
                <a className="back" href="javascript:void(0);" onClick={this.handleViewCohortClick}>
                  <i className="fas fa-chevron-left"></i>&nbsp;
                  <span>Back to Previous Page</span>
                </a>
              </div>
              <div>
                <ViewCohortData id={this.state.info.cohort_id.toString()} />
              </div>
            </div>
          );
        } else {
          const info = this.state.info;
          const mailto = "mailto:" + info.collab_email;
          let pis = "";
          if (info.pis.length < 4) {
            pis = info.pis.map((item, idx) => {
              let result;
              let prop_1 = item.name;
              let prop_2 = item.institution;
              if (prop_1 && prop_1.trim() !== "") {
                result = (
                  <li key={"pi_" + item.id}>
                    {prop_1} ({prop_2})
                  </li>
                );
              } else {
                result = "";
              }
              return result;
            });
          } else {
            let addtPIcnt = info.pis.length - this.state.piShowCnt;
            pis = info.pis.slice(0, this.state.piShowCnt).map((item, idx) => {
              let result;
              let prop_1 = item.name;
              let prop_2 = item.institution;
              if (prop_1 && prop_1.trim() !== "") {
                result = (
                  <li key={"pi_" + item.id}>
                    {prop_1} ({prop_2})
                  </li>
                );
              } else {
                result = "";
              }
              return result;
            });
            pis = (
              <>
                {pis}
                <p className="py-2">
                  <a className="pi-link" href="javascript:void(0);" onClick={this.showMorePi}>
                    {this.state.piShowMoreFlag ? <span>See Less... </span> : <span>See {addtPIcnt} More...</span>}
                  </a>
                </p>
              </>
            );
          }

          let website, proceduresite, files;
          if (
            info.cohort_web_site &&
            info.cohort_web_site.trim() !== "Not Available" &&
            info.cohort_web_site.trim() !== ""
          ) {
            website =
              //<a href={info.cohort_web_site} id="cd_website" className="link-url" target="_blank">Cohort Website</a>
              info.cohort_web_site.startsWith("http") ? (
                <a href={info.cohort_web_site} target="_blank">
                  {info.cohort_web_site}
                </a>
              ) : (
                <a href={"https://" + info.cohort_web_site} target="_blank">
                  {info.cohort_web_site}
                </a>
              );
          }

          if (
            info.request_procedures_web_url &&
            info.request_procedures_web_url.trim() !== "Not Available" &&
            info.request_procedures_web_url.trim() !== ""
          ) {
            proceduresite = info.request_procedures_web_url.startsWith("http") ? (
              <li>
                <a href={info.request_procedures_web_url} target="_blank">
                  {info.request_procedures_web_url}
                </a>{" "}
              </li>
            ) : (
              <li>
                {" "}
                <a href={"https:" + info.request_procedures_web_url} target="_blank">
                  {info.request_procedures_web_url}
                </a>
              </li>
            );
          }

          if (info.procedure_files.length > 0) {
            files = info.procedure_files.map((item, idx) => (
              <li i key={idx} className="link-pdf">
                <a style={{ lineHeight: "2rem" }} href={`/api/download/${item}`} download={false} target="_blank">
                  {item}
                </a>
              </li>
            ));
          }

          let desc = "<p>" + info.cohort_description + "</p>";
          desc = desc.replace(/\\n/g, "\n").replace(/\n/g, "<br/>");
          let description = {
            className: "cedcd-btn " + (this.state.description ? "active" : ""),
            expanded: this.state.description ? "true" : "false",
            hidden: this.state.description ? "false" : "true",
            style: { display: this.state.description ? "block" : "none" },
          };
          let protocol = {
            className: "cedcd-btn " + (this.state.protocol ? "active" : ""),
            expanded: this.state.protocol ? "true" : "false",
            hidden: this.state.protocol ? "false" : "true",
            style: { display: this.state.protocol ? "block" : "none" },
          };
          let data = {
            className: "cedcd-btn " + (this.state.data ? "active" : ""),
            expanded: this.state.data ? "true" : "false",
            hidden: this.state.data ? "false" : "true",
            style: { display: this.state.data ? "block" : "none" },
          };
          return (
            <div className="col-12" id="prof-main">
              <div id="prof-header">
                <a className="back" href="javascript:void(0);" onClick={this.goBack}>
                  <i className="fas fa-chevron-left"></i>&nbsp;
                  <span>Back to previous page</span>
                </a>
                <h2 className="pg-title">
                  <span id="cd_name">{info.cohort_name}</span> (<span id="cd_acronym">{info.cohort_acronym}</span>)
                </h2>
                <div className="rightLink">
                  {" "}
                  <span className="lastUpdated">
                    Last Updated:{" "}
                    <span id="cd_lastupdate">
                      <Moment format="MM/DD/YYYY">{info.update_time}</Moment>
                    </span>
                  </span>{" "}
                </div>
                <div id="cd_errorMsg" className="errorText"></div>
              </div>

              <div className="row" style={{ marginBottom: "0" }}>
                <div className="col-md-6 xs-12" style={{ borderRight: "1px solid #000", position: "relative" }}>
                  <h3>Cohort Collaboration Contact</h3>
                  <p className="profile-contact-intro" style={{ fontStyle: "italic", fontSize: ".80em" }}>
                    If interested in collaborating with the cohort on a project, please contact:
                  </p>
                  <ul id="cd_contact">
                    <li>
                      {info.collab_name} ({info.collab_position})
                    </li>
                    <li className="link-email">
                      <a href={mailto}>
                        <i className="far fa-envelope"></i> {info.collab_email}
                      </a>
                    </li>
                    <li>
                      <i className="fas fa-phone"></i> {info.collab_phone}
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 xs-12" style={{ paddingLeft: "4rem" }}>
                  <h3>Principal Investigators</h3>
                  <ul id="piList">{pis}</ul>
                  {website && (
                    <div style={{ marginBottom: "12px" }}>
                      <h3>Cohort Website</h3>
                      {website}
                    </div>
                  )}
                  {/*<p>{proceduresite}</p>
							<ol>{files}</ol>*/}

                  {(proceduresite || info.procedure_files.length > 0) && (
                    <div>
                      <h3>Procedure For Requesting Data</h3>
                      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                        {proceduresite}
                        {files}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="row" style={{ marginLeft: "1rem", paddingLeft: "0" }}>
                <Reminder viewCohort={true} message="Click to view submitted Cohort data.">
                  <span>
                    <button
                      id="viewButton"
                      type="submit"
                      name="submitBtn"
                      value="View Selected Cohort Data"
                      className="btn btn-link view-button"
                      onClick={this.handleViewCohortClick}>
                      View Cohort Data{" "}
                      <img
                        className="mw-100"
                        width="15"
                        src="/assets/img/ViewDetails.png"
                        style={{ marginBottom: "0", paddingBottom: "4px" }}
                        alt="View Cohort Data"
                      />
                    </button>
                  </span>
                </Reminder>
              </div>
              <CollapsiblePanelContainer>
                <CollapsiblePanel
                  condition={this.state.description}
                  panelTitle="Cohort Description"
                  onClick={this.descriptionClick}>
                  <div id="cd_description" dangerouslySetInnerHTML={{ __html: desc }} />
                </CollapsiblePanel>
                <CollapsiblePanel
                  condition={this.state.protocol}
                  panelTitle="Questionnaires"
                  onClick={this.protocolClick}>
                  {/*}	<h3 >Study Protocol</h3>
	                <div id="prot_attachments">
	                	{this.renderLinks(0)}
	                </div>*/}
                  <h3>Cohort Questionnaires</h3>
                  <div id="quest_attachments">{this.renderLinks(0)}</div>
                </CollapsiblePanel>
                <CollapsiblePanel
                  condition={this.state.data}
                  panelTitle="Protocols and Authorship Policies"
                  onClick={this.dataClick}>
                  <div id="pol_attachments">{this.renderLinks(2)}</div>
                </CollapsiblePanel>
              </CollapsiblePanelContainer>
            </div>
          );
        }
      }
    }
  }
}

export default Information;
