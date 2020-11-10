import React, { Component } from 'react';
import { UserSessionContext } from '../../index';
import Unauthorized from '../Unauthorized/Unauthorized';
import './AddNewCohort.css';

class AddNewCohort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      submitted: false,
      background_gray: false,
      cohortName_required: false,
      cohortAcronym_required: false,
      org_required: false,
      message_required: false,
      cohortName: "",
      cohortAcronym: "",
      organization: "",
      topic: "1",
      message: ""
    };
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  handleModalClick = () => {
    this.setState({
      background_gray: false
    })
  }

  handleClear = () => {
    this.setState({
      cohortName_required: false,
      cohortAcronym_required: false,
      org_required: false,
      message_required: false,
      cohortName: "",
      cohortAcronym: "",
      organization: "",
      topic: "1",
      message: ""
    });
  }

  handleChange(field, event) {
    let dict = {};
    dict[field] = event.target.value;
    this.setState(dict);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //check required field
    const state = Object.assign({}, this.state);
    state.cohortName_required = state.cohortName.trim() === "";
    state.cohortAcronym_required = state.cohortAcronym.trim() === "";
    state.org_required = state.organization.trim() === "";
    state.message_required = state.message.trim() === "";



    if (state.cohortName_required || state.cohortAcronym_required || state.org_required || state.email_required || state.message_required) {
      this.setState(state);
    }
    else {
      //submit
      let reqBody = {
        cohortName: state.cohortName,
        cohortAcronym: state.cohortAcronym,
        organization: state.organization,
        topic: state.topic,
        message: state.message
      };
      fetch('./api/contact/add', {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
      /*.then(result => {
        let data = result.data;
        state.submitted = data === "sent";
        this.setState(state);
      });*/
      state.submitted = true;
      this.setState(state);
      setTimeout(() => {
        this.setState({
          submitted: !this.state.submitted,
          background_gray: true,
          cohortName_required: false,
          cohortAcronym_required: false,
          org_required: false,
          message_required: false,
          cohortName: "",
          cohortAcronym: "",
          organization: "",
          topic: "1",
          message: ""
        });
      }, 1500);
    }

  }

  render() {
    let cls = ["pop-content"];
    let shadow = "";
    if (this.state.open) {
      cls.push("open");
      shadow = "shadow";
    }
    let cohortName_cls = this.state.cohortName_required ? "contact-us-field field-required" : "contact-us-field";
    let cohortAcronym_cls = this.state.lastcohortName_required ? "contact-us-field field-required" : "contact-us-field";
    let org_cls = this.state.org_required ? "contact-us-field field-required" : "contact-us-field";
    let message_cls = this.state.message_required ? "contact-us-field field-required" : "contact-us-field";
    const submit_cls = this.state.background_gray ? "message-mid fade-away" : "message-mid";
    const success_back = this.state.background_gray ? "modal" : "non-modal";
		return <UserSessionContext.Consumer>
      {userSession => (
        !(process.env.NODE_ENV === 'development' || (userSession && userSession.role === 'SystemAdmin')) &&
        <Unauthorized /> ||
        <div>
          <div id="myModal" className={success_back} onClick={this.handleModalClick}>
            <div className={submit_cls} style={{ textAlign: "center", "border-radius": "10px" }}>
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                <h3>Message sent successfully!</h3>
              </div>
            </div>
          </div>
          <div id="newCohortForm" className="row pop-form">
            <div id="contact-main" className="col">
              <div id="contactt-header" className="col-md-12">
                <h1 className="pg-title">New Cohort</h1>
              </div>
              <div id="contact-col-1" className="col-md-6 contact-col">
                <form onSubmit={this.handleSubmit}>
                  <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                  <div id="ctl11_div_cohortName" className={cohortName_cls}>
                    <label className="oneLineLabel" htmlFor="cu_firstName">Cohort Name <span className="required">*</span></label>
                    <input name="cu_firstName" type="text" id="cu_firstName" value={this.state.cohortName} onChange={(e) => this.handleChange("cohortName", e)} />
                  </div>
                  <div id="ctl11_div_cohortAcronym" className={cohortAcronym_cls}>
                    <label className="oneLineLabel" htmlFor="cu_lastName">Cohort Acronym <span className="required">*</span></label>
                    <input name="cu_lastName" type="text" id="cu_lastName" value={this.state.cohortAcronym} onChange={(e) => this.handleChange("cohortAcronym", e)} />
                  </div>
                  <div id="ctl11_div_organization" className={org_cls}>
                    <label className="oneLineLabel" htmlFor="cu_organization">Select Cohort Owners <span className="required">*</span></label>
                    <input name="cu_organization" type="text" id="cu_organization" value={this.state.organization} onChange={(e) => this.handleChange("organization", e)} />
                  </div>
                  <div id="ctl11_div_message" className={message_cls}>
                    <label className="oneLineLabel" htmlFor="cu_message">Brief Message to Cohort Owners  <span className="required">*</span></label>
                    <textarea name="cu_message" rows="4" cols="20" id="cu_message" value={this.state.message} onChange={(e) => this.handleChange("message", e)} />
                  </div>
                  <div className="bttn-group">
                    <input type="submit" className="bttn_submit" value="Submit" />
                    <a id="ctl11_fg_cancelBtn" className="bttn_cancel" href="javascript:void(0);" onClick={this.handleClear}>Clear</a>
                  </div>
                </form>
              </div>
              <div id="contact-col-2" className="col-md-6 contact-col">
                <h2>General Instructions</h2>
                <p>For new Cohort, <span className="required" style={{ fontWeight: "bold" }}>*</span> fileds information are required.</p>
              </div>
            </div>
          </div>
        </div>
    )}</UserSessionContext.Consumer>;
  }
}

export default AddNewCohort;